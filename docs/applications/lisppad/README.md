---
description: Introduction to LispPad and description of its features.
---

# Using LispPad

## What is LispPad?

LispPad is a simple, lightweight, integrated development environment for
developing and running Scheme code on macOS. The [language supported by LispPad](../language.md)
is based on the [R7RS (small) standard for Scheme](http://r7rs.org). LispPad provides the following components:

- A fully integrated Scheme interpreter (based on the [LispKit engine](https://github.com/objecthub/swift-lispkit))
- _Sessions_ with a console and a read-eval-print loop. Drawings and images that are produced by Scheme code show up right in the console. Inspectors next to the console give insight into the state of the interpreter.
- A text editor supporting syntax highlighting, smart indentation, parenthesis matching, code completion, quick help, page guides, etc.
- A Markdown editor with a live preview, supporting tables, code blocks, diagrams, and mathematical formulas
- A large set of [natively supported Scheme libraries](../language.md), documented in the [Library Documentation](library-documentation.md) window
- Support for light and dark appearance
- A comprehensive Shortcuts integration which supports running LispPad programs independently of the LispPad IDE (see library `(lisppad applet)`)

[LispPad Go](https://apps.apple.com/us/app/lisppad-go/id1565747728) is a companion app for iOS which
syncs code with LispPad via iCloud. LispPad Go matches LispPad's features. It can be used
to develop Scheme code on the go and can be executed both on iOS as well as macOS, if run on
a Mac computer with an _Apple Silicon_ processor.

## A first look

Working with LispPad typically involves two kinds of windows: _session windows_ for running code
and _editor windows_ for writing it. This is a session window in which a program was loaded and a
few expressions were evaluated:

<figure><img src="/img/session-window.png" alt="A LispPad session window" loading="lazy"></figure>

To try out LispPad, choose "File > New Session", enter an expression after the prompt, and press Return:
LispPad evaluates the expression and prints its result. The following pages explain how to
work with sessions, how to edit and run programs, and how to look up the documentation of the
libraries that come with LispPad.

## Contents

1. [Sessions](sessions.md)
2. [Editing code](editor.md)
3. [Markdown and text documents](markdown.md)
4. [Library documentation](library-documentation.md)
5. [Customizing preferences](preferences.md)
6. [Menu overview](menus.md)
7. [Getting started with Scheme](getting-started.md)
8. [Language](../language.md)
9. [Release notes](../../releases/lisppad.md)
