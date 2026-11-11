---
sidebar_position: 10
description: This page explains what sessions are and how to use them.
---

# Sessions

LispPad allows users to manage four different types of documents: for _sessions_, for _code_,
for _text documents_, and for _drawings_. _Sessions_ are used to load, debug and execute Lisp code.
A new session is created via the "File > New Session" menu item. "File > New Tab" opens a new session as a
tab of the current session window.

Each LispPad session represents a virtual machine for executing Scheme code. Users can run multiple sessions
simultaneously. Sessions are isolated and cannot interact with each other. The primary means to interact with
the virtual machine is the _read-eval-print loop_:

- Users enter Scheme code after the prompt `▶`. Pressing Return will submit the code only if parenthesis are
  balanced. This makes it possible to write Scheme code spanning multiple lines also in the read-eval-print loop.
- The Scheme code gets compiled and executed
- The result gets printed below the prompt. Results are printed in blue.

Here is an example for an interaction with the read-eval-print loop:

```scheme
▶ (+ 3 8)
11
▶ (map fx1+ '(1 2 3 4))
(2 3 4 5)
```

The expression `(+ 3 8)` was entered by the user and evaluates to `11`. The expression entered on the
second prompt evaluates to the list `(2 3 4 5)`.

## Session windows

Session windows typically look like this:

<figure><img src="/img/session-window.png" alt="LispPad session window" loading="lazy"></figure>

The window shows the _transcript_ of the session: the expressions that were entered, their results, and
messages that were printed by the program. Results are shown in blue, and errors are shown in red, followed by
the procedure calls that led to the error. The status line at the bottom of the window tells what the interpreter is doing,
e.g. "Waiting for input". Session windows follow the appearance of the system, i.e. they can be used in light as well as in dark mode.

### Toolbar

<figure><img src="/img/session-toolbar.png" alt="The toolbar of a session window" width="400" class="shadow" loading="lazy"></figure>

The buttons in the toolbar have the following functionality:

- **Load** (+) will load a new program into the session and execute it, modifying the state of the session. Pressing and holding the button (or clicking it with the right mouse button) shows a menu with the programs that were loaded most recently. Selecting one of them loads it again. The menu remembers the last 12 programs and can be emptied via "Clear Menu".
- **Stop** will stop the current execution of code. This is the only way to stop non-terminating loops. The button is only active, and shown in red, while the interpreter is busy evaluating code.
- **Reset** discards the current state of the session and completely restarts it from scratch.
- **Clear** will wipe the content of the session window (the _transcript_) without discarding any internal state.
- **Save** will save the content of the session window (the _transcript_) into a file. The save panel offers three formats: _Plain Text_, _RTF_ which preserves fonts and colors, and _RTFD_ which, in addition, includes images and drawings.
- **Libraries** opens the [Library Documentation](library-documentation.md) window.
- **Sidebar** shows and hides the [session inspectors](#session-inspectors).

Toolbars can be customized via "View > Customize Toolbar...". For instance, there is an additional **Print** button
for printing the transcript.

### Drawings and images

Drawings and images that are returned by Scheme code are shown in the console right below their textual
representation. In the window above, the `let` expression returned a drawing of a tree. The drawing is displayed as an image
below its textual representation `#<drawing ...>`. Images can be selected, copied and pasted into other applications. The size up to which images are displayed
can be configured in the [console preferences](preferences.md#console).

Drawings that are more elaborate, or that should be kept, can be shown in a _graphics window_ instead. Scheme code
creates such a window with procedure `make-graphics-window` from library `(lisppad system macos)`. A graphics window looks like this:

<figure><img src="/img/graphics-window.png" alt="A graphics window" width="490" loading="lazy"></figure>

The title of the window is the name of the drawing; below it, the window shows the size of the drawing. The status bar at the bottom
shows a label (by default the name of the drawing, but it can be set by the program) and the size of the area
that is currently visible. The toolbar of a graphics window has the following buttons:

- **Zoom Out** and **Zoom In** change the zoom level step by step, between 40% and 300%.
- The **zoom level** pop-up button shows the current zoom level and lets users choose a different one.
- **Configuration** opens a sheet for changing the name, the width and the height, the background color, and the scale of the drawing.
  It does the same as "View > Graphics Properties".
- **Export** saves the drawing into a file, either as PNG, JPEG, GIF, TIFF, or PDF. It does the same as "File > Export...".

Via "View > Customize Toolbar..." a **Print** button can be added for printing the drawing.

## Quick help and code completion

Within session (and editor) windows, invoking the "Help > Show Quick Help..." menu item (e.g. via ⌘D) will trigger a documentation lookup for the identifier at the cursor position. Documentation for the selected identifier is shown as a popover dialog. It shows the library that defines the identifier, whether it is a procedure, syntax, or something else, and a description with examples:

<figure><img src="/img/session-quick-help.png" alt="Quick help for a symbol" loading="lazy"></figure>

If an identifier is defined in more than one library, the popover shows the documentation for each of the libraries.
The documentation comes from the [Library Documentation](library-documentation.md) window. In the read-eval-print loop,
identifiers for which documentation is available are shown in a distinct color, if the
corresponding option in the preferences is switched on.

"Edit > Complete" (⌘/) shows possible completions for the identifier that is being typed. It is also possible
to have LispPad show completions automatically after a short period of typing inactivity; this can be enabled in the preferences.

## Keyboard shortcuts

Within a read-eval-print loop, the results of the past 3 evaluations is available via the symbols `*1`, `*2`, and `*3`. The following key shortcuts are available in the read-eval-print loop:

- **⌥↑** (option + cursor-up) and **⌥↓** (option + cursor-down) can be used to browse through the history of past commands.
- **⌘↑** (command + cursor-up) and **⌘←** jumps to the beginning of the current command that is being entered
- **⌘↓** (command + cursor-down) and **⌘→** jumps to the end of the current command that is being entered
- **⇧⌘↑** (shift + command + cursor-up) and **⇧⌘←** selects the text between the start of the current command and the current cursor position
- **⇧⌘↓** (shift + command + cursor-down) and **⇧⌘→** selects the text between the current cursor position and the end of the current command
- **⌘⌫** (command + delete) deletes the current command

Other useful shortcuts for working with sessions are **⌘.** for stopping a running evaluation (**⇧⌘.** for forcing it, which
is shown in the "Session" menu while the option key is pressed), **⌘K** for clearing the console, and **⇧⌘K** for resetting the session.

## Session inspectors

Selecting the **Sidebar** button in the toolbar (or "View > Show Sidebar", ⌃⌘S) will toggle the sidebar, revealing four different inspectors. They can be selected with the tab bar at the top of the sidebar:

- **Info** will display information about the state of the Scheme interpreter.
- **Libraries** will show a list of all libraries that are known to the session, including references to the documentation of the libraries.
- **Environment** will show a list of all bound symbols together with the corresponding values they are bound to and allow for searching, filtering, and displaying documentation.
- **Expressions** allows users to enter Scheme expressions which are being evaluated every time the interpreter is going through a read-eval-print loop iteration.

### Info

<figure><img src="/img/session-inspector-info.png" alt="The Info inspector" loading="lazy"></figure>

The _Info_ inspector summarizes the state of the interpreter:

- _Memory_ shows how many heap locations and environment bindings exist, the maximum stack size that was needed so far, and the memory footprint of the application.
- _Garbage collection_ shows the number of garbage collection cycles and the number of tracked and managed objects.
- _Implementation_ shows the name and version of the Scheme implementation, i.e. of LispKit.

### Libraries

<figure><img src="/img/session-inspector-libraries.png" alt="The Libraries inspector" loading="lazy"></figure>

The _Libraries_ inspector lists all libraries which the session knows about; the number of libraries is shown at the bottom.
The _State_ column tells how far the interpreter has processed a library: a library that is only _found_ is known to
the session, but was not used yet; libraries that were already imported, directly or indirectly, are shown as _loaded_ or _initialized_.
The search field filters the list by library name, and the button next to the search field refreshes the list, e.g. after
new library files were added to the library folder.

Libraries for which documentation is available are marked with a document icon in the first column. Clicking the icon opens
the documentation of the library in the [Library Documentation](library-documentation.md) window.

### Environment

<figure><img src="/img/session-inspector-environment.png" alt="The Environment inspector" loading="lazy"></figure>

The _Environment_ inspector lists all identifiers that are bound in the interaction environment of the session together with their values.
The search field restricts the list to the identifiers that contain the entered text; below the list, LispPad shows how many
of the bindings are displayed. Selecting an identifier shows its documentation in the lower part of the inspector,
including the library that defines the identifier and the kind of definition (e.g. `procedure` or `syntax`).

### Expressions

<figure><img src="/img/session-inspector-expressions.png" alt="The Expressions inspector" loading="lazy"></figure>

The _Expressions_ inspector makes it possible to watch the value of Scheme expressions. To add an expression, enter a name in the field below the
list, enter the expression itself in the text area underneath, and press the "+" button. The inspector re-evaluates all
expressions after each interaction with the read-eval-print loop and shows their current values. In the example above,
`*1`, the result of the last evaluation, is watched under the name `last`. Selecting an expression and pressing the "−" button removes it.

## Session log

Session interactions are logged in a central logging system. It can be accessed via the menu item "Window > Session Log" (⌃⌘L).

<figure><img src="/img/session-log.png" alt="LispPad session log" loading="lazy"></figure>

The log can be filtered by session, severity, and by a string which applies to the log messages and/or logging tags. The scope of the free-form text filter can be adjusted by clicking on the lens symbol. Individual columns can be switched on and off by right/control-clicking on the table header. There is also a button for exporting the log into a text file and a button for clearing the full log.

Commands that were entered in the read-eval-print loop are logged with the tag `repl/exec`, and their results with the tag `repl/res`. Whether commands, results and garbage collection runs are logged, and how many log entries are kept, can be controlled in the [console preferences](preferences.md#console).

The LispPad session log is also used by the libraries `(lispkit log)` and `(lisppad log)` so that all log messages, also from Scheme code itself are centrally collected and available via the session log window.
