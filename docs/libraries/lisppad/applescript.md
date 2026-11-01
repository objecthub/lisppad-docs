---
sidebar_position: 20
---

# (lisppad applescript)

Library `(lisppad applescript)` exports procedures for invoking _Automator workflows_ and _AppleScript_ scripts and subroutines from Scheme code. Since LispPad runs in a sandbox and scripts and subroutines are executed outside of the sandbox, this will enable direct integrations with other macOS applications supporting AppleScript or Automator such as Mail, Safari, Music, etc.

## Script authorization

The script authorization mechanism of macOS is unfortunately a bit cumbersome, requiring the installation of the _Automator_ and _AppleScript_ files in a particular directory specifically for LispPad. `(system-directory 'application-scripts)` returns a list of directories in which scripts are accessible by LispPad. This includes typically the directory:

```
/Users/username/Library/Application Scripts/net.objecthub.LispPad
```

This directory can be opened on macOS's Finder via:

```scheme
(open-file (car (system-directory 'application-scripts)))
```

Scripts need to be copied to this directory.

## Script integration

As an example, the following script defines two AppleScript subroutines `safariFrontURL` and `setSafariFrontURL`. The AppleScript code also displays an error if the script is run overall as its only role is to make subroutines accessible to LispPad. Such scripts are written using Apple's _Script Editor_ application and need to be stored in a directory accesible by LispPad as explained above.

```applescript
on safariFrontURL()
  tell application "Safari" to return URL of front document
end safariFrontURL

on setSafariFrontURL(newUrl)
  tell application "Safari" to set URL of front document to newUrl
end setSafariFrontURL

on run
  display alert "Do not run this script. It provides AppleScript sub-routines to LispPad."
end run
```

Assuming that the script was saved in a file at path:

```
/Users/username/Library/Application Scripts/net.objecthub.LispPad/AccessSafari.scpt
```

it is now possible to load the script via procedure `applescript` into an _AppleScript_ object from which the various subroutines can be accessed:

```scheme
(import (lisppad applescript))
(define script (applescript "AccessSafari.scpt"))
```

It is possible to run the whole script via procedure `execute-applescript`:

```scheme
(execute-applescript script)
```

The execution of scripts is always synchronous, so the procedure call to `execute-applescript` terminates only when the execution of the script terminates. When executed, the script above will always display an alert since it was not made to be executed.

It is not possible to pass parameters via `execute-applescript` or receive results. This can be achieved by calling subroutines with procedure `apply-applescript-proc`. The following code will invoke subroutine `safariFrontURL` from the script above and return the URL of the current frontmost Safari window:

```scheme
(apply-applescript-proc script "safariFrontURL" '())
```

The third argument of procedure `apply-applescript-proc` is a list of parameters for the subroutine. The following code will set the URL of the frontmost Safari window to "http://lisppad.objecthub.net".

```scheme
(apply-applescript-proc script "setSafariFrontURL" '("http://lisppad.objecthub.net"))
```

Library `(lisppad applescript)` provides a means to quickly create Scheme functions matching AppleScript subroutines. This is shown in the following code:

```scheme
(define safari-front-url (applescript-proc script "safariFrontURL"))
(define set-safari-front-url! (applescript-proc script "setSafariFrontURL"))
(display (safari-front-url))
(newline)
(set-safari-front-url! "http://lisppad.objecthub.net")
```

## Marshaling data

This is how library `(lisppad applescript)` is marshaling/unmarshaling data when data is exchanged between Scheme and AppleScript:

<table><thead><tr><th width="374">Scheme type</th><th width="374">AppleScript type</th></tr></thead><tbody><tr><td>void</td><td>null</td></tr><tr><td>boolean</td><td>boolean</td></tr><tr><td>fixnum</td><td>int32</td></tr><tr><td>flonum</td><td>double</td></tr><tr><td>proper list</td><td>list</td></tr><tr><td>string</td><td>unicode text</td></tr><tr><td>date-time</td><td>date</td></tr></tbody></table>

If other data is attempted to be exchanged, it might lead to failure.

## API

**(applescript?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is an AppleScript object, `#f` otherwise.

**(applescript&#x20;**_**path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Loads and compiles the AppleScript file at _path_ returning an AppleScript object that can be used to execute the script or subroutines defined by the script.

**(applescript-path&#x20;**_**script**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the file path from which the AppleScript object _script_ was created.

**(execute-applescript&#x20;**_**script**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Executes the given AppleScript script. The execution is synchronous and `execute-applescript` will only return once _script_ has been executed.

**(apply-applescript-proc&#x20;**_**script name args**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Invokes the subroutine _name_ defined by AppleScript _script_ with the arguments _args_. _name_ is a string, _script_ is an AppleScript object, and _args_ is a list of arguments passed on to the subroutine. `apply-applescript-proc` returns the result returned by the subroutine, i.e. the execution of the subroutine is synchronous.

**(applescript-proc&#x20;**_**script name**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a Scheme procedure for subroutine _name_ defined in AppleScript _script_. _name_ is a string and _script_ is an AppleScript object. `applescript-proc` is defined in the following way:

```scheme
(define (applescript-proc script name)
  (lambda args
    (apply apply-applescript-proc script name args)))
```
