import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

/** Root of the lisppad-docs project (the folder that contains package.json). */
export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const DOCS = join(ROOT, 'docs');
export const STATIC_IMG = join(ROOT, 'static', 'img');
export const BUILD = join(ROOT, 'build');

/** Minimal `--flag` / `--key value` argument parser. */
export function parseArgs(argv, valueFlags = []) {
  const flags = {};
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      if (valueFlags.includes(key)) {
        flags[key] = argv[++i];
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return {flags, positional};
}
