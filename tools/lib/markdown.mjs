// Small helpers for working with Markdown source text without a full parser.

import {readdirSync, statSync} from 'node:fs';
import {join, relative, sep} from 'node:path';

/**
 * Emoji shortcodes such as `:classical_building:` (capture group 1: the name). GitBook exports them with
 * escaped underscores (`:classical\_building:`). Times, URLs and text such as `6c:ac:34` are not matched.
 */
export const EMOJI_SHORTCODE_RE = /(?<![A-Za-z0-9:/\\]):([a-z0-9]+(?:(?:\\?_|[+-])[a-z0-9]+)*):(?![A-Za-z0-9])/g;

/**
 * Splits text into lines and flags the ones that belong to a fenced code block
 * (the fence lines themselves included).
 * @returns {{line: string, code: boolean}[]}
 */
export function scanLines(text) {
  const result = [];
  let fence = null;
  for (const line of text.split('\n')) {
    const m = line.match(/^[ \t]*(`{3,}|~{3,})(.*)$/);
    if (!fence) {
      if (m && !(m[1][0] === '`' && m[2].includes('`'))) {
        fence = {ch: m[1][0], len: m[1].length};
        result.push({line, code: true});
      } else {
        result.push({line, code: false});
      }
    } else {
      result.push({line, code: true});
      if (m && m[1][0] === fence.ch && m[1].length >= fence.len && m[2].trim() === '') {
        fence = null;
      }
    }
  }
  return Object.assign(result, {unclosed: fence !== null}); // `unclosed`: the text ends inside a code fence
}

/**
 * Applies `fn` to every run of text outside fenced code blocks. Inline code spans
 * are masked while `fn` runs, so `fn` never sees (or changes) code.
 */
export function mapOutsideCode(text, fn) {
  const out = [];
  let run = [];
  const flush = () => {
    if (run.length) out.push(mapMasked(run.join('\n'), fn));
    run = [];
  };
  for (const {line, code} of scanLines(text)) {
    if (code) {
      flush();
      out.push(line);
    } else {
      run.push(line);
    }
  }
  flush();
  return out.join('\n');
}

function mapMasked(text, fn) {
  const spans = [];
  const masked = text.replace(/(?<!`)(`+)(?!`)(.+?)(?<!`)\1(?!`)/g, (span) => {
    spans.push(span);
    return `\u0000${spans.length - 1}\u0000`;
  });
  return fn(masked).replace(/\u0000(\d+)\u0000/g, (_, i) => spans[Number(i)]);
}

/** The text of the first level-1 heading outside code, or null. */
export function firstHeading(text) {
  for (const {line, code} of scanLines(text)) {
    if (code) continue;
    const m = line.match(/^#\s+(.+?)\s*#*\s*$/);
    if (m) return m[1].trim();
  }
  return null;
}

/** All files below `dir` (POSIX-style paths relative to `dir`), optionally filtered by extension. */
export function listFiles(dir, exts) {
  const result = [];
  const visit = (current) => {
    for (const name of readdirSync(current).sort()) {
      const full = join(current, name);
      if (statSync(full).isDirectory()) {
        visit(full);
      } else if (!exts || exts.some((ext) => name.endsWith(ext))) {
        result.push(relative(dir, full).split(sep).join('/'));
      }
    }
  };
  visit(dir);
  return result;
}
