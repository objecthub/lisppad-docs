---
sidebar_position: 20
---

# Editor

### Editing code

LispPad allows you to write Scheme code directly using the built-in code editor. There are two different types of code documents that can be edited: _programs_ (usually with file name suffix `.scm`) and _libraries_ (with suffix `.sld`).

#### Programs

Programs consist of executable code. They can be loaded into a session and executed with the "Session > Load File..." menu item, or the corresponding button in the session toolbar. Alternatively, the code editor window allows users to load the current code into the last active session via the "Session > Run" menu item.

#### Libraries

Libraries define reusable modules of Scheme definitions. Libraries import functionality from other libraries and export a named set of definitions. Just like programs, libraries can be loaded into a session, but all this does is to make the library available for import. As an example, `(import (lispkit datatype))` will import the library `(lispkit datatype)`. The library definition for `(lispkit datatype)` needs to be stored in a file with path name `lispkit/datatype.sld` within a libraries directory defined in the LispPad preferences.

#### Editor window

The editor window typically looks like this:

<figure><img src="/img/Editor.png" alt=""><figcaption></figcaption></figure>

The buttons in the toolbar have the following functionality:

* **Run** loads the content of the window into the last active session and executes it there.
* **Definitions** shows a list of all definitions (values, functions, record types, etc.). Selecting a definition will jump to the line where the definition is made.
* **Jump to line** jumps to the line with the entered line number
* **Auto-indent** re-indents all the lines that are selected
* **Indent** inserts a space character at the beginning of all selected lines.
* **Outdent** removes a space character (if it exists) at the beginning of all selected lines.
* **Comment** inserts a semicolon (`;`) character at the beginning of all selected lines.
* **Uncomment** removes a semicolon (`;`) character (if it exists) at the beginning of all selected lines.
* **Print** prints out the content of the editor window.

Via LispPad's preferences, it is possible to customize editor windows in the following way:

* Line numbers can be enabled/disabled
* Page guides can be enabled/disabled and it can be defined where those are drawn in terms of number of characters per line
* The current line can be highlighted
* Matching parenthesis can be highlighted
* Syntax coloring can be enabled/disabled
* Automatic line indentation can be enabled/disabled

All settings are applicable to all editor windows, but changes to the settings will only take effect for new windows, or when the application is restarted or windows reopened.
