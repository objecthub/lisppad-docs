---
sidebar_position: 30
---

# Preferences

### Customizing preferences

Preferences of _LispPad_ are defined on four different tabs for configuring the Lisp environment, the console with the read-eval-print loop, the built-in text editor, as well as syntax highlighting used in editor and session windows.

#### Environment

Every time a new session is created, a _prelude_ is being loaded into the interpreter and executed. The _prelude_ is a Scheme program (a `.scm` file) which is used to set up a session. The "Prelude" setting on the environment tab can be set to two different values:

* **Default** loads the default/internal prelude of _LispPad_
* **Custom** loads the prelude from a custom file

It is possible to load the default/internal _LispPad_ prelude file into an editor window by opening the "File" menu and pressing the "control" key. This will show the menu item "Open LispPad...". Selecting it will bring up an "Open File" dialog for the folder that contains all _LispPad_-internal files. "Prelude.scm" is the default prelude file.

Similarly, it is possible to browse _LispKit_-internal files by opening the "File" menu and pressing the "option" key.

Libraries referenced from Scheme code are looked up from a set of folders. The "Libraries" setting controls how libraries are found. It can be set to two different values:

* **Internal** only finds library definitions automatically that come natively installed with _LispPad_.
* **Custom** allows users to define a root folder from which library definitons are looked up. This folder can be located outside of the application sandbox. If libraries are not found there, they are being looked up in the set of natively installed libraries. This mechanism allows users to override default libraries by providing alternative implementations in the custom library folder.

LispPad provides a similar mechanism to reference asset files (e.g. images, videos, files, etc.) from Scheme code. The "Assets" setting controls how such asset files are found. It can be set to two different values:

* **Internal** only finds assets that come natively installed with _LispPad_.
* **Custom** allows users to define a root folder from which asset files are looked up. This folder can be located outside of the application sandbox. If asset files are not found there, they are being looked up in the set of natively installed asset folders. This mechanism allows users to override default assets by providing alternative versions in the custom asset folder.

Since the _LispPad_ application is sandboxed, it is difficult to read and write files from outside of the sandbox. In order to work around this limitation, _LispPad_ allows users to define a custom _Project_ folder. This is controlled via the "Project" setting:

* **Sandbox** assumes that the project folder is located within the sandbox of the application
* **Custom** allows users to define a custom project folder outside of the sandbox.

<figure><img src="/img/PreferencesEnvironment.png" alt=""><figcaption></figcaption></figure>

#### Console

_LispPad_ allows users to configure the following aspects of sessions:

* **Console font**: The font used by the read-eval-print loop in the console of a session.
* **Highlight matching parenthesis**: Shows matching parenthesis when entering code in the read-eval-print loop in the console of a session.
* **Require balanced parenthesis**: When this option is set, the read-eval-print loop does not allow users to submit unbalanced code.
* **Highlight syntax**: When this option is set, syntax will be highlighted when entering code in the read-eval-print loop in the console of a session.
* **Markup identifiers with documentation**: When this option is set and _Highlight syntax_ is enabled, identifiers for which LispPad has documentation available are marked up in a color that can be specified in the _Syntax_ preferences pane.
* **Automatically show completions after&#x20;**_**N**_**&#x20;seconds**: When this option is set, LispPad shows possible completions for the currently typed identifier after _N_ seconds of typing inactivity.
* **Command history**: The number of read-eval-print loop inputs remembered in a session. Users can switch between those by using the key combinations `<option>+<cursor up>` and `<option>+<cursor down>`.
* **Prompt**: Defines the prompt used for indicating input in the read-eval-print loop.
* **Log: Commands and results**: When this option is set, all commands executed in the read-eval-print loop will be logged and are accessible in the session log, which can be displayed by selecting "Session Log" from the "Window" menu.
* **Log: Garbage collection**: When this option is set, all garbage collector runs are logged and are accessible in the session log, which can be displayed by selecting "Session Log" from the "Window" menu.
* **Log history**: The number of entries to keep in the session log. As soon as the number of session log entries has reached its limit, the oldest entries are getting purged when new entries are being added.

<figure><img src="/img/PreferencesConsole.png" alt=""><figcaption></figcaption></figure>

#### Editor

_LispPad_ allows users to configure the following aspects of editor windows:

* **Editor font**: The font used in editor windows.
* **Highlight current line**: When set, the line in which text is being edited is highlighted in yellow.
* **Show page guide**: When set, each text editor window will show a page guide at a certain text column specified by the setting "Page guide at column".
* **Show line numbers**: When set, each text window will display line numbers at left side of the text.editor
* **Highlight matching parenthesis**: When set, matching parenthesis are highlighted while code is being edited.
* **Automatically show completions after&#x20;**_**N**_**&#x20;seconds**: When this option is set, LispPad shows possible completions for the currently typed identifier after _N_ seconds of typing inactivity.
* **Page guide at column:** Show a page guide on editor windows after the given amount of characters.
* **Tab size**: Size of a single tab expressed in number of characters.

<figure><img src="/img/PreferencesEditor.png" alt=""><figcaption></figcaption></figure>

#### Syntax

_LispPad_ allows users to configure syntax highlighting for both Scheme as well as Markdown formats. Syntax highlighting can be controlled in three different ways:

1. Syntax highlighting can be switched on/off on a per-format basis
2. Automatic indentation can be switched on/off on a per-format basis
3. Colors that are used by the syntax highlighter can be freely configured.

There are two checkboxes with the following semantics:

* **Highlight syntax**: When this option is set, syntax will be highlighted while code is being edited.
* **Automatic indentation**: When set, code is automatically indented in each editor window.
* **Markup identifiers with documentation**: When this option is set and _Highlight syntax_ is enabled, identifiers for which LispPad has documentation available are marked up in the specified color.

<figure><img src="/img/PreferencesSyntax.png" alt=""><figcaption></figcaption></figure>
