---
sidebar_position: 30
description: Programming language supported by LispPad
---

# Language

### Features

LispPad is an IDE for the programming language Scheme. The Scheme dialect supported by LispPad is based on the [R7RS (small) standard](http://www.r7rs.org). The following features are available:

* Modules via [R7RS](http://www.r7rs.org) libraries
* Hygienic macros based on the _syntax-rules_ standard
* First-class environments
* `call/cc`, `dynamic-wind` and exceptions
* Dynamically-scoped paramaters
* Multiple return values
* Delayed execution via promises and streams
* Support for the full numerical tower consisting of arbitrary size integers, rationals, real numbers, and inexact complex numbers.
* Unicode strings and characters
* Vectors and bytevectors
* Text and binary ports
* [R7RS](http://www.r7rs.org)-compliant records
* [R6RS](http://www.r6rs.org)-compliant hashtables
* [R6RS](http://www.r6rs.org)-compliant enumerations
* SRFI 18-compliant multi-threading

### Incompatibilities

_LispPad_ is incompatible or incomplete with respect to the following [R7RS](http://www.r7rs.org) features:

* Lists are immutable. Mutable cons-cells are supported in a way similar to [Racket](https://racket-lang.org).
* Datum comments introduced via `#;` do not always work as expected.

### Included libraries

_LispPad_ supports all standard R7RS (small) libraries:

* `(scheme base)`
* `(scheme case-lambda)`
* `(scheme char)`
* `(scheme complex)`
* `(scheme cxr)`,
* `(scheme eval)`
* `(scheme file)`
* `(scheme inexact)`
* `(scheme lazy)`
* `(scheme load)`
* `(scheme process-context)`
* `(scheme read)`
* `(scheme repl)`
* `(scheme time)`
* `(scheme write)`
* `(scheme r5rs)`

Most of the R7RS (large) libraries from the "Red" and "Tangerine" edition are supported as well:

* `(scheme bitwise)`
* `(scheme box)`
* `(scheme charset)`
* `(scheme comparator)`
* `(scheme division)`
* `(scheme fixnum)`
* `(scheme flonum)`
* `(scheme generator)`
* `(scheme hash-table)`
* `(scheme ideque)`
* `(scheme list)`
* `(scheme mapping)`
* `(scheme rlist)`
* `(scheme set)`
* `(scheme sort)`
* `(scheme stream)`
* `(scheme text)`
* `(scheme vector)`

_LispPad_ also includes all the [_LispKit_ libraries](../libraries/lispkit/).

_LispPad_ comes with several [_LispPad_-specific libraries](../libraries/lisppad/). They provide a native integration of drawings defined via `(lispkit draw)` and `(lispkit draw turtle)`, a means to script the application, an API to do geocoding, speech synthesis, etc. There is also a _LispPad_-specific logging library extending the _LispKit_ logging library for usage within the IDE.

LispPad also includes many [SRFI (Scheme Request for Implementation) libraries](../libraries/srfi.md).

### Source code

The source code of the Scheme interpreter and the included libraries has been open-sourced and [published at GitHub](https://github.com/objecthub/swift-lispkit). Example code and the Scheme sources of the included libraries can be found [here](https://github.com/objecthub/swift-lispkit/tree/master/Sources/LispKit/Resources).

It is also possible to access the source code from within LispPad. On macOS, pressing _option_ while opening the _File_ menu will reveal a menu item "Open LispKit…" which provides access to the LispKit source code bundled with LispPad. Similarly, pressing _control_ while opening the _File_ menu will reveal a menu item "Open LispPad..." for accessing the LispPad-specific code, e.g like the LispPad prelude.
