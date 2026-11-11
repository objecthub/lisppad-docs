---
sidebar_position: 20
sidebar_label: Editor
description: This page explains how LispPad's code editor works.
---

# Editing code

LispPad allows you to write Scheme code directly using the built-in code editor. There are two different types
of code documents that can be edited: _programs_ (usually with file name suffix `.scm`) and _libraries_ (with suffix `.sld`).
New documents are created with "File > New" (⌘N). "File > New Tab" (⌘T) opens a new document as a tab
of the current editor window.

## Programs

Programs consist of executable code. They can be loaded into a session and executed with the
"Session > Load File..." menu item, or the corresponding button in the session toolbar. Alternatively,
the code editor window allows users to run the current code in a session via the "Session > Run" menu item (⌘R)
or the Run button of the editor toolbar.

## Libraries

Libraries define reusable modules of Scheme definitions. Libraries import functionality from other libraries
and export a named set of definitions. Just like programs, libraries can be loaded into a session, but
all this does is to make the library available for import. As an example, `(import (lispkit datatype))`
will import the library `(lispkit datatype)`. The library definition for `(lispkit datatype)` needs to
be stored in a file with path name `lispkit/datatype.sld` within a libraries directory defined in the
LispPad [preferences](preferences.md#environment).

## Editor window

The editor window typically looks like this:

<figure><img src="/img/editor-window.png" alt="LispPad editor window" loading="lazy"></figure>

The editor shows line numbers on the left, highlights the syntax of the code, and matches parentheses.
The line with the cursor is highlighted, and the status bar at the bottom of the window shows
the kind of the document (here: _Program_), the number of characters in the document, and the position of the cursor
as line and column. Editor windows follow the appearance of the system, so they can be used in light as well as in dark mode.

### Toolbar

<figure><img src="/img/editor-toolbar.png" alt="The toolbar of an editor window" width="460" class="shadow" loading="lazy"></figure>

The buttons in the toolbar have the following functionality:

- **Run** loads the content of the window into a session and executes it there. Pressing and holding the button (or clicking it with the right mouse button) shows a menu for choosing the session in which the code runs: the _most recently active session_ (the default), a _new session_, or one of the sessions that are currently open. The choice only applies to this window; it is not remembered.
- **Definitions** shows a list of all definitions (values, syntax, record types, etc.). Selecting a definition will jump to the line where the definition is made.
- **Jump to line** jumps to the line with the entered line number
- **Auto-indent** re-indents all the lines that are selected
- **Indent** inserts a space character at the beginning of all selected lines.
- **Outdent** removes a space character (if it exists) at the beginning of all selected lines.
- **Comment** inserts a semicolon (`;`) character at the beginning of all selected lines.
- **Uncomment** removes a semicolon (`;`) character (if it exists) at the beginning of all selected lines.

The toolbar can be customized via "View > Customize Toolbar...". It offers an additional **Print** button which prints
out the content of the editor window. The Run button is only shown for programs and libraries; for [Markdown
and text documents](markdown.md) the toolbar looks different.

### Definitions

The _Definitions_ button gives an overview of the definitions that are made in a program or library. Definitions are grouped by
kind (values, syntax, records, and types), and each entry shows the signature of the definition. Choosing an entry moves the cursor to
the definition.

<figure><img src="/img/editor-definitions.png" alt="The definitions menu of an editor window" loading="lazy"></figure>

### Quick help and code completion

Just like in sessions, the "Help > Show Quick Help..." menu item (⌘D) shows the documentation of the identifier at the cursor position
or of the selected identifier in a popover. It tells which library defines the identifier and describes its usage:

<figure><img src="/img/editor-quick-help.png" alt="Quick help in an editor window" loading="lazy"></figure>

The documentation is provided by the [Library Documentation](library-documentation.md) window. Identifiers for which
documentation is available can be marked up in a color of their own, which is configured in the Syntax settings.

"Edit > Complete" (⌘/) completes the identifier that is being typed, or shows a list of possible completions.
LispPad can also show completions automatically after a short period of typing inactivity; this can be enabled in the preferences.

## Editing features

The "Edit" menu provides a number of commands that are tailored to editing Scheme code:

- **Select Expression** (⌘E) selects the Scheme expression that encloses the cursor or the current selection. **Select Line** (⌘L) selects the current line.
- **Indent Selection** (⌘I) re-indents the selected lines according to Scheme conventions, **Indent All** (⇧⌘I) re-indents the whole document. **Increase Indentation** (⌘]) and **Decrease Indentation** (⌘[) shift the selected lines.
- **Comment** (⌘;) comments out the selected lines, and **Uncomment** (⇧⌘;) removes the comment characters again.
- **Duplicate** (⇧⌘D) duplicates the selected text. Under **Lines**, the selected lines can be duplicated (⇧⌘X) or deleted.
- Under **Jump to**, the cursor can be moved to a given line, to the beginning or the end of the document, or the selection can be scrolled into view (⌘J).
- Under **Find**, the usual find and replace functionality is available (⌘F, ⌥⌘F, ⌘G, ⇧⌘G). **Use Selection for Find** is ⌥⌘E.
- **Transformations** change the capitalization of the selection.

Via LispPad's [preferences](preferences.md#editor), it is possible to customize editor windows in the following way:

- Line numbers can be enabled/disabled
- Page guides can be enabled/disabled and it can be defined where those are drawn in terms of number of characters per line
- The current line can be highlighted
- Matching parenthesis can be highlighted
- Syntax coloring can be enabled/disabled
- Automatic line indentation can be enabled/disabled
- Double-clicking can select whole identifiers
- Completions can be shown automatically

All settings are applicable to all editor windows, but changes to the settings will only take effect for new windows,
or when the application is restarted or windows reopened.

## Working with documents

Editor documents are saved with "File > Save..." (⌘S). "File > Show in Finder" reveals the file of a saved document in the Finder, and
"File > Share" shares it with other apps or people. Recently used documents are available via "File > Open Recent".

Each document is shown in its own window, or, if tabs are used, in its own tab. The "Window" menu lists all open windows. The first ten editor windows
can be selected via ⌘0 to ⌘9, and the first ten session windows via ⌃0 to ⌃9; the shortcut of a window is shown in the "Window" menu.
