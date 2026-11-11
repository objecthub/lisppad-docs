---
sidebar_position: 40
description: This page explains how to browse the documentation of the libraries that come with LispPad.
---

# Library documentation

LispPad comes with documentation for most of the libraries that are available to Scheme programs. The documentation
is shown in the _Library Documentation_ window. It can be opened in a number of ways:

- via the menu item "Window > Library Documentation" (⌘B)
- via the **Libraries** button in the toolbar of session windows (the book icon)
- by clicking the document icon of a library in the [Libraries inspector](sessions.md#libraries) of a session

The documentation of individual identifiers is also available as _quick help_ in session and editor windows (⌘D),
and in the [Environment inspector](sessions.md#environment) of a session.

## The Library Documentation window

The window consists of three panes:

<figure><img src="/img/library-documentation.png" alt="The Library Documentation window showing a library" loading="lazy"></figure>

1. The left pane lists all libraries that are documented, sorted by name. The first entry, **All Libraries**, stands for all libraries at once.
2. The middle pane lists the identifiers that are documented for the selected library. The first entry, **Library Overview**, shows the general description of
   the library. The name of the selected library is shown at the top of the pane.
3. The right pane shows the documentation of the selected library or of the selected identifier.

Both lists have a **Filter** field at the top. Typing into the field restricts the list to the entries that contain the entered text.
The button in the toolbar at the top left hides and shows the list of libraries.

When an identifier is selected, the toolbar above the documentation shows its name and, in a capsule, what kind of identifier it is, e.g. _procedure_ or _syntax_.
The documentation itself starts with the signature of the identifier, followed by a description and, usually, examples:

<figure><img src="/img/library-documentation-symbol.png" alt="The documentation of a syntax definition" loading="lazy"></figure>

### Looking up identifiers across libraries

To search for an identifier without knowing the library that defines it, select **All Libraries** and type the name into the
filter field of the middle pane. In this mode, each documented identifier is listed once. If an identifier is defined in more than one library,
the documentation of all these libraries is shown, each preceded by a header with the name of the library (and the kind of identifier, if it differs between the libraries).

### Navigating

The two arrows next to the title in the toolbar go back and forward in the history of everything that was shown in the window, similar to a web browser.
The **Text Size** pull-down menu at the right end of the toolbar changes the size of the text to 80%, 90%, 100%, 110% or 120%. The size is remembered.
"View > Zoom In", "View > Zoom Out" and "View > Actual Size" do the same from anywhere within the window.

## Libraries and SRFIs

Library overviews usually describe the purpose of the library and provide examples, followed by the documentation of every
exported identifier. Libraries which implement a _Scheme Request for Implementation_ (SRFI), such as `(srfi 1)`, come with the text of the
corresponding SRFI as their overview.

Libraries that are not documented in the window, e.g. libraries that were added by users to the custom library folder, do not
show up in the list of libraries. For those libraries, no document icon is shown in the Libraries inspector either.

The _LispPad Library Reference_, a PDF document which describes the libraries as well, can be opened with "Help > LispPad Library Reference". It can also be downloaded from the [Downloads](../../downloads.md) page.
