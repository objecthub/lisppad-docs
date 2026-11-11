---
sidebar_position: 30
description: Programming language supported by LispPad
---

# Language

## Language features

_LispPad_ is an application for developing and running Scheme code. The programming language supported
by _LispPad_ is called _LispKit_. _LispKit_ implements the following features, many of which are based on
[R7RS (small)](http://r7rs.org):

- Modules based on R7RS libraries
- Hygienic macros based on `syntax-rules`
- First-class environments
- `call/cc`, `dynamic-wind` and exceptions
- Dynamically-scoped parameters
- Multiple return values
- Delayed execution via promises and streams
- Support for the full numerical tower consisting of arbitrary size integers, rationals, real numbers, and inexact complex numbers.
- Unicode strings and characters
- Vectors and bytevectors
- Text and binary ports
- R7RS-compliant records
- [R6RS](http://www.r6rs.org)-compliant hashtables
- [R6RS](http://www.r6rs.org)-compliant enumerations
- SRFI 18-compliant multi-threading
- All R7RS (small) libraries: `(scheme base)`, `(scheme case-lambda)`, `(scheme char)`, `(scheme complex)`,
  `(scheme cxr)`, `(scheme eval)`, `(scheme file)`, `(scheme inexact)`, `(scheme lazy)`,
  `(scheme load)`, `(scheme process-context)`, `(scheme read)`, `(scheme repl)`, `(scheme time)`,
  `(scheme write)`, `(scheme r5rs)`
- Some R7RS (large) libraries from Scheme Red and Scheme Tangerine editions:
  `(scheme bitwise)`, `(scheme box)`,  `(scheme charset)`, `(scheme comparator)`, `(scheme division)`,
  `(scheme fixnum)`, `(scheme flonum)`, `(scheme generator)`, `(scheme hash-table)`,
  `(scheme ideque)`, `(scheme list)`, `(scheme mapping)`, `(scheme red)`, `(scheme rlist)`,
  `(scheme set)`, `(scheme sort)`, `(scheme stream)`, `(scheme text)`, `(scheme vector)`
- LispKit-specific libraries:
  `(lispkit archive tar)`,
  `(lispkit archive zip)`,
  `(lispkit base)`,
  `(lispkit bitset)`,
  `(lispkit box)`,
  `(lispkit bytevector)`,
  `(lispkit char-set)`,
  `(lispkit char)`,
  `(lispkit clos)`,
  `(lispkit combinator)`,
  `(lispkit comparator)`,
  `(lispkit control)`,
  `(lispkit core)`,
  `(lispkit crypto)`,
  `(lispkit csv)`,
  `(lispkit datatype)`,
  `(lispkit date-time)`,
  `(lispkit debug)`,
  `(lispkit disjoint-set)`,
  `(lispkit draw)`,
  `(lispkit draw barcode)`,
  `(lispkit draw chart)`,
  `(lispkit draw chart bar)`,
  `(lispkit draw chart function)`,
  `(lispkit draw map)`,
  `(lispkit draw turtle)`,
  `(lispkit draw web)`,
  `(lispkit dynamic)`,
  `(lispkit enum)`,
  `(lispkit format)`,
  `(lispkit graph)`,
  `(lispkit gvector)`,
  `(lispkit hashtable)`,
  `(lispkit heap)`,
  `(lispkit http)`,
  `(lispkit http oauth)`,
  `(lispkit http server)`,
  `(lispkit image)`,
  `(lispkit image process)`,
  `(lispkit iterate)`,
  `(lispkit json)`,
  `(lispkit json schema)`,
  `(lispkit list)`,
  `(lispkit list set)`,
  `(lispkit location)`,
  `(lispkit log)`,
  `(lispkit logic)`,
  `(lispkit markdown)`,
  `(lispkit match)`,
  `(lispkit math)`,
  `(lispkit math matrix)`,
  `(lispkit math stats)`,
  `(lispkit math util)`,
  `(lispkit object)`,
  `(lispkit pdf)`,
  `(lispkit port)`,
  `(lispkit prettify)`,
  `(lispkit prolog)`,
  `(lispkit queue)`,
  `(lispkit record)`,
  `(lispkit regexp)`,
  `(lispkit serialize)`,
  `(lispkit set)`,
  `(lispkit sqlite)`,
  `(lispkit stack)`,
  `(lispkit stream)`,
  `(lispkit string)`,
  `(lispkit styled-text)`,
  `(lispkit sxml)`,
  `(lispkit sxml html)`,
  `(lispkit sxml xml)`,
  `(lispkit system)`,
  `(lispkit system call)`,
  `(lispkit system keychain)`,
  `(lispkit system pasteboard)`,
  `(lispkit test)`,
  `(lispkit text-table)`,
  `(lispkit thread)`,
  `(lispkit thread channel)`,
  `(lispkit thread future)`,
  `(lispkit thread shared-queue)`,
  `(lispkit type)`,
  `(lispkit url)`,
  `(lispkit vector)`,
  `(lispkit vision)`, and
  `(lispkit wt-tree)`.
- LispPad-specific libraries:
  `(lisppad applescript)`,
  `(lisppad applet)`,
  `(lisppad audio)`,
  `(lisppad log)`,
  `(lisppad speech)`,
  `(lisppad system macos)`, and
  `(lisppad turtle)`.

The libraries are documented in the [Libraries](libraries.md) section: the [LispKit libraries](../libraries/lispkit/README.mdx), the [LispPad-specific libraries](../libraries/lisppad/README.mdx), and the [SRFI libraries](../libraries/srfi.md).

## Language limitations

The language support by _LispPad_ is incompatible or incomplete with respect to the following R7RS features:

- Lists are immutable. Mutable cons-cells are supported in a way similar to
[Racket](https://racket-lang.org)
- Literals in `syntax-rules` are not matched based on their definition but their symbol identity

## Source code

The source code of the Scheme interpreter and the included libraries has been open-sourced and [published at GitHub](https://github.com/objecthub/swift-lispkit). Example code and the Scheme sources of the included libraries can be found [here](https://github.com/objecthub/swift-lispkit/tree/master/Sources/LispKit/Resources).

It is also possible to access the source code from within LispPad. On macOS, pressing _option_ while opening the _File_ menu will reveal a menu item "Open LispKit…" which provides access to the LispKit source code bundled with LispPad. Similarly, pressing _control_ while opening the _File_ menu will reveal a menu item "Open LispPad..." for accessing the LispPad-specific code, e.g like the LispPad prelude.
