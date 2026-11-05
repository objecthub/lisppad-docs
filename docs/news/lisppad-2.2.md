---
sidebar_position: 20
date: 2026-02-01
---

# LispPad 2.2

A new version of **LispPad** was just released for macOS. You can either download it [here](https://zenger.org/lisppad/assets/LispPad_2.2-1744.zip) or get it from Apple's [App Store](https://apps.apple.com/de/app/lisppad/id1258939760?l=en\&mt=12). It comes with an updated version of the [LispPad Reference Manual](https://zenger.org/lisppad/assets/LispPad_Reference_2.2.pdf). The release notes are listed below.

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



