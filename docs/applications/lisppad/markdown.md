---
sidebar_position: 30
sidebar_label: Markdown
description: This page explains how to edit Markdown and plain text documents with LispPad.
---

# Markdown and text documents

Besides Scheme programs and libraries, LispPad's editor also opens _Markdown documents_ (with file name suffix `.md`
or `.markdown`) and _text documents_. Markdown documents come with a live preview that renders the document while it is being edited.

## Markdown editing

Markdown documents are shown in the same kind of editor window as Scheme code. The editor highlights the Markdown syntax: headers,
emphasized text, bullets, block quotes, and code. The colors are configured in the [Syntax settings](preferences.md#syntax).

In Markdown documents, the Run button of the toolbar is replaced by a **Preview** button. It shows and hides the preview, as do
the menu item "View > Show Preview" (⌥⌘P) and ⌘R. Showing the preview widens the window by the width of the preview pane, hiding it
shrinks the window back. The border between editor and preview can be dragged to change the width of the preview.

<figure><img src="/img/markdown-preview.png" alt="A Markdown document with its preview" loading="lazy"></figure>

The preview is updated shortly after typing stops, and it follows the editor when the document is scrolled. The following Markdown
features are rendered:

- Headers, paragraphs, emphasized and bold text, inline code, links, and block quotes
- Bulleted and numbered lists, including task lists with checkboxes
- Code blocks, with syntax highlighting for Scheme and a range of other languages
- Images, from files and from the web
- Tables, with columns that are aligned left, right or centered
- Diagrams written in [Mermaid](https://mermaid.js.org)
- Mathematical formulas in LaTeX syntax, typeset with [KaTeX](https://katex.org)

The following screenshot shows a table, a Mermaid diagram, and formulas that are rendered by the preview:

<figure><img src="/img/markdown-advanced.png" alt="Tables, diagrams and formulas in the preview" loading="lazy"></figure>

Links in the preview open in the default application for the link; links to headers (`#anchor`) scroll within the preview.

### Text size

The **Text Size** button in the toolbar, which is visible while the preview is shown, changes the size of the text in the preview
to 80%, 90%, 100%, 110% or 120%. The size can also be changed with "View > Zoom In", "View > Zoom Out", and "View > Actual Size"
while the preview has the focus.

### Images

Images that are referenced by relative path are looked up relative to the Markdown document. Since LispPad is a sandboxed application,
it only has access to the document itself, but not to the other files in the same folder. If a document references local images,
the preview shows a banner with an **Allow Access** button; pressing it asks for the folder that contains the images. LispPad
remembers the decision, so this only has to be done once per folder.

Images from the web are loaded by default. Whether this should be done at all, and how large images, diagrams and formulas
may become in the preview, can be set in the [Markdown Viewer settings](preferences.md#markdown-viewer).

## Text documents

LispPad can also be used to edit plain text documents (suffixes `.txt` and `.text`) as well as a number of other text-based
formats, including HTML, XML, JSON, YAML, JavaScript, CSS, shell scripts and Python scripts (suffixes `.html`, `.xml`, `.json`, `.yml`, `.yaml`,
`.js`, `.css`, `.sh`, and `.py`). Such documents are edited as plain text, i.e. without syntax highlighting and without a Run button.
LispPad does not become the default application for these file types; they are opened in LispPad via "File > Open..." or by choosing LispPad from the
"Open With" menu in the Finder.
