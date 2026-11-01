---
sidebar_position: 70
---

# (lisppad system)

Library `(lisppad system)` defines an API for scripting the LispPad user interface. This library is specific to LispPad and is not bundled with LispKit.

Library `(lisppad system)` provides functionality primarily for managing LispPad windows: new windows can be created, properties of existing windows can be changed, and the content of existing windows can be accessed and modified. There is also support for making use of simple dialogs, e.g. for displaying messages, asking the user to make a choice, or for letting the user choose a file or directory in a load or save panel.

## Windows

`(lisppad system)` does not provide a data structure for modeling references to LispPad windows. Instead, it uses integer ids as references. Two different types of windows can be managed:

* _Edit windows_ are used for editing text, and
* _Graphics windows_ are used for displaying drawings created via library `(lispkit draw)`.

Other types of windows are currently not accessible via library `(lisppad system)`.

**(open-document&#x20;**_**path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Opens a document stored in a file at path _path_. Only documents that LispPad is able to open are supported.

**(edit-windows)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns an association list containing all open edit windows. Each open window has an entry of the form (_window id_ . _window title_). For example, the result of invoking `(edit-windows)` could look like this: `((106102873393392 . "LispKit Libraries.md") (106377751319520 . "Untitled"))`.

**(graphics-windows)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns an association list containing all open graphics windows. Each open window has an entry of the form (_window id_ . _window title_). For example, the result of invoking `(graphics-windows)` could look like this: `((106102873393789 . "My Drawing") (106377751899571 . "Untitled Drawing"))`.

**(window-name&#x20;**_**win**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the name of the window with window id _win_.

**(window-position&#x20;**_**win**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the position of the window with window id _win_. The position of a window is the upper left corner of its title bar represented as a point.

**(set-window-position!&#x20;**_**win pos**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Sets the position of the window with window id _win_ to point _pos_. The position of a window is the upper left corner of its title bar.

**(window-size&#x20;**_**win**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the size of the window with window id _win_. The size of a window consists of its width and height represented as a size.

**(set-window-size!&#x20;**_**win size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Sets the size of the window with window id _win_ to size _size_. The size of a window consists of its width and height.

**(close-window&#x20;**_**win**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Closes the window with window id _win_.

## Edit Windows

**(make-edit-window&#x20;**_**str pos size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Creates a new edit window containing _str_ as its textual content. The window's initial position is _pos_ and its size is _size_.

**(edit-window-text&#x20;**_**win**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the textual content of the edit window with the given window id _win_.

**(insert-edit-window-text!&#x20;**_**win str**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(insert-edit-window-text!&#x20;**_**win str start**_**)**\
**(insert-edit-window-text!&#x20;**_**win str start end**_**)**

Inserts a string _str_ replacing text between _start_ and _end_ for the edit window with window id _win_. It _start_ is not provided, _start_ is considered to be 0 (i.e. the text is inserted at the beginning). If _end_ is not provided, it is considered to be the length of the text contained in the edit window _win_.

**(edit-window-text-length&#x20;**_**win**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the length of the text contained in the edit window with window id _win_.

## Graphics Windows

**(make-graphics-window&#x20;**_**drawing dsize**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(make-graphics-window&#x20;**_**drawing dsize title**_**)**\
**(make-graphics-window&#x20;**_**drawing dsize title pos**_**)**\
**(make-graphics-window&#x20;**_**drawing dsize title pos size**_**)**

Creates a new graphics window for drawing _drawing_. _dsize_ refers to the size of the drawing. _title_ is the window title of the new window, _pos_ is its initial position, and _size_ corresponds to the initial size of the graphics window.

**(use-graphics-window&#x20;**_**drawing dsize title**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(use-graphics-window&#x20;**_**drawing dsize title pos**_**)**\
**(use-graphics-window&#x20;**_**drawing dsize title pos size**_**)**\
**(use-graphics-window&#x20;**_**drawing dsize title pos size ignore**_**)**

This is almost equivalent to function `make-graphics-window`. The main difference consists in `use-graphics-window` reusing an existing graphics window if there is one open with the given title. If there is no window whose title matches _title_, a new graphics window will be created. If a window exists already and boolean argument _ignore_ is set to `#t`, the existing window's position and size will not be updated.

**(update-graphics-window&#x20;**_**win**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

This function forces the graphics window with window id _win_ to redraw its content. Currently, graphics windows are only guaranteed to redraw automatically after executing a command in the session window which was used to create the drawing object.

**(graphics-window-drawing&#x20;**_**win**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the drawing associated with the graphics window with window id _win_.

**(set-graphics-window-drawing!&#x20;**_**win drawing**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Sets the drawing associated with the graphics window with window id _win_ to _drawing_.

**(graphics-window-label&#x20;**_**win**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Each graphics window has a label at the bottom of the window. This label can be arbitrarily modified, and e.g. used as a caption. `graphics-window-label` returns the label of the graphics window with window id _win_.

**(set-graphics-window-label!&#x20;**_**win str**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Each graphics window has a label at the bottom of the window. The label of graphics window _win_ can be set via function `set-graphics-window-label!` to string _str_.

**(drawing-size&#x20;**_**win**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the size of the drawing associated with graphics window _win_. Please note that this is not the _window size_ of _win_.

**(set-drawing-size!&#x20;**_**win size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Sets the size of the drawing associated with graphics window _win_ to _size_. Please note that this is not setting the _window size_ of _win_.

## Utilities

**(screen-size)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(screen-size&#x20;**_**win**_**)**

Returns the screen size of the screen on which window _win_ is displayed. If argument _win_ is omitted, function `screen-size` will return the size of the main screen.

**(show-message-panel&#x20;**_**title**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(show-message-panel&#x20;**_**title str**_**)**\
**(show-message-panel&#x20;**_**title str button**_**)**

Shows a message panel within the current session window. _title_ refers to the panel title, _str_ is the message to be displayed\_, and _button_ is the label of the confirmation button.

**(show-choice-panel&#x20;**_**title str**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(show-choice-panel&#x20;**_**title str yes**_**)**\
**(show-choice-panel&#x20;**_**title str yes no**_**)**

Shows a choice panel within the current session window. _title_ refers to the panel title, _str_ is the question to be asked, and _yes_ and _no_ refer to the two labels of the buttons for users to choose. The function returns `#t` if the user clicked on the "yes button".

**(show-load-panel&#x20;**_**prompt**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(show-load-panel&#x20;**_**prompt folders**_**)**\
**(show-load-panel&#x20;**_**prompt folders filetypes**_**)**

Displays a load panel within the current session window together with the given _prompt_ message. _folders_ is a boolean argument; it should be set to `#t` if the user is required to select a folder. _filetypes_ is a list of suffixes of selectable file types.

**(show-save-panel&#x20;**_**prompt**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(show-save-panel&#x20;**_**prompt filetypes**_**)**

Displays a save panel within the current session window together with the given _prompt_ message. _filetypes_ is a list of suffixes of selectable file types.

**(session-id)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a unique fixnum (within LispPad) identifying the session.

**(session-name)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the name of the LispPad session which executes this function.

**(session-display&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(session-display&#x20;**_**obj bold?**_**)**\
**(session-display&#x20;**_**obj bold? col**_**)**

Displays value _obj_ in the current session in color _col_ and in bold if _bold?_ is true.

**(session-write&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(session-write&#x20;**_**obj bold?**_**)**\
**(session-write&#x20;**_**obj bold? col**_**)**

Writes the value _obj_ into the current session in color _col_ and in bold if _bold?_ is true.

**(session-log&#x20;**_**time sev str**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(session-log&#x20;**_**time sev str tag**_**)**

Logs the message _str_ with severity _sev_ at the given timestamp _time_ (a double value) in the session log. _sev_ is one of the following symbols: `debug`, `info`, `warn`, `error`, or `fatal`.

**(project-directory)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the path to the project directory as defined in the preferences of LispPad. `project-directory` returns `#f` if no project directory was explicitly set.

**(dark-mode?)** <img class="kind" src="/img/proc.png" alt="procedure">

Return `#t` if the session window of the LispPad session which executes this function is rendered in _dark mode_; returns `#f` otherwise.

**(sleep&#x20;**_**sec**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Sleeps for _sec_ seconds.
