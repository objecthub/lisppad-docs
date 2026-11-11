---
sidebar_position: 70
sidebar_label: Getting started
description: Getting started with programming in Scheme.
---

# Getting started with Scheme

## What is Scheme?

Scheme is a statically scoped, weakly typed programming language which got invented in 1975 by Guy L. Steele
and Gerald J. Sussman. Scheme is a dialect of the programming language Lisp. LispPad implements the latest
Scheme standard, called [R7RS (small)](http://r7rs.org), and includes a range of additional libraries.

## Trying out Scheme in LispPad

The quickest way to get to know Scheme is to try it out in a [session](sessions.md). Create one via "File > New Session",
enter an expression after the prompt, and press Return. For instance, the following definitions and expressions
compute the sum of all integers within a range:

```scheme
▶ (define (sum from to)
    (if (<= from to)
        (+ from (sum (+ from 1) to))
        0))
sum
▶ (sum 2 10)
54
```

Programs that are longer than a few lines are better written in an [editor window](editor.md) and run from there with the Run button.
LispPad comes with a collection of example programs; "Help > Example Code > LispPad..." lets you choose one of them. Documentation for the identifiers
that were used can be looked up with "Help > Show Quick Help..." (⌘D), or by browsing the [Library Documentation](library-documentation.md).

## Specification

The Revised⁷ Report on the Algorithmic Language Scheme (R7RS), authored by Alex Shinn, John Cowan,
and Arthur Gleckler is available in [PDF format](https://small.r7rs.org/attachment/r7rs.pdf).

## Learning Scheme

[The Scheme Programming Language](https://www.scheme.com/tspl4/) by Kent Dybvig provides a well-written,
comprehensive introduction into Scheme. The book is based on the [R6RS](http://www.r6rs.org) standard, so it is not
fully compatible with the language implemented by LispPad. Nevertheless, it is a great text book covering all
aspects of Scheme.

[Structure and Interpretation of Computer Programs](https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-4.html#%_toc_start)
by Harold Abelson and Gerald Jay Sussman is an intriguing introduction into programming with Scheme.
This classic text book is revolutionary in many ways, covering literally all aspects of programming at great depth.
It should be read by all Scheme programmers.

Another classical text book introducing programming in Scheme is
[Scheme and the Art of Programming](https://www.cs.unm.edu/~williams/cs357/springer-friedman.pdf) by
George Springer and Daniel P. Friedman.
