---
sidebar_position: 60
sidebar_label: Menus
description: This is a summary of the available menus and the functionality they provide.
---

# Menu overview

This page summarizes the menus of LispPad. Which of the menu items are available depends on the kind of window that is in front:
editing commands, for instance, only work in editor and session windows, and the commands of the "Session" menu are meant for session windows and for editor windows with Scheme code.
Some items are alternates that only show up while a modifier key is held down; they are marked with "(with ⌥)", "(with ⌃)", etc.

## LispPad menu

| Menu item | Shortcut | Description |
|:----------|:---------|:------------|
| About LispPad | | Shows the version of LispPad |
| Settings... | ⌘, | Opens the [Settings window](preferences.md) |
| Hide LispPad, Hide Others, Show All | ⌘H, ⌥⌘H | Hides and shows applications |
| Quit LispPad | ⌘Q | Quits LispPad |

## File menu

| Menu item | Shortcut | Description |
|:----------|:---------|:------------|
| New | ⌘N | Creates a new document for Scheme code |
| New Session | ⇧⌘N | Opens a new [session](sessions.md) |
| New Tab | ⌘T | Creates a new document of the same kind as the current window, in a new tab of that window |
| Open... | ⌘O | Opens a file: a session, a program, a library, or a Markdown or text document |
| Open LispKit... | ⌥⌘O (with ⌥) | Browses the files that are internal to the LispKit framework |
| Open LispPad... | ⌃⌘O (with ⌃) | Browses the files that are internal to LispPad, such as the default prelude |
| Open Recent | | Shows the documents that were opened recently |
| Close | ⌘W | Closes the window or tab |
| Save... | ⌘S | Saves the document |
| Save As... | ⇧⌘S | Saves the document under a different name |
| Revert to Saved | | Discards all changes since the document was saved last |
| Export... | ⇧⌘E | Exports the drawing of a graphics window into a file |
| Share | | Shares a saved document with other applications or people |
| Show in Finder | | Reveals the file of the document in the Finder |
| Show Folder | | Opens the library, assets, project or iCloud Drive folder in the Finder |
| Page Setup... | ⇧⌘P | Sets up the page for printing |
| Print... | ⌘P | Prints the content of the window |

## Edit menu

| Menu item | Shortcut | Description |
|:----------|:---------|:------------|
| Undo, Redo | ⌘Z, ⇧⌘Z | Reverts and reapplies changes |
| Cut, Copy, Paste | ⌘X, ⌘C, ⌘V | Standard clipboard commands; text is pasted without its formatting. Copying text from a session or an editor also puts a formatted version on the clipboard, and copying a single image from a session copies the image. |
| Duplicate | ⇧⌘D | Duplicates the selected text |
| Select All | ⌘A | Selects the whole text |
| Select Line | ⌘L | Selects the current line |
| Select Expression | ⌘E | Selects the Scheme expression around the cursor |
| Complete | ⌘/ | Completes the identifier that is being typed |
| Indentation | | Indent All (⇧⌘I), Indent Selection (⌘I), Increase Indentation (⌘]), Decrease Indentation (⌘[) |
| Comments | | Comment (⌘;) and Uncomment (⇧⌘;) the selected lines |
| Lines | | Duplicate (⇧⌘X) or delete the selected lines |
| Jump to | | Jumps to a line (Line...), to the selection (⌘J), to the beginning (⇧⌘B) or to the end (⇧⌘E) of the document |
| Find | | Find... (⌘F), Find and Replace... (⌥⌘F), Find Next (⌘G), Find Previous (⇧⌘G), Use Selection for Find (⌥⌘E) |
| Substitutions | | Smart copy/paste, quotes, dashes, links and text replacement |
| Transformations | | Changes the capitalization of the selected text |
| Speech | | Reads the selected text aloud |
| Emoji & Symbols | ⌃⌘Space | Shows the character palette |

## View menu

| Menu item | Shortcut | Description |
|:----------|:---------|:------------|
| Show Toolbar | ⌥⌘T | Shows or hides the toolbar of the window |
| Customize Toolbar... | | Lets users choose the buttons of the toolbar |
| Show Sidebar | ⌃⌘S | Shows or hides the [inspectors](sessions.md#session-inspectors) of a session window |
| Show Preview | ⌥⌘P | Shows or hides the [preview](markdown.md) of a Markdown document |
| Graphics Properties | | Edits the properties of a graphics window |
| Actual Size, Zoom In, Zoom Out | ⌘=, ⌘+, ⌘- | Changes the zoom level of graphics windows, Markdown previews, and the [library documentation](library-documentation.md) |
| Enter Full Screen | ⌃⌘F | Shows the window in full screen mode |

## Session menu

| Menu item | Shortcut | Description |
|:----------|:---------|:------------|
| Run | ⌘R | Runs the code of the editor window in a session |
| Stop | ⌘. | Stops the evaluation of code |
| Force Stop | ⇧⌘. (with ⌥) | Forces the evaluation of code to stop |
| Load File... | ⇧⌘R | Loads a program into the session and executes it |
| Save Transcript... | | Saves the transcript of the session as plain text, RTF or RTFD |
| Clear Console | ⌘K | Wipes the content of the session window |
| Reset Session | ⇧⌘K | Discards the state of the session and restarts it |
| Show Session Log | ⇧⌘L | Shows the [session log](sessions.md#session-log) |

## Window menu

| Menu item | Shortcut | Description |
|:----------|:---------|:------------|
| Minimize, Zoom | ⌘M | Standard window commands, including tiling of windows |
| Session Log | ⌃⌘L | Shows the [session log](sessions.md#session-log) |
| Library Documentation | ⌘B | Shows the [Library Documentation](library-documentation.md) window |
| Bring All to Front | | Brings all windows of LispPad to the front |
| Keep Windows when Quitting | | When checked, LispPad reopens its windows the next time it is started |
| List of windows | ⌘0-⌘9, ⌃0-⌃9 | Selects one of the open editor windows (⌘) or session windows (⌃) |

## Help menu

| Menu item | Shortcut | Description |
|:----------|:---------|:------------|
| LispPad Help | ⇧⌘0 | Opens this help |
| LispPad Homepage, LispKit Homepage | ⇧⌘1, ⇧⌘2 | Opens the websites of LispPad and LispKit |
| R7RS Specification | ⇧⌘3 | Opens the specification of Scheme (R7RS small) |
| LispPad Library Reference | ⇧⌘4 | Opens the LispPad library reference |
| Example Code | | Opens a dialog for choosing one of the example programs that come with LispPad or LispKit |
| Show Quick Help... | ⌘D | Shows the documentation for the identifier at the cursor |
