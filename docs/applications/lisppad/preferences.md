---
sidebar_position: 50
sidebar_label: Preferences
description: This page walks users through the various preferences of LispPad.
---

# Customizing preferences

The preferences of _LispPad_ are shown in the _Settings_ window which is opened via the menu item "LispPad > Settings..." (⌘,).
They are defined on five different tabs for configuring the Lisp environment, the [console with the read-eval-print loop](sessions.md), the built-in [text editor](editor.md), the syntax highlighting used in editor and session
windows, and the [Markdown viewer](markdown.md).

## Environment

<figure><img src="/img/prefs-environment.png" alt="Settings: Environment" loading="lazy"></figure>

Every time a new session is created, a _prelude_ is being loaded into the interpreter and executed. The
_prelude_ is a Scheme program (a `.scm` file) which is used to set up a session. The "Prelude" setting
on the environment tab can be set to two different values:

- **Default** loads the default/internal prelude of _LispPad_
- **Custom** loads the prelude from a custom file

It is possible to load the default/internal _LispPad_ prelude file into an editor window by opening the "File" menu
and pressing the "control" key. This will show the menu item "Open LispPad...". Selecting it will bring up an
"Open File" dialog for the folder that contains all _LispPad_-internal files. "Prelude.scm" is the default prelude file.

Similarly, it is possible to browse _LispKit_-internal files by opening the "File" menu and pressing the "option" key.

Libraries referenced from Scheme code are looked up from a set of folders. The "Libraries" setting
controls how libraries are found. It can be set to two different values:

- **Internal** only finds library definitions automatically that come natively installed with _LispPad_.
- **Custom** allows users to define a root folder from which library definitions are looked up. This folder can be located outside of the application sandbox. If libraries are not found there, they are being looked up in the set of natively installed libraries. This mechanism allows users to override default libraries by providing alternative implementations in the custom library folder.

LispPad provides a similar mechanism to reference asset files (e.g. images, videos, files, etc.) from Scheme code.
The "Assets" setting controls how such asset files are found. It can be set to two different values:

- **Internal** only finds assets that come natively installed with _LispPad_.
- **Custom** allows users to define a root folder from which asset files are looked up. This folder can be located outside of the application sandbox. If asset files are not found there, they are being looked up in the set of natively installed asset folders. This mechanism allows users to override default assets by providing alternative versions in the custom asset folder.

Since the _LispPad_ application is sandboxed, it is difficult to read and write files from outside of the sandbox. In order to work around this limitation, _LispPad_ allows users to define a custom _Project_ folder to which _LispPad_ has full file access to. This is controlled via the "Project" setting:

- **Sandbox** assumes that the project folder is located within the sandbox of the application
- **Custom** allows users to define a custom project folder outside of the sandbox.

The _LispPad_ application can share programs, libraries, and assets across multiple devices, including mobile devices which use _LispPad Go_. This is possible by using iCloud Drive. When iCloud Drive is enabled, files/libraries are first searched in the local custom folders (see above), then in iCloud Drive, and finally in the natively installed framework.

Including programs, libraries and assets from iCloud Drive is controlled via the iCloud Drive checkboxes on the environment pane:

- **Include Libraries** makes the libraries in the iCloud Drive folder of LispPad available to Scheme code.
- **Include Assets** makes the assets in the iCloud Drive folder available.
- **Include in search path** adds the iCloud Drive folder to the search path for files, so that programs that are stored in iCloud Drive can be loaded by relative path, e.g. via `load`.

iCloud Drive needs to be enabled in the System Settings of macOS for these settings to have an effect. When iCloud Drive is used for the first time, it is important that the right folder structure gets created. This can be done by pressing the button "Create Folder Structure" (it won't have an effect if that structure was created already before, e.g. from a mobile device). Button "Show Folder in Finder" can be used to navigate to the iCloud Drive folder of LispPad in Finder.

Changes of these settings take effect for sessions that are created afterwards.

## Console

<figure><img src="/img/prefs-console.png" alt="Settings: Console" loading="lazy"></figure>

_LispPad_ allows users to configure the following aspects of sessions:

- **Console font**: The font used by the read-eval-print loop in the console of a session.
- **Custom result formatting**: When this option is set, results are printed with the formatting facility of _LispKit_ (see library `(lispkit format)`), which breaks long results into multiple lines. Otherwise, results are printed in their plain form.
- **Insert images for drawing and image results**: When this option is set, results that are drawings or images are shown as images in the console, below the textual representation of the result. The _maximum size_ in points limits how large such images may be; larger images are scaled down.
- **Highlight matching parenthesis**: Shows matching parenthesis when entering code in the read-eval-print
loop in the console of a session.
- **Require balanced parenthesis**: When this option is set, the read-eval-print loop does not allow users to
submit unbalanced code.
- **Highlight syntax**: When this option is set, syntax will be highlighted when entering code in the read-eval-print
loop in the console of a session.
- **Markup identifiers with documentation**: When this option is set and _Highlight syntax_ is enabled, identifiers for which LispPad has documentation available are marked up in a color that can be specified in the _Syntax_ preferences pane.
- **Automatically show completions after _N_ seconds**: When this option is set, LispPad shows possible completions for the currently typed identifier after _N_ seconds of typing inactivity.
- **Command history**: The number of read-eval-print loop inputs remembered in a session. Users can switch between
those by using the key combinations `<option>+<cursor up>` and `<option>+<cursor down>`.
- **Prompt**: Defines the prompt used for indicating input in the read-eval-print loop.
- **Log: Commands and results**: When this option is set, all commands executed in the read-eval-print loop will be logged and are accessible in the session log, which can be displayed by selecting "Session Log" from the "Window" menu.
- **Log: Garbage collection**: When this option is set, all garbage collector runs are logged and are accessible in the session log, which can be displayed by selecting "Session Log" from the "Window" menu.
- **Log history**: The number of entries to keep in the session log. As soon as the number of session log entries has reached its limit, the oldest entries are getting purged when new entries are being added.
- **Call trace**: The maximum number of procedure calls that are shown in stack traces, e.g. when an error is printed.
- **Max stack size**: The maximum stack size, in thousands of entries. If the size of the stack is about to grow beyond this limit, the interpreter will abort with a stack overflow error.

## Editor

<figure><img src="/img/prefs-editor.png" alt="Settings: Editor" loading="lazy"></figure>

_LispPad_ allows users to configure the following aspects of editor windows:

- **Editor font**: The font used in editor windows.
- **Highlight current line**: When set, the line in which text is being edited is highlighted in yellow.
- **Show page guide**: When set, each text editor window will show a page guide at a certain text column
specified by the setting "Page guide at column".
- **Show line numbers**: When set, each text editor window will display line numbers at left side of the text.
- **Highlight matching parenthesis**: When set, matching parenthesis are highlighted while code is being edited.
- **Select identifiers on double-click**: When set, double-clicking on an identifier selects the whole identifier, including characters such as `-` or `?` that are part of Scheme identifiers.
- **Automatically show completions after _N_ seconds**: When this option is set, LispPad shows possible completions for the currently typed identifier after _N_ seconds of typing inactivity.
- **Page guide at column:** Show a page guide on editor windows after the given amount of characters.
- **Tab size**: Size of a single tab expressed in number of characters.

## Syntax

<figure><img src="/img/prefs-syntax.png" alt="Settings: Syntax" loading="lazy"></figure>

_LispPad_ allows users to configure syntax highlighting for both Scheme as well as Markdown formats.
Syntax highlighting can be controlled in three different ways:

1. Syntax highlighting can be switched on/off on a per-format basis
2. Automatic indentation can be switched on/off on a per-format basis
3. Colors that are used by the syntax highlighter can be freely configured.

There are the following checkboxes with the following semantics:

- **Highlight syntax**: When this option is set, syntax will be highlighted while code is being edited.
- **Automatic indentation**: When set, code is automatically indented in each editor window.
- **Markup documented identifiers** (Scheme only): When this option is set and _Highlight syntax_ is enabled, identifiers for which LispPad has documentation available are marked up in the specified color.

Every color can be chosen separately for the light and the dark appearance of macOS: the color well on the left
defines the color in light mode, the color well on the right the color in dark mode. As long as no dark color was chosen,
LispPad derives a suitable color for dark mode from the light color. The button "Reset Dark Colors" discards all dark colors that
were chosen. The colors of editor and session windows change right away when the appearance of the system changes.

## Markdown Viewer

<figure><img src="/img/prefs-markdown.png" alt="Settings: Markdown Viewer" loading="lazy"></figure>

The _Markdown Viewer_ tab configures the preview of [Markdown documents](markdown.md):

- **Open preview**: When this option is set, the preview is shown right away when a Markdown document is opened. Otherwise, it can be shown via the Preview button of the toolbar.
- **Document width**: The maximum width of the text in the preview, in points. Changes take effect immediately.
- **Images**: When the option "Load images from the web" is set, the preview loads images that are referenced via a web address. Otherwise, only the description of such an image is shown.
- **Maximum image width** and **Maximum image height**: Limit the size of images in the preview, in points. These limits also apply to diagrams and formulas, if a limit is set. An empty height field ("No limit") means that the height of images is not limited.
