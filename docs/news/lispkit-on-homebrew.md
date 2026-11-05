---
sidebar_position: 30
date: 2025-12-26
---

# LispKit on Homebrew

For use cases on macOS requiring a terminal, it is now much easier to install the read-eval-print loop of [LispKit](https://github.com/objecthub/swift-lispkit) via the popular package manager [Homebrew](https://brew.sh/). Once Homebrew has been set up, simply enter the following command:

```
brew install lispkit
```

This installs LispKit and makes the read-eval-print loop (REPL) of LispKit available as the `lispkit` command:

```
[~] lispkit -x
LispKit Scheme 2.6.0 (2025-12-22 00:51)
Copyright © 2016–2025 Matthias Zenger. All rights reserved.
[enabled run loop]
>
```

Over the last two years, many LispPad-only libraries have been made available directly in LispKit, e.g. [`(lisppad draw map)`](../libraries/lisppad/draw-map.md), [`(lisppad location)`](../libraries/lisppad/location.md) , often only with minimal API changes. For using libraries that are based on asynchronous APIs, it is important to specify the `-x` parameter when invoking `lispkit` , otherwise execution may stall indefinitely. `-x` sets up a macOS run loop to enable the usage of asynchronous APIs.
