---
description: A selection of illustrated LispKit example programs
---

# LispKit

LispKit comes with a collection of example programs in its `Examples` folder. The pages in this section present some of them as _illustrated examples_. Each page describes what the program does, shows how to run it, explains the ideas behind it, and walks through the complete source code, piece by piece. The results shown on the pages come from running the programs. At the end, every page suggests variations to try and points to the documentation of the libraries involved.

## Overview

| Example | What it shows | Main libraries |
| ------- | ------------- | -------------- |
| [AVL Trees](avltrees.md) | A library of purely functional, self-balancing search trees, defined inside the program itself. An algebraic datatype, pattern matching, and four kinds of rotations keep the trees balanced. | `(lispkit datatype)`, `(lispkit base)` |
| [Channels](channels.md) | Ten short programs for threads that communicate through channels: synchronous and buffered channels, `select`, timeouts, tickers, worker pools, and rate limiting. Adapted from _Go by Example_. | `(lispkit thread)`, `(lispkit thread channel)` |
| [Coroutines](coroutines.md) | Cooperative threads built from first-class continuations in about 30 lines of Scheme: `spawn`, `yield`, `quit`, and a round-robin scheduler. After an article by Matt Might. | `(lispkit base)`, `(srfi 31)` |
| [Image Composition](imagecomposition.md) | Finds the display of a billboard in a photo and projects another photo onto it, using perspective correction and image filters. | `(lispkit vision)`, `(lispkit image)`, `(lispkit image process)` |
| [JSON](json.md) | A guided tour through creating, querying, changing, merging, writing, and validating JSON values, including JSON Path, JSON Patch, CBOR, and JSON Schema. | `(lispkit json)`, `(lispkit json schema)` |
| [Markdown TOC](markdowntoc.md) | Inserts a table of contents into a Markdown document: pattern matching on the syntax tree extracts the headings, builds a nested list of links, and demotes the headings. The result is written as Markdown source and saved as PDF and RTFD documents. | `(lispkit markdown)`, `(lispkit datatype)` |
| [Maze](maze.md) | A small framework for mazes: two generation algorithms, a solver, and output on the terminal and in PDF files. Defines a library of its own. | `(lispkit draw)` |
| [Movies](movies.md) | Collects movies from the web API of _The Movie Database_, merges the results of several overlapping queries into a local SQLite database, and reports statistics. Credentials come from environment variables or the system keychain. | `(lispkit http)`, `(lispkit sqlite)`, `(lispkit system keychain)` |
| [OCR](ocr.md) | Straightens the photo of a printed page, recognizes its text, and saves PDF files in which the recognized lines are marked up as drawings and as annotations. | `(lispkit vision)`, `(lispkit image)`, `(lispkit pdf)` |
| [Polynomials](polynomials.md) | A small computer algebra program that turns polynomial expressions into canonical form. Ported from Peter Norvig's book on artificial intelligence programming. | `(lispkit base)` |
| [Turtle](turtle.md) | Three fractal curves, a fern, the C-curve, and the dragon curve, drawn with turtle graphics and saved as a multi-page PDF file. | `(lispkit draw)`, `(lispkit draw turtle)` |
| [Webserver](webserver.md) | A multi-threaded web server with routing, middleware, forms, file sharing, and HTML written as Scheme data. | `(lispkit http server)` |

## Find an example by topic

* **Concurrency:** [Channels](channels.md) shows how threads cooperate by exchanging messages, and [Coroutines](coroutines.md) builds a scheduler for cooperative threads from continuations. The [Webserver](webserver.md) runs its request handlers on threads.
* **Graphics and PDF files:** [Turtle](turtle.md) and [Maze](maze.md) create vector drawings and save them as PDF files. [OCR](ocr.md) creates PDF files with annotations. [Markdown TOC](markdowntoc.md) saves a Markdown document as a PDF file, with its diagram and formulas typeset.
* **Images and computer vision:** [Image Composition](imagecomposition.md) and [OCR](ocr.md) detect rectangles and text with Apple's _Vision_ framework and process images with _Core Image_. They run on macOS and iOS only.
* **Data formats and databases:** [JSON](json.md) covers JSON, JSON Path, JSON Patch, CBOR, and JSON Schema. [Markdown TOC](markdowntoc.md) turns Markdown into a syntax tree, transforms it, and writes it back as Markdown. [Movies](movies.md) keeps data in a SQLite database and merges data from several sources with transactions and upserts.
* **Networking:** The [Webserver](webserver.md) serves HTML pages, forms, and file downloads over HTTP. It requires LispKit 2.6.3 or later. [Movies](movies.md) is the client side: it sends authenticated requests to a web API, several at a time, and keeps the credentials in the system keychain.
* **Data structures and algorithms:** [AVL Trees](avltrees.md) implements a self-balancing search tree as an abstract data type. [Maze](maze.md) generates and solves mazes.
* **Symbolic computation:** [Polynomials](polynomials.md) represents and simplifies algebraic expressions.
* **Language features:** [Coroutines](coroutines.md) uses continuations, [AVL Trees](avltrees.md) and [Maze](maze.md) define their own libraries, [AVL Trees](avltrees.md) and [Markdown TOC](markdowntoc.md) take apart and build trees with pattern matching, and [Polynomials](polynomials.md) uses `define-type`.
