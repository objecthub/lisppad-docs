---
sidebar_position: 730
---

# (lispkit test)

Library `(lispkit test)` provides an API for writing uni tests. The API is largely compatible to similar APIs that are bundled with popular Scheme interpreters and compilers.

## Test groups

Tests are bundled in _test groups_. A test group contains actual _tests_ comparing acual with expected values and _nested test groups_. Test groups may be given a _name_ which is used for reporting on the testing progress and displaying aggregate test results for each test group.

The following code snippet illustrates how test groups are typically structured:

```scheme
(test-begin "Test group example")
(test "Sum of first 10 integers" 45 (apply + (iota 10)))
(test 64 (gcd 1024 192))
(test-approx 1.414 (sqrt 2.0))
(test-end)
```

This code creates a test group with name `Test group example`. The test group defines three tests, one verifying the result of `(apply + (iota 10))`, one testing `gcd` and one testing `sqrt`. When executed, the following output is shown:

```
╒═══════════════════════════════════════════════════════════════
│ Basic unit tests
└───────────────────────────────────────────────────────────────
[PASS] Sum of first 10 integers
[PASS] (gcd 1024 192)
[FAIL] (sqrt 2.0): expected 1.414 but received 1.414213562373095
┌───────────────────────────────────────────────────────────────
│ Basic unit tests
│ 3 tests completed in 0.001 seconds
│ 2 (66.66%) tests passed
│ 1 (33.33%) tests failed
╘═══════════════════════════════════════════════════════════════
```

Procedure `test-begin` opens a new test group. It is optionally given a test group name. Anonymous test groups (without name) are supported, but not encouraged as they make it more difficult to understand the testing output.

Special forms such as `test` and `test-approx` are used to compare expected values with actual result values. Expected values always preceed the actual values. Tests might also be given a name, which is used instead of the expression to test in the test report. `test`, `test-approx`, etc. need to be called in the context of a test group, otherwise the syntactical forms will fail. This is different from other similar libraries which often have an anonymous top-level test group implicitly.

Here is the structure of a more complicated testing setup which has a top-level test group `Library tests` and two nested test groups `Functionality A` and `Functionality B`.

```scheme
(test-begin "Library tests")
  (test-begin "Functionality A")
  (test ...)
  ...
  (test-end)
  (test-begin "Functionality B")
  ...
  (test-end)
(test-end)
```

The syntactic form `test-group` can be used to write small test groups more concisely. This code defines the same test group as above using `test-group`:

```scheme
(test-group "Library tests"
  (test-group "Functionality A"
    (test ...)
    ...)
  (test-group "Functionality B"
    (test ...)
    ...))
```

## Defining test groups

**(test-begin)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(test-begin&#x20;**_**name**_**)**

A new test group is opened via procedure `test-begin`. _name_ defines a name for the test group. The name is primarily used in the test report to refer to the test group.

**(test-end)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(test-end&#x20;**_**name**_**)**

The currently open test group gets closed by calling procedure `test-end`. Optionally, for documentation and validation purposes, it is possible to provide _name_. If explicitly given, it has to match the name of the corresponding `test-begin` call in terms of `equal?`. When `test-end` is called, a summary gets printed listing stats such as passed/failed tests, the time it took to execute the tests in the group, etc.

**(test-exit)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(text-exit&#x20;**_**obj**_**)**

This procedure should be placed at the top-level of a test script. It raises an error if it is placed in the context of an open test group. If _obj_ is provided and failures were encountered in the previously closed top-level test group, `test-exit` will exit the evaluation of the code by invoking `(exit obj)`.

**(test-group&#x20;**_**name body ...**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">

`test-group` is a syntactical shortcut for opening and closing a new named test group. It is equivalent to:

```scheme
(begin
  (test-begin name)
  body ...
  (test-end))
```

**(test-group-failed-tests)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of failed tests in the innermost active test group.

**(test-group-passed-tests)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of passed tests in the innermost active test group.

**(failed-tests)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of failed tests in all currently active test group.

**(passed-tests)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of passed tests in all currently active test group.

## Comparing actual with expected values

**(test&#x20;**_**exp tst**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">\
**(test&#x20;**_**name exp tst**_**)**

Main syntax for comparing the result of evaluating expression _tst_ with the expected value _exp_. The procedure stored in parameter object _current-test-comparator_ is used to compare the actual value with the expected value. _name_ is supposed to be a string and used to report success and failure of the test. If not provided, the output of `(display tst)` is used as a name instead. `test` catches errors and prints informative failure messages, including the name, what was expected and what was computed. `test` is a convenience wrapper around `test-equal` that catches common mistakes.

**(test-equal&#x20;**_**exp tst**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">\
**(test-equal&#x20;**_**name exp tst**_**)**\
**(test-equal&#x20;**_**name exp tst eq**_**)**

Compares the result of evaluating expression _tst_ with the expected value _exp_. The procedure _eq_ is used to compare the actual value with the expected value _exp_. If _eq_ is not provided, the procedure stored in parameter object _current-test-comparator_ is used as a default. _name_ is supposed to be a string and it is used to report success and failure of the test. If not provided, the output of `(display tst)` is used as a name instead. `test-equal` catches errors and prints informative failure messages, including the name, what was expected and what was computed.

**(test-assert&#x20;**_**tst**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">\
**(test-assert&#x20;**_**name tst**_**)**

`test-assert` asserts that the test expression _tst_ is not false. It is a convenience wrapper around `test-equal`. _name_ is supposed to be a string. It is used to report success and failure of the test. If not provided, the output of `(display tst)` is used as a name instead.

**(test-error&#x20;**_**tst**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">\
**(test-error&#x20;**_**name tst**_**)**

`test-error` asserts that the test expression _tst_ fails by raising an error. _name_ is supposed to be a string. It is used to report success and failure of the test. If not provided, the output of `(display tst)` is used as a name instead.

**(test-approx&#x20;**_**exp tst**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">\
**(test-approx&#x20;**_**name exp tst**_**)**

Compares the result of evaluating expression _tst_ with the expected floating-point value _exp_. The procedure `approx-equal?` is used to compare the actual value with the expected flonum value _exp_. `approx-equal?` uses the parameter object `current-test-epsilon` to determine the precision of the comparison (the default is `0.0000001`). _name_ is supposed to be a string. It is used to report success and failure of the test. If not provided, the output of `(display tst)` is used as a name instead. `test-approx` catches errors and prints informative failure messages, including the name, what was expected and what was computed.

**(test-not&#x20;**_**tst**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">\
**(test-not&#x20;**_**name tst**_**)**

`test-not` asserts that the test expression _tst_ is false. It is a convenience wrapper around `test-equal`. _name_ is supposed to be a string. It is used to report success and failure of the test. If not provided, the output of `(display tst)` is used as a name instead.

**(test-values&#x20;**_**exp tst**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">\
**(test-values&#x20;**_**name exp tst**_**)**

Compares the result of evaluating expression _tst_ with the expected values _exp_. _exp_ should be of the form `(values x ...)`. As opposed to `test` and `test-equal`, `test-values` works for multiple return values in a portable fashion. The procedure stored in parameter object _current-test-comparator_ is used as a comparison procedure. _name_ is expected to be a string.

## Test utilities

**current-test-comparator** <img class="kind" src="/img/param.png" alt="parameter">

Parameter object referring to the default comparison procedure for `test` and the `test-*` syntactical forms. By default, `current-test-comparator` refers to `equal?`.

**current-test-epsilon** <img class="kind" src="/img/param.png" alt="parameter">

Maximum difference allowed for inexact comparisons via procedure `approx-equal?`. By default, this parameter object is set to `0.0000001`.

**(approx-equal?&#x20;**_**x y**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(approx-equal?&#x20;**_**x y epsilon**_**)**

Compares numerical value _x_ with numerical value _y_ and returns `#t` if _x_ and _y_ are approximately true. They are approximately true if _x_ and _y_ differ at most by _epsilon_. If _epsilon_ is not provided, the value of parameter object `current-test-epsilon` is used as a default.

**(write-to-string&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Writes value `obj` into a new string using procedure `write`, unless _obj_ is a pair, in which case `write-to-string` interprets it as a Scheme expression and uses shortcut syntax for special forms such as `quote`, `quasiquote`, etc. This procedure is used to convert expressions into names of tests.
