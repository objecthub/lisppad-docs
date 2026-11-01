---
sidebar_position: 40
description: 'Monday, December 22, 2025'
---

# LispKit 2.6

After more than one year of work, [LispKit 2.6.0](https://github.com/objecthub/swift-lispkit/releases/tag/2.6.0) was released. This release focuses on bug fixes, extensions of existing libraries, and a number of new libraries making macOS and iOS APIs available to LispKit programs.

### New Libraries

:classical\_building: **`(lispkit image)`**: This library provides a comprehensive interface to Apple's _Core Image_ framework for advanced image processing operations. The library supports creating image processing pipelines using abstract images, applying various filters, and performing coordinate transformations.

:classical\_building: **`(lispkit image process)`**: Library `(lispkit image process)` defines a high-level API for all the image filters provided by the _Core Image_ framework of iOS and macOS. As opposed to the generic, imperative interface as implemented by library `(lispkit image)`, the API of `(lispkit image process)` is functional: The main building blocks are _image processors_ which transform _abstract images_. Since _image processors_ are simply functions, they can be composed easily with existing functional composition operators, e.g. as provided by library `(lispkit combinator)`.

:classical\_building: **`(lispkit vision)`**: Library `(lispkit vision)` provides computer vision capabilities through Apple's _Vision_ framework. The library supports optical character recognition (OCR), shape detection, barcode recognition, and image classification. All vision operations return `future` objects that execute asynchronously.

:classical\_building: **`(lispkit pdf)`**: Library `(lispkit pdf)` provides an API for manipulating and analyzing PDF documents. The library supports creating PDF documents, managing pages, adding annotations, handling bookmarks, managing outlines, extracting content, and rendering pages.

:classical\_building: **`(lispkit draw web)`**: Library `(lispkit draw web)` provides web page snapshotting capabilities through a _WebKit_-based web client. The library enables capturing images and generating PDFs from HTML content, local files, data streams, and remote URLs with configurable viewport settings and cropping options.

### Local REPL Installation

As of version 2.6.0, LispKit now supports a simple way to build and install the read-eval-print loop and the required resource tree. Simply [clone the repository from GitHub](https://github.com/objecthub/swift-lispkit) or [download a distribution](https://github.com/objecthub/swift-lispkit/archive/refs/tags/2.6.0.tar.gz) and type:

```
make install
```

This will build a release version of the REPL and install it under `/user/local`. By changing the `PREFIX` variable, it is possible to install the REPL anywhere. Here is an example:

```
make install PREFIX=/tmp/lispkit-test
```

Now the interpreter can be invoked like this:

```
/tmp/lispkit-test/bin/lispkit
```

The distribution can be uninstalled in the following way:

```
make uninstall PREFIX=/tmp/lispkit-test
```

### Release Notes

Here are the detailed [release notes for LispKit 2.6.0](https://github.com/objecthub/swift-lispkit/releases/tag/2.6.0):

:::info

* Documentation for libraries is now included in this repository
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
* Fixes `quasiquote` for expressions involving array literals
* Fixes the `(library ...)` directive of `cond-expand`
* Fixes classes in library `(lispkit object)`; generic procedure `object->string` was renamed to `object-description`
* New sample code: `ImageComposition.scm`, `OCR.scm`, `MermaidDiagrams.scm`, `Pinterest.scm`

:::
