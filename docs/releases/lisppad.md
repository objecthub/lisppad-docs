---
sidebar_position: 10
---

# LispPad

The latest version of [LispPad for macOS](https://apps.apple.com/de/app/lisppad/id1258939760) can always be found on the Mac App Store. Below is a history of all releases, including links to the corresponding notarized versions of the binaries.\
[![](/img/MacAppStore.png)](https://apps.apple.com/de/app/lisppad/id1258939760)

<details open>

<summary><strong>Version 2.4</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2026-11-11

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed a potential crash and memory leak when closing a session
* Optimized code completion suggestions
* Graphics windows that are created without explicit dimensions now fit their drawing
* Fixed several layout issues in session, editor and graphics windows
* Saved editor documents can now be shared via "File > Share"
* Fixed the handling of errors raised by the virtual machine, the exit procedure, a compiler bug, and thread-related crashes

_<mark style="color:green;">New features:</mark>_

* User interface is now compliant with Liquid Glass
* Session and editor windows now support dark mode and follow the appearance of the system
* Syntax colors can be set separately for the light and the dark appearance
* New _Library Documentation_ window for browsing the documentation of all libraries and their identifiers
* New _Markdown_ editor with a live preview next to the editor. The preview supports tables, task lists, syntax-highlighted code blocks, images, Mermaid diagrams and mathematical formulas, follows the scroll position of the editor, and has a text size menu. Images that are referenced by relative path can be loaded after granting access to the folder of the document.
* The Run button of editor windows can be configured by choosing the session in which the code is run (by holding down the button)
* Drawings and images that are returned by expressions in a session are now shown as images below their textual representation. The maximum size of such images can be defined in the settings.
* Text and images can be copied or exported from sessions and editors with their formatting
* The "+" button in session windows shows a menu of the most recently loaded programs when it is held down
* New menu item "File > New Tab" for opening a new document in a tab of the current window
* Library `(lispkit markdown)` now supports task lists, underline, strikethrough, LaTeX formulas, and Mermaid diagrams, and can export documents as PDF and RTF
* Library `(lispkit http server)` fixes a path traversal vulnerability, supports persistent connections, and listens on the loopback address by default
* Extensions of libraries `(lispkit draw)`, `(lispkit date-time)`, `(lispkit system)`, `(lispkit vision)`, and `(lispkit json)`

</details>

<details>

<summary><strong>Version 2.3.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2026-09-16\
_<mark style="color:green;">Download:</mark>_ [LispPad 2.3.1 (1843)](https://zenger.org/lisppad/assets/LispPad_2.3.1-1843.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Bug fixes in library `(lispkit date-time)`
* Worked around Shortcuts bug and moved attachments up into the summary of the "Run Program" action
* Fixed inline documentation for new libraries and procedures

_<mark style="color:green;">New features:</mark>_

* New sample code: `DrawCalendar.scm`

</details>

<details>

<summary><strong>Version 2.3</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2026-09-13\
_<mark style="color:green;">Download:</mark>_ [LispPad 2.3 (1833)](https://zenger.org/lisppad/assets/LispPad_2.3-1833.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed behavior of procedure `string->number`
* Several bug fixes in library `(lispkit image)`, especially related to preserving the orientation of images
* Fixed `Examples/MermaidDiagrams.scm`

_<mark style="color:green;">New features:</mark>_

* LispPad programs can now be executed as "applets" running both in the app and as an intent within Shortcut flows
* Included libray `(lisppad applet)` which provides an API for managing the lifecycle of an applet, in particular supporting data exchange
* New library for drawing function charts: `(lispkit draw chart function)`
* Support for turning Markdown into a textual representation to be displayed on ANSI terminals via library `(lispkit markdown)`; new procedures `markdown->string` and `markdown->styled-text`
* Support aligning/padding based on display width in library `(lispkit format)` with procedures `format-config-align-display` and `format-config-align-display-set!`
* New procedure `string-display-width` in library `(lispkit string)`
* New procedures `device-battery-level` and `device-battery-state` in library `(lispkit system)`
* New procedures `show-preview-panel`, `show-preview-panel-for-file`, `load-bitmaps-from-library`, `load-bytevectors-from-library`, and `save-bitmap-in-library` in library `(lisppad system macos)`
* Updated LispPad Library Reference and included new documentation for libraries `(lispkit sxml)`, `(lispkit sxml html)`, `(lispkit sxml xml)`, `(lispkit wt-tree)`, `(lispkit draw chart function)`, `(lisppad audio)`, and `(lisppad applet)`
* New sample code: `ImposeLogo.scm`, `DrawFunctionCharts.scm`, `Connect4.scm`, `AnsiMarkdown.scm`

</details>

<details>

<summary><strong>Version 2.2</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2026-02-01\
_<mark style="color:green;">Download:</mark>_ [LispPad 2.2 (1744)](https://zenger.org/lisppad/assets/LispPad_2.2-1744.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* UI tweaks for macOS 26
* Fixes `quasiquote` for expressions involving array literals
* Fixes the `(library ...)` directive of `cond-expand`&#x20;

_<mark style="color:green;">New features:</mark>_

* New application icon consistent with LispPad Go on iOS
* New library for handling locations: `(lispkit location)`
* New library for creating and editing PDF documents: `(lispkit pdf)`
* New library for solving computer vision problems: `(lispkit vision)`; the library supports optical character recognition (OCR), shape detection, barcode recognition, and image classification.
* New libraries for processing/manipulating images, providing access to Apple's _Core Image_ framework: `(lispkit image)`, `(lispkit image process)`
* New library for drawing maps: `(lispkit draw map)`
* New library for making and drawing snapshots of web pages: `(lispkit draw web)`
* New exported definitions in library `(lispkit draw)`: `clip-drawing`, `bitmap-ppi`, `closed-polygon`, `inset-rect`, `size-ratio`, `rect-mid-point`, `rect-mid-x`, `rect-mid-y`, `zero-size`, `transpose`. `make-shape` accepts a second optional argument `freeze?` which makes it possible to create a new shape from an existing one without introducing a dependency.
* Improvements for reading and writing images via `(lispkit draw)`: PDF files can now be read via `load-image`, `load-image-asset` and `bytevector->image` also on iOS. New procedures `save-image` and `image->bytevector` support saving images as PDF. `save-bitmap` and `bitmap->bytevector` now support a "quality factor" which indicates how strongly an image should be compressed.
* New procedures in library `(lispkit core)`: `generate-uninterned-symbol`, `symbol<?`
* New functionality for library `(lispkit enum)`: procedure `enum-tag-mapper` and enum constructors without name (to return the enum type)
* Make it easier to generate `date-time` strings with procedure `date-time->iso8601-string` and parse date-time strings via `string->date-time` conforming with ISO 8601/RFC 3339.
* API changes in library `(lispkit object)`; generic procedure `object->string` was renamed to `object-description`
* New sample code: `ImageComposition.scm`, `OCR.scm`, `MermaidDiagrams.scm`, `Pinterest.scm`

</details>

<details>

<summary><strong>Version 2.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2024-11-24\
_<mark style="color:green;">Download:</mark>_ [LispPad 2.1 (1699)](https://zenger.org/lisppad/assets/LispPad_2.%60-1699.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed equivalence procedures for bitsets

_<mark style="color:green;">New features:</mark>_

* Support for all major JSON standards with libraries `(lispkit json)` and `(lispkit json schema)`
* Support for HTTP-based networking with libraries `(lispkit http)`, `(lispkit http oauth)`, and `(lispkit http server)`
* Deeper integrations into macOS via libraries `(lispkit system keychain)` and `(lispkit system pasteboard)`
* New concurrency features with support for _atomic boxes_ with library `(lispkit box)`, thread-safe shared queues with library `(lispkit thread shared-queue)`, and futures with `(lispkit thread future)`.
* Support for drawing a variety of barcodes with library `(lispkit draw barcode)`
* New libraries: `(lispkit url)`, `(lispkit serialize)`
* Extended libraries: `(lispkit thread)`, `(lispkit system)`, `(lispkit bytevector)`, `(lispkit markdown)`, `(lispkit dynamic)`, and `(lispkit control)`
* New sample code: `OAuthDemo.scm`, `Keychain.scm`, `WebAPIs.scm`, and `Webserver.scm`

</details>

<details>

<summary><strong>Version 2.0.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2024-02-29\
_<mark style="color:green;">Download:</mark>_[ LispPad 2.0.1 (1633)](https://zenger.org/lisppad/assets/LispPad_2.0.1-1633.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fix saving the content of graphics windows

_<mark style="color:green;">New features:</mark>_

* Provide line-based editing features (delete and duplicate lines)
* Support selection of lines
* Support duplication of selected text
* Implement smarter parenthesis matching

</details>

<details>

<summary><strong>Version 2.0</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2024-02-09\
_<mark style="color:green;">Download:</mark>_ [LispPad 2.0 (1575)](https://zenger.org/lisppad/assets/LispPad_2.0-1575.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Enforce that imported (immutable) definitions cannot be mutated, unless it's in the read-eval-print loop; `export-mutable` in library definitions enable mutability
* Improved display of OS-level exceptions and errors in read-eval-print loop
* Bug fixes in window management API provided by `(lisppad system macos)`

_<mark style="color:green;">New features:</mark>_

* Revamp of graphics windows with support for a toolbar, zoom, export of drawings, and editing of window properties
* Ported universal formatting facility from Common Lisp and made it available via library `(lispkit format)`
* Support customization of read-eval-print-loop result formatting
* Library `(lispkit records)` now supports extensible records compatible with SRFI 131
* Procedure `type-of` of library `(lispkit type)` now returns a list of type tags (from most specific to least specific type)
* New library `(lisppad turtle)` supporting indicators for turtles
* Support for currencies included in library `(lispkit system)`
* Renamed library `(lisppad system)` to `(lisppad system macos)`
* Renamed library `(lispkit system os)` to `(lispkit system call)`
* Extended libraries: `(lispkit system)`, `(lispkit port)`, `(lispkit bitset)`, `(lispkit system)`, `(lispkit draw)`, `(lispkit draw turtle)`, `(lispkit core)`, `(lispkit type)`, `(lispkit bytevector)`, and `(lisppad location)`
* New libraries: `(lisppad turtle)`, `(lispkit format)`, `(lispkit crypto)`, `(lispkit archive tar)`, `(lispkit list set)`, `(srfi 239)`, and `(srfi 235)`
* New sample code: `Blockchain.scm`

</details>

<details>

<summary><strong>Version 1.7.3</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2023-02-12\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.7.3 (1400)](https://zenger.org/lisppad/assets/LispPad_1.7.3-1400.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Improved R7RS regression tests
* Bugfixes in library `(lispkit bytevector)` for procedures `bytevector-copy` and `bytevector-copy!`

_<mark style="color:green;">New features:</mark>_

* Revamp of library `(lispkit graph)` with new procedures: `graph-topological-sort`, `graph-graph-weakly-connected-components`, `graph-strongly-connected-components`, and `graph-shortest-paths`
* New libraries: `(srfi 228)`, `(srfi 233)`, and `(srfi 236)`
* New documentation for library `(lispkit graph)`

</details>

<details>

<summary><strong>Version 1.7.2</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2022-12-22\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.7.2 (1395)](https://zenger.org/lisppad/assets/LispPad_1.7.2-1395.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed bug leading to deadlocks when using text ports
* Fixed bug allowing to execute empty lists
* Fixed serious bug leading to an infinite loop when iterating through stack traces

_<mark style="color:green;">New features:</mark>_

* New menu item "Show in Finder" to show the current document in the Finder
* Display memory footprint in session inspector
* Show call stack when errors are shown in sessions
* Limit stack size to prevent application crashes
* New settings for defining the maximum stack size and the maximum number of active calls to trace upon errors
* New procedure in library `(lispkit thread)`: `thread-max-stack`
* Included new libraries: `(lisppad draw map)`
* New sample code: `DisplayMap.scm`

</details>

<details>

<summary><strong>Version 1.7.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2022-08-14\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.7.1 (1361)](https://zenger.org/lisppad/resources/LispPad_1.7.1-1361.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Bug fixes to indentation with spaces and semicolons
* Bug fixes in library `(lispkit draw chart bar)` and `(lispkit enum)`
* Fixed division by zero issues with truncate and floor procedures
* Fixed bug preventing LispKit to correctly determine the maximum number of threads
* Optimized display of objects of custom types
* Removed duplicates in results of procedures `available-fonts` and `available-font-families` in library `(lispkit draw)`
* Changed defaults for procedure `string-insert!` of library `(lispkit string)`
* Made procedure `open-file` of library `(lispkit system)` work on iOS

_<mark style="color:green;">New features:</mark>_

* Performance improvements: Optimized code generation for lambdas without captured expressions
* Major revamp of all type-related functionality: each type is now represented by a type tag/symbol; procedure `type-for` from library `(lispkit type)` can be used to determine the type tag of a given object; breaking change for `make-type`, which now returns 5 values (the first is a new type tag)
* Major revision of library `(lispkit clos)`
* Support complex numbers for trigonometric and inverse trigonometric functions in library `(lispkit math)`: `sin`, `cos`, `tan`, `asin`, `acos`, and `atan`
* Reimplemented and extended library `(lispkit enum)` making it compatible with SRFI 209
* New procedures in library `(lispkit draw)`: `bytevector->image`, `draw-styled-text`, `styled-text-size`
* New procedure in library `(lispkit core)`: `procedure-rename`
* Included new libraries: `(lispkit math matrix)`, `(lispkit bitset)`, `(lispkit styled-text)`, `(lispkit draw chart bar)`, `(srfi 118)`, `(srfi 141)`, `(srfi 149)`, and `(srfi 232)`
* New sample code: `ObjectOrientation.scm`, `DrawBarCharts.scm`, and `StyledTextDoc.scm`

</details>

<details>

<summary><strong>Version 1.7</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2022-02-19\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.7.0 (1344)](https://zenger.org/lisppad/resources/LispPad_1.7.0-1344.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed several bugs in math libraries:
  * Prevent crash on division by zero for `fx/`
  * Make `exact` also work for negative numbers
  * Improve `inexact` when used with rationals with a very large numerator or denominator
* Fixed scope of `<sym>` in `(let <sym> ...)` form, making it not accessible in the bindings

_<mark style="color:green;">New features:</mark>_

* Allow preserving window setup when LispPad quits even if the setting "Close windows when quitting an app" is enabled.
* Multi-threaded evaluator, executing multiple virtual machines in parallel
* Go-inspired channels for synchronizing threads
* Revamp of math libraries, addressing incompatibilities and fixing numerous bugs:
  * Introduce consistent interface for: `random`, `flrandom`, and `fxrandom`
  * Support unary arguments for `fx-`, `fl-`, and `fl/`
  * Remove `fixnum-width`, `least-fixnum` and `greatest-fixnum`
  * New procedures `make-flonum`, `flexponent`, `flsignificand`, `flnext`, `flprev`, `fx-width`, `fx-greatest`, `fx-least`, `fl-epsilon`, `fl-greatest`, and `fl-least`
  * Support for many arguments for procedures `flmin`, `flmax`, `fxmin`, `fxmax`, `fx+`, `fx-`, `fx*`, `fx/`, `fx=`, `fx<`, `fx>`, `fx<=`, `fx>=`, `fl+`, `fl-`, `fl*`, `fl/`, `fl=`, `fl<`, `fl>`, `fl<=`, and `fl>=`
* New procedures in library `(lispkit math util)`: `make-nan`, `nan-negative?`, `nan-quiet?`, `nan-payload`, and `nan=?`
* New procedures in library `(lispkit system)`: `physical-memory`, `memory-footprint`, and `system-uptime`
* New procedure in library `(lispkit port)`: `display*`
* New procedures in library `(lispkit debug)`: `stack-size`, `call-stack-procedures`, `call-stack-trace`, and `set-max-call-stack!`
* Enabled concurrency support for library `(srfi sicp)`
* Included new libraries: `(lispkit thread)`, `(lispkit thread channel)`, `(scheme flonum)`, `(srfi 18)`, `(srfi 144)`, `(srfi 208)`, `(srfi 230)`
* Exceptions now include more information about the active call stack
* Include tutorial for channels as new example code

</details>

<details>

<summary><strong>Version 1.6.3</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2021-12-17\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.6.3 (1329)](https://zenger.org/lisppad/resources/LispPad_1.6.3-1329.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Increased stack size of interpreter
* Fixed file/editor loader
* Fixed bug compiling every procedure twice
* Fixed implementation of procedure `expt`
* Fixed overflow issues in procedure `approximate`
* Fixed crashes in the rounding functions when used with rational big integers
* Moved procedure `load` into library `(lispkit core)`

_<mark style="color:green;">New features:</mark>_

* Integrated simple bytecode optimizer
* Implemented support for tagged procedures
* Implemented support for procedures with optional arguments
* Included new libraries: `(lispkit math util)`, `(lispkit math stats)`, `(srfi 166)`, `(srfi 227)`, and `(srfi 229)`
* Included new documentation for libraries `(lispkit prolog)`, `(lispkit math stats)`, `(lispkit math util)`, `(srfi 166)`, `(srfi 227)`, and `(srfi 229)`
* Ported Peter Norvig's pattern matcher and algebraic simplifier from Common Lisp to Scheme and included it as new example code
* Extended sample code `Math.scm`
* Updated PDF library reference manual

</details>

<details>

<summary><strong>Version 1.6.2</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2021-10-10\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.6.2 (1300)](https://zenger.org/lisppad/resources/LispPad_1.6.2-1300.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed bug in logic to detect valid local definitions
* Handle libraries with errors more carefully to prevent crashes
* Fixed bit counting bug in library `(srfi 143)` and `expt` in `(lispkit math)`

_<mark style="color:green;">New features:</mark>_

* Include all libraries in the library inspector, including libraries that are not loaded
* Support filtering in the libraries inspector
* New procedures in library `(lispkit core)`: `thunk?`, `procedure-of-arity?`, `procedure-name`, `procedure-arity`, `procedure-arity-range`, `procedure-arity-includes?`, `arity-at-least?`, `arity-at-least-value`
* Added procedure `icloud-directory` to library `(lisppad system)`
* Included new libraries: `(srfi sicp)`, `(srfi 102)`, `(srfi 217)`, `(srfi 224)`
* Included new documentation for library `(lispkit text-table)`
* New sample code: `Simplifier.scm`; extended sample code `Math.scm`

</details>

<details>

<summary><strong>Version 1.6.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2021-08-21\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.6.1 (1241)](https://zenger.org/lisppad/resources/LispPad_1.6.1-1241.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed behavior of "Play" button in editor windows, now setting the source directory correctly
* Bug fixes in library `(lispkit system)`: `home-directory` also supports a non-sandboxed mode, `file-path` handles tilde correctly
* Bug fixes for a few procedures of library `(lispkit archive zip)`
* Bug fix in procedure `load` (previously, `load` always returned no result instead of the result of the last executed expression)

_<mark style="color:green;">New features:</mark>_

* New procedures in library `(lispkit draw)`: `bitmap->bytevector`, `bitmap-blur`, `bitmap-crop`
* Support tables and definition lists in library `(lispkit markdown)`
* Support gzip and zlib container formats for deflate compression via library `(lispkit bytevector)`
* Support symlink resolution via procedure `file-path` of library `(lispkit system)`
* Included new libraries: `(lisppad location)`, `(lispkit text-table)`, `(srfi 215)`, `(srfi 216)`, `(srfi 219)`, `(srfi 221)`, `(srfi 222)`, `(srfi 223)`
* Included new sample code `EUStats.scm`; extended sample code `Math.scm`
* Minor update of the LispPad and LispKit library documentation

</details>

<details>

<summary><strong>Version 1.6</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2021-05-28\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.6.0 (1226)](https://zenger.org/lisppad/resources/LispPad_1.6.0-1226.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Allow `let*` and `letrec*` to redefine variables
* Minor bug fixes in LispKit libraries

_<mark style="color:green;">New features:</mark>_

* Execute LispPad code on iOS with [LispPad Go](https://apps.apple.com/us/app/lisppad-go/id1565747728)
* Sync LispPad code via iCloud and use it with [LispPad Go](https://apps.apple.com/us/app/lisppad-go/id1565747728) on iPhones and iPads
* Show Markdown document structure in editor windows
* Associate descriptions and help text with definitions (in Common Lisp style)
* New libraries: `(lisppad audio)`, `(lispkit archive zip)`, `(lispkit prolog)`, `(srfi 143)`, `(srfi 189)`, `(srfi 214)`, `(srfi 219)`, `(scheme red)`, `(scheme fixum)`, `(scheme bitwise)`, `(scheme division)`
* Extended library `(lispkit string)` with procedures `string-decode-named-chars` and `string-encode-named-chars`
* Extended library `(lispkit char)` with procedure `char-name`
* Extended library `(lispkit core)` with new environment procedures: `interaction-environment?`, `custom-environment?`, `the-environment`, `environment-definable?`, `environment-define`, `environment-define-syntax`, `environment-import`, `environment-documentation`, and `environment-assign-documentation!`
* Extended library `(lispkit sqlite)` with procedures `sqlite-database?` and `sqlite-statement?`
* Support custom environments for the `compile` procedure of `(lispkit debug)`
* New sample code: `PlayMusic.scm`, `ObliqueProjection.scm`, `VisualizePointSets.scm`, `Schelog.scm`

</details>

<details>

<summary><strong>Version 1.5.2</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2020-12-26\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.5.2 (1200)](https://zenger.org/lisppad/resources/LispPad_1.5.2-1200.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed several editor-related bugs
* Fixed crash of virtual machine when execution gets aborted while loading and executing a file
* Minor bug fixes in LispKit libraries

_<mark style="color:green;">New features:</mark>_

* Complete revamp of user interface optimized for macOS Big Sur
* Introduced key equivalents for session and editor windows
* Rewrote line number display; allow selection of line ranges
* Introduced feature to automatically indent Scheme code
* Updated and extended documentation (accessible via "Help > LispPad Help" and "Help > LispPad Library Reference")
* Included new libraries: `(srfi 9)`, `(srfi 180)`, `(srfi 209)`, `(srfi 210)`
* Extended library `(lispkit log)` with syntax `log-time`
* Extended library `(lispkit debug)` with syntax `time-values`
* Extended library `(lispkit math)` with procedures `fxodd?`, `fxeven?`, `fx-width`, `fx-greatest`, and `fx-least` in library `(lispkit math)`.; generalized procedure `number->string`
* Included new documentation for library `(lispkit debug)`
* Included new sample code: `DrawTrees.scm`, `DisplayTrees.scm`, and `EditDistance.scm`

</details>

<details>

<summary><strong>Version 1.5.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2020-10-05\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.5.1 (1150)](https://zenger.org/lisppad/resources/LispPad_1.5.1-1150.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed comparison of complex numbers and numbers involving NaN in library `(lispkit test)`
* Fixed small bugs in `(lispkit match)` and included support for `=..`, `*..`, and `**1`

_<mark style="color:green;">New features:</mark>_

* Improved Scheme automatic indentation algorithm
* Redesigned Scheme definitions menu in editor windows
* Revision of library `(lispkit test)` involving procedures `test-group-failed-tests`, `test-group-passed-tests`, `failed-tests`, `passed-tests`, `current-test-epsilon`
* Refactored debugging functionality into library `(lispkit debug)`
* New libraries: `(srfi 194)`, `(srfi 204)`, `(lispkit sxml)`, `(lispkit sxml html)`, and `(lispkit sxml xml)`
* New documentation for libraries: `(lispkit iterate)`, `(lispkit comparator)`, `(lispkit match)`, `(lispkit csv)`, `(lispkit log)`, and `(lispkit test)`

</details>

<details>

<summary><strong>Version 1.5</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2020-07-01\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.5.0 (1100)](https://zenger.org/lisppad/resources/LispPad_1.5.0-1100.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Speed up output in console windows by 10x
* Save command history in session documents
* Add "\~/Documents/LispPad" as standard search path and search in external libraries and assets always first
* Fixed a few path creation functions in library `(lispkit system)` which failed for corner cases
* `define-values` can now be used wherever `define` can be used, fixing a long-standing bug
* Distinguish between empty response and failed request for HTTP requests in library `(lispkit port)`
* Fixed bugs in PDF library documentation and extended it to cover the new libraries

_<mark style="color:green;">New features:</mark>_

* Reorganized menus and shortcuts; improved "Help" menu
* Support for marking up identifiers for standard Scheme procedures and special-forms when syntax-highlighting is enabled
* Support for auto completions, including setting a custom delay both in console and editor windows
* New libraries: `(lisppad applescript)`, `(lispkit sqlite)`, `(lispkit combinator)`, `(lispkit system os)`, `(srfi 195)` and `(srfi 196)`
* New documentation for libraries: `(lispkit combinator)`, `(lispkit stream)`, `(lispkit iterate)`, `(lispkit stack)`, `(lispkit queue)`, and `(lispkit system os)`
* Renamed library `(lispkit iteration)` into `(lispkit iterate)`
* Extended library `(lispkit date-time)` with procedures `date-time-add`, `date-time-add-seconds`, `date-time-diff-seconds`, `date-time-in-timezone`, `date-time-same?`, `date-time=?`, `date-time<?`, `date-time>?`, `date-time<=?`, `date-time>=?`, and `date-time-hash`.
* Extended library `(lispkit core)` with procedures `thunk`, `thunk*`, and `apply-with-values`
* Extended library `(lispkit string)` with procedures `string-normalize-diacritics` and `string-normalize-separators`
* Extended library `(lispkit dynamic)` with procedures `unwind-protect` and `try`
* Extended library `(lispkit control)` with procedure `letrec-values`
* Extended library `(lispkit system)` with procedures `home-directory`, `system-directory`, `path-extension`, `append-path-extension`, `remove-path-extension`, `file-readable?`, `file-writeable?`, `file-deletable?`, `directory-readable?`, `directory-writeable?`, and `directory-deletable?`.
* Extended library `(lispkit draw)` with procedures `set-image-size!`, `bitmap-size`, `bitmap-pixels`, `bitmap-exif-data`, and `set-bitmap-exif-data!`
* Support for timeouts in procedures handling HTTP ports in library `(lispkit port)`
* Small tweaks to library `(lispkit csv)`
* Library `(lispkit box)` now supports multi-value boxes
* New sample code `Covid.scm`, `ComposePhotos.scm`, `CovidGraph.scm`, and `ScriptingMacOS.scm`

</details>

<details>

<summary><strong>Version 1.4.4</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2020-03-30\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.4.4 (1089)](https://zenger.org/lisppad/resources/LispPad_1.4.4-1089.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed serious memory leak in the compiler and implemented several garbage collector enhancements
* Made field access of records type safe

_<mark style="color:green;">New features:</mark>_

* Link documentation for SRFI libraries directly from the libraries info panel of session windows
* New example code: `RenderMarkdown.scm`, `Polynomials.scm`
* New libraries: `(srfi 6)`, `(srfi 54)`, `(srfi 162)`
* Extended library `(lispkit dynamic)` with assertion support: `make-assertion-error`, `assertion`, `assert`
* New documentation for libraries `(lispkit record)`, `(lispkit regexp)`, `(srfi 6)`, `(srfi 54)`, `(srfi 162)`
* Make LispPad Library Reference available in PDF form via the "Help" menu

</details>

<details>

<summary><strong>Version 1.4.3</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2020-01-24\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.4.3 (1081)](https://zenger.org/lisppad/resources/LispPad_1.4.3-1081.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed bug in library `(lispkit set)` which was leading to multi-set behavior
* Fixed garbage collection issue in library `(lispkit hashtable)`
* Fixed cosmetic issues in the line number viewer of the text editor

_<mark style="color:green;">New features:</mark>_

* Library documentation now directly accessible in the "Libraries" tab of session windows
* Support for document type-specific text completions
* Support logging of garbage collection runs
* New mechanism for providing/configuring assets such as images, documents, etc., enabling libraries to depend on data in an extensible fashion
* New example code: `SpellNumbers.scm`, `Sudoku.scm`; extension of `Math.scm`
* New libraries: `(lisppad speech)`, `(lispkit markdown)`, `(lispkit disjoint-set)`, `(srfi 175)`, `(srfi 167)`, `(srfi 98)`, `(srfi 87)`
* Extended library `(lispkit system)` with procedures `asset-file-path`, `path-components`, `parent-path`, `path`, and `source-directory`
* Extended library `(lispkit bytevector)` with procedures `read-binary-file` and `write-binary-file`
* Extended library `(lispkit string)` with procedures `write-file`, `read-file`, `string-pad-center`, `string-empty?`; `string-concatenate` now supports an optional separator character
* Extended library `(lispkit port)` with procedures `open-input-asset`, `open-binary-input-asset`, `call-with-output-bytevector`, and `call-with-output-string`
* Extended library `(lispkit hashtable)` with procedure `hashtable-empty-copy`; `hashtable-hash-function` can now return a hash function for all hashtables
* Extended library `(lispkit math)` with procedure `fxsqrt`
* Extended library `(lispkit core)` with procedure `opt`
* Extended library `(lispkit draw)` to support assets, color lists and drawing of HTML
* Added character set `char-set:newlines` to `(lispkit char-set)`
* New documentation for libraries `(lisppad speech)`, `(lispkit port)`, `(lispkit heap)`, `(lispkit markdown)`, `(lispkit disjoint-set)`, `(srfi 175)`, `(srfi 167)`, `(srfi 98)`, `(srfi 87)`

</details>

<details>

<summary><strong>Version 1.4.2</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2019-10-21\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.4.2 (1044)](https://zenger.org/lisppad/resources/LispPad_1.4.2-1044.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Replaced garbage collector with a more robust implementation
* Fixed several issues in library `(lispkit math)`: `integer->fx` renamed to `integer->fixnum`, introduced `fxlogical-shift-right` and `real->flonum`, fixed `bit-count`, fixed `fxmodulo` to work with negative numbers
* Fixed explanations for symbols containing "->"

_<mark style="color:green;">New features:</mark>_

* Simplified printed representation of procedures
* Provided a more complete set of hash functions via library `(lispkit hashtable)`
* New libraries: `(lispkit comparator)`, `(srfi 174)`, and `(srfi 177)`
* New documentation for libraries `(lispkit math)` and `(lispkit bytevector)`.

</details>

<details>

<summary><strong>Version 1.4.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2019-09-10\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.4.1 (1030)](https://zenger.org/lisppad/resources/LispPad_1.4.1-1030.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed handling of option-clicks to show documentation popovers
* Fixed memory leak involving recursive local functions
* Implemented algebraic datatypes in terms of more efficient internal functions

_<mark style="color:green;">New features:</mark>_

* Allow logging of input and output of sessions
* Support for uninterned symbols
* Support for custom keywords in `let-keywords`
* Extension and re-implementation of library `(lispkit type)`
* New libraries: `(lispkit stream)`, `(scheme mapping)`, `(srfi 146)`, `(srfi 165)`, `(srfi 173)`
* Inclusion of `miniAdapton` in a new third-party directory
* New example code for generating mazes
* Included documentation for `(lispkit control)`, `(srfi 173)`

</details>

<details>

<summary><strong>Version 1.4</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2019-08-21\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.4.0 (1004)](https://zenger.org/lisppad/resources/LispPad_1.4.0-1004.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Bug fixes in library `(lispkit gvector)`
* Fixed memory leak involving recursive local functions

_<mark style="color:green;">New features:</mark>_

* Significant performance improvements in the _LispKit_ interpreter
* Documentation popovers in session and editor windows (use menu item "View > Explain..." or option-click on symbol)
* Documentation viewer in environment sidebar of session windows
* New SRFI libraries: SRFI 26, SRFI 33, SRFI 46, SRFI 55, SRFI 146, and SRFI 165
* New libraries: `(scheme mapping)`, `(lispkit stream)`, `(lispkit graph)`
* Included documentation for SRFI 26, SRFI 33, SRFI 46, SRFI 55, SRFI 146, SRFI 161, SRFI 165, `(lispkit core)`, `(lispkit list)`, `(lispkit dynamic)`, `(lispkit char)`, `(lispkit char-set)`, and `(lispkit string)`

</details>

<details>

<summary><strong>Version 1.3.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2019-02-27\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.3.1 (950)](https://zenger.org/lisppad/resources/LispPad_1.3.1-950.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Complete re-write of library import and export logic fixing numerous bugs and incompatibilities with R7RS
* Improved reporting of errors in library definitions
* Fixed output of multi-value results in the session window
* Allow `@` as initial character in identifiers

_<mark style="color:green;">New features:</mark>_

* New libraries: `(lispkit csv)`, `(lispkit match)`, `(lispkit regexp)`, `(lispkit gvector)`, `(lispkit date-time)`
* Extended `(lispkit vector)` and `(lispkit list)` libraries
* Support for `let-keywords` and `let*-keywords` in library `(lispkit control)`
* Support call tracing for individual procedures
* Include call traces in the session log
* Make the last three session results available via `*1`, `*2`, and `*3`

</details>

<details>

<summary><strong>Version 1.3</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2019-01-04\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.3.0 (930)](https://zenger.org/lisppad/resources/LispPad_1.3.0-930.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Fixed font handling in session windows
* Bug fixes affecting `bytevector-copy!`, `fold-left`, `max`, `min`, `numerator`, `denominator`, `log`, `magnitude`, `gcd` and `lcm`, as well as the escaping of symbols
* Handle closing of ports correctly in library `(lispkit port)`
* Fixed major bug in library `(lispkit system)` affecting the composition of file paths
* Moved from `#\dx????` syntax to `#\x????` to represent character literals

_<mark style="color:green;">New features:</mark>_

* Session log (for making all log data available via one window)
* New libraries: `(lisppad log)`, `(lispkit log)`, `(lispkit char-set)`, `(scheme char)`
* Support for most Scheme libraries from R7RS large/Red edition: `(scheme box)`, `(scheme charset)`, `(scheme comparator)`, `(scheme generator)`, `(scheme hash-table)`, `(scheme ideque)`, `(scheme list)`, `(scheme rlist)`, `(scheme set)`, `(scheme sort)`, `(scheme stream)`, `(scheme text)`, `(scheme vector)`
* New SRFI libraries: SRFI 14 (full + ascii), SRFI 101, SRFI 125
* New functionality in library `(lispkit test)`:
  * Support for nested test groups
  * Approximate tests
  * Handling of exceptions
* More user-friendly error messages for operating system errors
* New example code showcasing LispPad's drawing library
* Extended Help menu

</details>

<details>

<summary><strong>Version 1.2.3</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2018-11-05\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.2.3 (920)](https://zenger.org/lisppad/resources/LispPad_1.2.3-920.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* The "LispPad Help" menu item still didn't work in version 1.2.2; this is fixed now

_<mark style="color:green;">New features:</mark>_

* Support jumping to a given line number and to the beginning and end of a text document
* Included implementation of "Tiny CLOS" as library `(lispkit clos)`
* New SRFI libraries: SRFI 23, SRFI 34, SRFI 39, SRFI 95
* Documentation for libraries `(lispkit set)` and `(lispkit enum)`

</details>

<details>

<summary><strong>Version 1.2.2</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2018-11-02\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.2.2 (907)](https://zenger.org/lisppad/resources/LispPad_1.2.2-907.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* The help book was missing in the last release; it's included again

</details>

<details>

<summary><strong>Version 1.2.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2018-10-30\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.2.1 (903)](https://zenger.org/lisppad/resources/LispPad_1.2.1-903.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Revised all hash functions; fixed several hashing-related bugs
* Bug fixes in library `(lispkit draw)`
* Renamed library `(lisppad app)` to `(lisppad system)`

_<mark style="color:green;">New features:</mark>_

* Support for dark mode
* Markdown syntax highlighting
* New preferences pane: colors customizable for syntax highlighting
* Extended library documentation in LispPad's help book
* New SRFI libraries: SRFI 11, SRFI 14, SRFI 16, SRFI 51, SRFI 161
* New libraries: `(lispkit draw turtle)`, `(lisppad turtle)`
* New functionality in library `(lispkit draw)`:
  * New drawing functions
  * Comprehensive font API
  * Support for multi-page PDF files

</details>

<details>

<summary><strong>Version 1.2</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2018-08-21\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.2.0 (850)](https://zenger.org/lisppad/resources/LispPad_1.2.0-850.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* There is now a HelpBook available within LispPad
* Printing of all documents now works correctly
* Bugs in SRFI 69 are fixed
* Continuations are now correctly tagged and `continuation?` works as documented
* Multiple libraries can now be imported with one `import` invocation, as required by R7RS
* `current-input-port`, `current-output-port`, and `current-error-port` have been turned into parameter objects, as required by R7RS
* `(lispkit test)` was extended to be more compatible with similar libraries

_<mark style="color:green;">New features:</mark>_

* The menu showing currently opened windows now groups the windows by type
* LispPad is now able to create, open and edit `.txt` and `.md` text documents
* The new [`(lispkit draw)`](https://github.com/objecthub/lisppad-site/blob/gitbook/docs/libs/lispkit-draw.html) library provides a powerful API for creating drawings and saving them as PDF documents or image files
* The new [`(lisppad app)`](https://github.com/objecthub/lisppad-site/blob/gitbook/docs/libs/lispkit-draw.html) library allows users to script LispPad directly using Scheme
* LispPad now supports graphics windows to display drawings created with [`(lispkit draw)`](https://github.com/objecthub/lisppad-site/blob/gitbook/docs/libs/lispkit-draw.html)
* New SRFI libraries: SRFI 111, SRFI 112, SRFI 113
* New example code showcases the new drawing and scripting features

</details>

<details>

<summary><strong>Version 1.1.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2018-06-19\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.1.1 (755)](https://zenger.org/lisppad/resources/LispPad_1.1.1-755.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Prelude and libraries path preferences are now handled correctly and do not result in access issues anymore
* Programs blocking on functions like `read` can now be terminated
* Minor bugs in bitwise operations for exact integers of arbitrary size fixed
* `string-split` now returns a list instead of a vector

_<mark style="color:green;">New features:</mark>_

* Allow setting a default home directory outside of the application's sandbox (in preferences)
* Complete rewrite of the error reporting subsystem, including support for `file-error?` and `read-error?`
* New library: `(lispkit test)`
* New SRFI libraries: SRFI 69, SRFI 129, SRFI 137, SRFI 145, SRFI 151
* New example code for coroutines, HTTP support, and a small compiler for arithmetic expressions

</details>

<details>

<summary><strong>Version 1.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2018-02-08\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.1.0 (700)](https://zenger.org/lisppad/resources/LispPad_1.1.0-700.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Support tail patterns in `syntax-rules` and fix various `syntax-rules`-related bugs
* Fixed major bug in macro expansion logic
* Fixed major bug preventing internal definitions to work in many cases

_<mark style="color:green;">New features:</mark>_

* Complete refactoring of the default libraries to match the R7RS specification
* New libraries: `(lispkit json)`, `(lispkit wt-tree)`, `(lispkit object)`, `(lispkit stack)`, `(lispkit queue)`, `(lispkit logic)`
* New SRFI libraries: SRFI 63, SRFI 64, SRFI 158
* Support for `features` and `cond-expand`
* Support `include` and `include-library-definitions` in library definitions
* Implement missing R7RS functionality: `define-values`, `syntax-error`, `scheme-report-environment` and `null-environment`.
* Added SRFI 112-style support for human-readable information about the hardware and operating system on which LispPad is running
* Simple API for HTTP GET requests
* Simple native API for date/time functions
* Bitwise operations for exact integers of arbitrary size
* Extension of hashtable API
* Extension of bytevector API
* Extension of list API
* New lightweight type abstraction mechanism
* Support call tracing (as a simple debugging mechanism)
* Name new session windows differently than new editor windows

</details>

<details>

<summary><strong>Version 1.0.2</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2017-09-18\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.0.2 (640)](https://zenger.org/lisppad/resources/LispPad_1.0.2-640.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Garbage collection now does not accidentally collect anymore parts of parameter objects
* Record type creation now working also for records with fields that are not set by the constructor
* More syntax-rules bug fixes

_<mark style="color:green;">New features:</mark>_

* Support for algebraic datatypes
* Added a few additional destructive string functions
* Added pretty printer via library (lispkit prettify)
* New library for implementing priority queues: (lispkit heap)
* New library for creating PDF files: (lispkit pdf)
* Support for SRFI 152
* New example code

</details>

<details>

<summary><strong>Version 1.0.1</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2017-08-14\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.0.1 (620)](https://zenger.org/lisppad/resources/LispPad_1.0.1-620.zip)

_<mark style="color:green;">Bug fixes:</mark>_

* Files can now be opened via the Finder
* Several issues with macros have been resolved in the Scheme interpreter
* Several issues with String functions have been fixed in the Scheme interpreter

_<mark style="color:green;">New features:</mark>_

* Added new Open Internally… menu item to access example source code and the source code of internal libraries
* Support R6RS-style enumerations
* Support for SRFI 31
* Support for SRFI 35
* Support for SRFI 135

</details>

<details>

<summary><strong>Version 1.0</strong></summary>

_<mark style="color:green;">Date:</mark>_ 2017-07-17\
_<mark style="color:green;">Download:</mark>_ [LispPad 1.0.0 (600)](https://zenger.org/lisppad/resources/LispPad_1.0-600.zip)

_<mark style="color:green;">New features:</mark>_

* First published version

</details>
