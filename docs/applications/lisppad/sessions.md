---
sidebar_position: 10
---

# Sessions

### Using the interpreter

#### Sessions

LispPad allows users to manage four different types of documents: for _sessions_, for _code_, for _text documents_, and for _drawings_. _Sessions_ are used to load, debug and execute Lisp code. A new session is created via the "File > New Session" menu item.

Each LispPad session represents a virtual machine for executing Scheme code. Users can run multiple sessions simultaneously. Sessions are isolated and cannot interact with each other. The primary means to interact with the virtual machine is the _read-eval-print loop_:

* Users enter Scheme code after the prompt `➤`. Pressing Return will submit the code only if parenthesis are balanced. This makes it possible to write Scheme code spanning multiple lines also in the read-eval-print loop.
* The Scheme code gets compiled and executed
* The result gets printed below the prompt. Results are printed in blue.

Here is an example for an interaction with the read-eval-print loop:

```
➤ (+ 3 8)
11
➤ (map fx1+ '(1 2 3 4))
(2 3 4 5)
```

The expression `(+ 3 8)` was entered by the user and evaluates to `11`. The expression entered on the second prompt evaluates to the list `(2 3 4 5)`.

#### Session window

The session window typically looks like this:

<figure><img src="/img/Session.png" alt=""><figcaption></figcaption></figure>

The buttons in the toolbar have the following functionality:

* **Load** will load a new program into the session and execute it, modifying the state of the session.
* **Stop** will stop the current execution of code. This is the only way to stop non-terminating loops.
* **Reset** discards the current state of the session and completely restarts it from scratch.
* **Clear** will wipe the content of the session window (the _transcript_) without discarding any internal state.
* **Save** will save the content of the session window (the _transcript_) into a file.
* **Print** will print the content of the session window (the _transcript_).

Within session (and editor) windows, invoking the "Help > Show Quick Help..." menu item (e.g. via ⌘D) will trigger a documentation lookup for the identifier at the cursor position. Documentation for the selected identifier is shown as a popover dialog. The _Environment_ inspector provides means to browse and search identifiers of the interaction environment of sessions. It also displays documentation for selected identifiers.

Within a read-eval-print loop, the results of the past 3 evaluations is available via the symbols `*1`, `*2`, and `*3`. The following key shortcuts are available in the read-eval-print loop:

* **⌥↑** (option + cursor-up) and **⌥↓** (option + cursor-down) can be used to browse through the history of past commands.
* **⌘↑** (command + cursor-up) and **⌘←** jumps to the beginning of the current command that is being entered
* **⌘↓** (command + cursor-down) and **⌘→** jumps to the end of the current command that is being entered
* **⇧⌘↑** (shift + command + cursor-up) and **⇧⌘←** selects the text between the start of the current command and the current cursor position
* **⇧⌘↓** (shift + command + cursor-down) and **⇧⌘→** selects the text between the current cursor position and the end of the current command
* **⌘⌫** (command + delete) deletes the current command

#### Session inspectors

Selecting the **Show Sidebar** button in the toolbar will toggle the sidebar, revealing four different inspectors:

* **Info** will display information about the state of the Scheme interpreter.
* **Libraries** will show a list of all loaded libraries, including references to the documentation of the libraries.
* **Environment** will show a list of all bound symbols together with the corresponding values they are bound to and allow for searching, filtering, and displaying documentation.
* **Expressions** allows users to enter Scheme expressions which are being evaluated every time the interpreter is going through a read-eval-print loop iteration.

Here is a screenshot of the _Libraries_ inspector:

<figure><img src="/img/SessionAndLibraries.png" alt=""><figcaption></figcaption></figure>

The following screenshot showcases the _Environment_ inspector:

<figure><img src="/img/SessionAndEnvironment.png" alt=""><figcaption></figcaption></figure>

#### Session log

Session interactions are logged in a central logging system. It can be accessed via the menu item "Window -> Session Log".

<figure><img src="/img/SessionLog.png" alt=""><figcaption></figcaption></figure>

The log can be filtered by session, severity, and by a string which applies to the log messages and/or logging tags. The scope of the free-form text filter can be adjusted by clicking on the lens symbol. Individual columns can be switched on and of by right/control-clicking on the table header. There is also a button for exporting the log into a text file and a button for clearing the full log.

The LispPad session log is also used by the libraries `(lispkit log)` and `(lisppad log)` so that all log messages, also from Scheme code itself are centrally collected and available via the session log window.
