---
sidebar_position: 480
---

# (lispkit math)

Library `(lispkit math)` defines functions on numbers. Numbers are arranged into a tower of subtypes in which each level is a subset of the level above it:

* number
* complex number
* real number
* rational number
* integer

For example, 3 is an integer. Therefore 3 is also a rational, a real, and a complex number. These types are defined by the predicates `number?`, `complex?`, `real?`, `rational?`, and `integer?`.

There is no simple relationship between a number’s type and its representation inside a computer. Scheme’s numerical operations treat numbers as abstract data, as independent of their representation as possible.

## Numerical constants

**pi** <img class="kind" src="/img/const.png" alt="constant">

The constant pi.

**e** <img class="kind" src="/img/const.png" alt="constant">

Euler's number, i.e. the base of the natural logarithm.

**fx-width** <img class="kind" src="/img/const.png" alt="constant">

Number of bits used to represent fixnum numbers (typically 64).

**fx-greatest** <img class="kind" src="/img/const.png" alt="constant">

Greatest fixnum value (typically 9223372036854775807).

**fx-least** <img class="kind" src="/img/const.png" alt="constant">

Smallest fixnum value (typically -9223372036854775808).

**fl-epsilon** <img class="kind" src="/img/const.png" alt="constant">

Bound to the appropriate machine epsilon for the hardware representation of flonum numbers, i.e. the positive difference between 1.0 and the next greater representable number.

**fl-greatest** <img class="kind" src="/img/const.png" alt="constant">

This value compares greater than or equal to all finite floating-point numbers, but less than infinity.

**fl-least** <img class="kind" src="/img/const.png" alt="constant">

This value compares less than or equal to all positive floating-point numbers, but greater than zero.

## Predicates

**(number?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(complex?&#x20;**_**obj**_**)**\
**(real?&#x20;**_**obj**_**)**\
**(rational?&#x20;**_**obj**_**)**\
**(integer?&#x20;**_**obj**_**)**

These numerical type predicates can be applied to any kind of argument, including non-numbers. They return `#t` if the object is of the named type, and otherwise they return `#f`. In general, if a type predicate is true of a number then all higher type predicates are also true of that number. Consequently, if a type predicate is false of a number, then all lower type predicates are also false of that number.

If _z_ is a complex number, then `(real? z)` is true if and only if `(zero? (imag-part z))` is true. If _x_ is an inexact real number, then `(integer? x)` is true if and only if `(= x (round x))`.

The numbers `+inf.0`, `-inf.0`, and `+nan.0` are real but not rational.

```scheme
(complex? 3+4i)    ⇒  #t
(complex? 3)       ⇒  #t
(real? 3)          ⇒  #t
(real? -2.5+0i)    ⇒  #t
(real? -2.5+0.0i)  ⇒  #f
(real? #e1e10)     ⇒  #t
(real? +inf.0)     ⇒  #t
(real? +nan.0)     ⇒  #t
(rational? -inf.0) ⇒  #f
(rational? 3.5)    ⇒  #t
(rational? 6/10)   ⇒  #t
(rational? 6/3)    ⇒  #t
(integer? 3+0i)    ⇒  #t
(integer? 3.0)     ⇒  #t
(integer? 8/4)     ⇒  #t
```

**(fixnum?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if object _obj_ is a fixnum; otherwise returns `#f`. A fixnum is an exact integer that is small enough to fit in a machine word. LispKit fixnums are 64-bit words. Fixnums are signed and encoded using 2’s complement.

**(ratnum?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if object `obj` is a fractional number, i.e. a rational number which isn't an integer.

**(bignum?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if object _obj_ is a large integer number, i.e. an integer which isn't a fixnum.

**(flonum?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if object _obj_ is a floating-point number.

**(cflonum?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if object _obj_ is a complex floating-point number.

**(exact?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(inexact?&#x20;**_**obj**_**)**

These numerical predicates provide tests for the exactness of a quantity. For any Scheme number, precisely one of `exact?` and `inexact?` is true.

```scheme
(exact? 3.0)    ⇒  #f
(exact? #e3.0)  ⇒  #t
(inexact? 3.)   ⇒  #t
```

**(exact-integer?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is both exact and an integer; otherwise returns `#f`.

```scheme
(exact-integer? 32)    ⇒  #t
(exact-integer? 32.0)  ⇒  #f
(exact-integer? 32/5)  ⇒  #f
```

**(finite?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

The `finite?` procedure returns `#t` on all real numbers except `+inf.0`, `-inf.0`, and `+nan.0`, and on complex numbers if their real and imaginary parts are both finite. Otherwise it returns `#f`.

```scheme
(finite? 3)           ⇒  #t
(finite? +inf.0)      ⇒  #f
(finite? 3.0+inf.0i)  ⇒  #f
```

**(infinite?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

The `infinite?` procedure returns `#t` on the real numbers `+inf.0` and `-inf.0`, and on complex numbers if their real or imaginary parts or both are infinite. Otherwise it returns `#f`.

```scheme
(infinite? 3)          ⇒  #f
(infinite? +inf.0)     ⇒  #t
(infinite? +nan.0)     ⇒  #f
(infinite? 3.0+inf.0i) ⇒  #t
```

**(nan?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

The `nan?` procedure returns `#t` on `+nan.0`, and on complex numbers if their real or imaginary parts or both are `+nan.0`. Otherwise it returns `#f`.

```scheme
(nan? +nan.0)      ⇒  #t
(nan? 32)          ⇒  #f
(nan? +nan.0+5.0i) ⇒  #t
(nan? 1+2i)        ⇒  #f
```

**(positive?&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if number _x_ is positive, i.e. `x > 0`.

**(negative?&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if number _x_ is negative, i.e. `x < 0`.

**(zero?&#x20;**_**z**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if number _z_ is zero, i.e. `z = 0`.

**(even?&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if the integer number _n_ is even.

**(odd?&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if the integer number _n_ is odd.

## Exactness and rounding

Scheme distinguishes between numbers that are represented exactly and those that might not be. This distinction is orthogonal to the dimension of type. A number is exact if it was written as an exact constant or was derived from exact numbers using only exact operations. A number is inexact if it was written as an inexact constant, if it was derived using inexact ingredients, or if it was derived using inexact operations.

Rational operations such as `+` should always produce exact results when given exact arguments. If the operation is unable to produce an exact result, then it either reports the violation of an implementation restriction or it silently coerces its result to an inexact value.

**(exact&#x20;**_**z**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(inexact&#x20;**_**z**_**)**

The procedure `inexact` returns an inexact representation of _z_. The value returned is the inexact number that is numerically closest to the argument. For inexact arguments, the result is the same as the argument. For exact complex numbers, the result is a complex number whose real and imaginary parts are the result of applying inexact to the real and imaginary parts of the argument, respectively. If an exact argument has no reasonably close inexact equivalent (in the sense of `=`), then a violation of an implementation restriction may be reported.

The procedure `exact` returns an exact representation of _z_. The value returned is the exact number that is numerically closest to the argument. For exact arguments, the result is the same as the argument. For inexact non-integral real arguments, the function may return a rational approximation. For inexact complex arguments, the result is a complex number whose real and imaginary parts are the result of applying exact to the real and imaginary parts of the argument, respectively. If an inexact argument has no reasonably close exact equivalent, (in the sense of `=`), then a violation of an implementation restriction may be reported.

These procedures implement the natural one-to-one correspondence between `exact` and `inexact` integers throughout an implementation-dependent range.

**(approximate&#x20;**_**x delta**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Procedure `approximate` approximates floating-point number _x_ returning a rational number which differs at most _delta_ from _x_.

**(rationalize&#x20;**_**x y**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

The `rationalize` procedure returns the simplest rational number differing from _x_ by no more than _y_. A rational number _r1_ is simpler than another rational number _r2_ if _r1 = p1/q1_ and _r2 = p2/q2_ (in lowest terms) and |p1| ≤ |p2| and |q1| ≤ |q2|. Thus `3/5` is simpler than `4/7`. Although not all rationals are comparable in this ordering (consider `2/7` and `3/5`), any interval contains a rational number that is simpler than every other rational number in that interval (the simpler `2/5` lies between `2/7` and `3/5`). Note that `0 = 0/1` is the simplest rational of all.

```scheme
(rationalize (exact .3) 1/10)  ⇒  1/3
```

**(floor&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(ceiling&#x20;**_**x**_**)**\
**(truncate&#x20;**_**x**_**)**\
**(round&#x20;**_**x**_**)**

These procedures return integers. `floor` returns the largest integer not larger than _x_. `ceiling` returns the smallest integer not smaller than _x_. `truncate` returns the integer closest to _x_ whose absolute value is not larger than the absolute value of _x_. `round` returns the closest integer to _x_, rounding to even when _x_ is halfway between two integers.

If the argument to one of these procedures is inexact, then the result will also be inexact. If an exact value is needed, the result can be passed to the `exact` procedure. If the argument is _infinite_ or a _NaN_, then it is returned.

```scheme
(floor -4.3)     ⇒ -5.0
(ceiling -4.3)   ⇒ -4.0
(truncate -4.3)  ⇒ -4.0 
(round -4.3)     ⇒ -4.0
(floor 3.5)      ⇒ 3.0
(ceiling 3.5)    ⇒ 4.0
(truncate 3.5)   ⇒ 3.0
(round 3.5)      ⇒ 4.0 ; inexact
(round 7/2)      ⇒ 4   ; exact 
(round 7)        ⇒ 7
```

## Operations

**(+&#x20;**_**z ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(\*&#x20;**_**z ...**_**)**

These procedures return the sum or product of their arguments.

```scheme
(+ 34)   ⇒  7
(+ 3)    ⇒  3
(+)      ⇒  0
(* 4)    ⇒  4
(*)      ⇒  1
```

**(-&#x20;**_**z**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(-&#x20;**_**z1 z2 ...**_**)**\
**(/&#x20;**_**z**_**)**\
**(/&#x20;**_**z1 z2 ...**_**)**

With two or more arguments, these procedures return the difference or quotient of their arguments, associating to the left. With one argument, however, they return the additive or multiplicative inverse of their argument.

It is an error if any argument of `/` other than the first is an exact zero. If the first argument is an exact zero, the implementation may return an exact zero unless one of the other arguments is a NaN.

```scheme
(- 3 4)     ⇒  -1
(- 3 4 5)   ⇒  -6
(- 3)       ⇒  -3
(/ 3 4 5)   ⇒  3/20
(/ 3)       ⇒  1/3
```

**(=&#x20;**_**x ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(<&#x20;**_**x ...**_**)**\
**(>&#x20;**_**x ...**_**)**\
**(<=&#x20;**_**x ...**_**)**\
**(>=&#x20;**_**x ...**_**)**

These procedures return `#t` if their arguments are (respectively): equal, monotonically increasing, monotonically decreasing, monotonically non-decreasing, or monotonically non-increasing, and `#f` otherwise. If any of the arguments are `+nan.0`, all the predicates return `#f`. They do not distinguish between inexact zero and inexact negative zero.

**(max&#x20;**_**x1 x2 ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(min&#x20;**_**x1 x2 ...**_**)**

These procedures return the maximum or minimum of their arguments.

If any argument is inexact, then the result will also be inexact (unless the procedure can prove that the inaccuracy is not large enough to affect the result, which is possible only in unusual implementations). If `min` or `max` is used to compare numbers of mixed exactness, and the numerical value of the result cannot be represented as an inexact number without loss of accuracy, then the procedure reports an implementation restriction.

**(abs&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

The `abs` procedure returns the absolute value of its argument _x_.

**(square&#x20;**_**z**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the square of _z_. This is equivalent to _(\* z z)_.

```scheme
(square 42)   ⇒ 1764
(square 2.0)  ⇒ 4.0
```

**(sqrt&#x20;**_**z**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

Returns the principal square root of _z_. The result will have either a positive real part, or a zero real part and a non-negative imaginary part.

```scheme
(sqrt 9)   ⇒ 3
(sqrt -1)  ⇒ +i
```

**(exact-integer-sqrt&#x20;**_**k**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns two non-negative exact integers _s_ and _r_ where _k = s^2+r_ and _k < (s+1)^2_.

**(expt&#x20;**_**z1 z2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns _z1_ raised to the power _z2_. For non-zero _z1_, this is _z1^z2 = e^(z2 log z1)_. The value of 0^z is `1` if `(zero? z)`, 0 if `(real-part z)` is positive, and an error otherwise. Similarly for 0.0z, with inexact results.

**(exp&#x20;**_**z**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">\
**(log&#x20;**_**z**_**)**\
**(log&#x20;**_**z1 z2**_**)**\
**(sin&#x20;**_**z**_**)**\
**(cos&#x20;**_**z**_**)**\
**(tan&#x20;**_**z**_**)**\
**(asin&#x20;**_**z**_**)**\
**(acos&#x20;**_**z**_**)**\
**(atan&#x20;**_**z**_**)**\
**(atan&#x20;**_**y x**_**)**

These procedures compute the usual transcendental functions. The `log` procedure computes the natural logarithm of _z_ (not the base-ten logarithm) if a single argument is given, or the base-_z2_ logarithm of _z1_ if two arguments are given. The `asin`, `acos`, and `atan` procedures compute `arc-sine`, `arc-cosine`, and `arc-tangent`, respectively. The two-argument variant of `atan` computes `(angle (make-rectangular x y))`.

## Division and remainder

**(gcd&#x20;**_**n ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(lcm&#x20;**_**n ...**_**)**

These procedures return the greatest common divisor (`gcd`) or least common multiple (`lcm`) of their arguments. The result is always non-negative.

```scheme
(gcd 32 -36)    ⇒ 4
(gcd)           ⇒ 0
(lcm 32 -36)    ⇒ 288
(lcm 32.0 -36)  ⇒ 288.0  ; inexact
(lcm)           ⇒ 1
```

**(truncate/&#x20;**_**n1 n2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(truncate-quotient&#x20;**_**n1 n2**_**)**\
**(truncate-remainder&#x20;**_**n1 n2**_**)**

These procedures implement number-theoretic integer division. It is an error if `n2` is zero. `truncate/` returns two integers; the other two procedures return an integer. All the procedures compute a quotient `nq` and remainder `nr` such that `n1 = n2 * nq + nr`. The three procedures are defined as follows:

```scheme
(truncate/ n1 n2)          =⇒ nq nr
(truncate-quotient n1 n2)  =⇒ nq
(truncate-remainder n1 n2) =⇒ nr
```

The remainder `nr` is determined by the choice of integer `nq`: `nr = n1 − n2 * nq` where `nq = truncate(n1/n2)`.

For any of the operators, and for integers `n1` and `n2` with `n2` not equal to 0:

```scheme
(= n1
   (+ (* n2 (truncate-quotient n1 n2))
            (truncate-remainder n1 n2)))
⇒  #t
```

provided all numbers involved in that computation are exact.

```scheme
(truncate/ 5 2)      ⇒  2 1
(truncate/ -5 2)     ⇒  -2 -1
(truncate/ 5 -2)     ⇒  -2 1
(truncate/ -5 -2)    ⇒  2 -1
(truncate/ -5.0 -2)  ⇒  2.0 -1.0
```

**(floor/&#x20;**_**n1 n2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(floor-quotient&#x20;**_**n1 n2**_**)**\
**(floor-remainder&#x20;**_**n1 n2**_**)**

These procedures implement number-theoretic integer division. It is an error if `n2` is zero. `floor/` returns two integers; the other two procedures return an integer. All the procedures compute a quotient `nq` and remainder `nr` such that `n1 = n2 * nq + nr`. The three procedures are defined as follows:

```scheme
(floor/ n1 n2)          =⇒ nq nr
(floor-quotient n1 n2)  =⇒ nq
(floor-remainder n1 n2) =⇒ nr
```

The remainder `nr` is determined by the choice of integer `nq`: `nr = n1 − n2 * nq` where `nq = floor(n1/n2)`.

For any of the operators, and for integers `n1` and `n2` with `n2` not equal to 0:

```scheme
(= n1
   (+ (* n2 (floor-quotient n1 n2))
            (floor-remainder n1 n2)))
⇒  #t
```

provided all numbers involved in that computation are exact.

```scheme
(floor/ 5 2)    ⇒  2 1 
(floor/ -5 2)   ⇒  -3 1
(floor/ 5 -2)   ⇒  -3 -1
(floor/ -5 -2)  ⇒  2 -1
```

**(quotient&#x20;**_**n1 n2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(remainder&#x20;**_**n1 n2**_**)**\
**(modulo&#x20;**_**n1 n2**_**)**

The `quotient` and `remainder` procedures are equivalent to `truncate-quotient` and `truncate-remainder`, respectively, and `modulo` is equivalent to `floor-remainder`. These procedures are provided for backward compatibility with earlier versions of the Scheme language specification.

## Fractional numbers

**(numerator&#x20;**_**q**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(denominator&#x20;**_**q**_**)**

These procedures return the numerator or denominator of their rational number `q`. The result is computed as if the argument was represented as a fraction in lowest terms. The denominator is always positive. The denominator of 0 is defined to be 1.

```scheme
(numerator (/ 6 4))             ⇒  3
(denominator (/ 6 4))           ⇒  2
(denominator (inexact (/ 6 4))) ⇒  2.0
```

## Complex numbers

**(make-rectangular&#x20;**_**x1 x2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the complex number _x1 + x2 \* i_. Since in LispKit, all complex numbers are inexact, `make-rectangular` returns an inexact complex number for all _x1_ and _x2_.

**(make-polar&#x20;**_**x1 x2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a complex number _z_ such that _z = x1 \* e^(x2 \* i)_, i.e. _x1_ is the magnitude of the complex number. The `make-polar` procedure may return an inexact complex number even if its arguments are exact.

**(real-part&#x20;**_**z**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the real part of the given complex number _z_.

**(imag-part&#x20;**_**z**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the imaginary part of the given complex number _z_.

**(magnitude&#x20;**_**z**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the magnitude of the given complex number _z_. Assuming _z = x1 \* e^(x2 \* i)_, `magnitude` returns _x1_. The `magnitude` procedure is the same as `abs` for a real argument.

**(angle&#x20;**_**z**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the `angle` of the given complex number _z_. The angle is a floating-point number between `-pi` and `pi`.

## Random numbers

**(random)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(random&#x20;**_**max**_**)**\
**(random&#x20;**_**min max**_**)**

If called without any arguments, `random` returns a random floating-point number between 0.0 (inclusive) and 1.0 (exclusive). If _max_ is provided and is an exact integer, `random` returns a random exact integer between 0 (inclusive) and _max_ (exclusive). If _max_ is inexact, the random number returned by `random` is a floating-point number between 0.0 (inclusive) and _max_ (exclusive). If _min_ is provided, it is used instead of zero as the included lower-bound of the random number range. If one of _min_ and _max_ are inexact, the result is inexact. _max_ needs to be greater than _min_.

```scheme
(random)           ⇒ 0.17198431800336633
(random 10)        ⇒ 9
(random 10.0)      ⇒ 7.446150392968266
(random 0.1)       ⇒ 0.06781020202176374
(random 100 110)   ⇒ 106
(random 100 109.9) ⇒ 108.30564866186835
```

## String representation

**(number->string&#x20;**_**z**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(number->string&#x20;**_**z radix**_**)**\
**(number->string&#x20;**_**z radix len**_**)**\
**(number->string&#x20;**_**z radix len prec**_**)**\
**(number->string&#x20;**_**z radix len prec noexp**_**)**

It is an error if _radix_ is not one of 2, 8, 10, or 16. The procedure `number->string` takes a number _z_ and a _radix_ and returns as a string an external representation of the given number in the given radix such that

```scheme
(let ((number number)
      (radix radix))
  (eqv? number (string->number
                 (number->string number radix)
                 radix)))
```

is true. It is an error if no possible result makes this expression true. If omitted, radix defaults to 10.

If _z_ is inexact, the radix is 10, and the above expression can be satisfied by a result that contains a decimal point, then the result contains a decimal point and is expressed using the minimum number of digits (exclusive of exponent and trailing zeroes) needed to make the above expression true. Otherwise, the format of the result is unspecified. The result returned by `number->string` never contains an explicit radix prefix.

The error case can occur only when _z_ is not a complex number or is a complex number with a non-rational real or imaginary part. If _z_ is an inexact number and the radix is 10, then the above expression is normally satisfied by a result containing a decimal point. The unspecified case allows for infinities, NaNs, and unusual representations.

The string representation can be customized via parameters _len_, _prec_, and _noexp_. The absolute value of fixnum _len_ determines the length of the string representation in characters. If _len_ is negative, then the number is left-aligned; for positive _len_, it is right-aligned; if _len_ is zero, no padding is done. _prec_ determines the precision of flonum and complex values (i.e. the number of significant digits; default is 16). _noexp_ is a boolean for disabling the exponential notation (if _noexp_ is set to `#t`).

```scheme
(number->string pi 10 5 5)   ⇒ "3.1416"
(number->string pi 10 9 5)   ⇒ "   3.1416"
(number->string pi 10 -9 5)  ⇒ "3.1416   "
```

**(string->number&#x20;**_**str**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(string->number&#x20;**_**str radix**_**)**

Returns a number of the maximally precise representation expressed by the given string _str_. It is an error if _radix_ is not 2, 8, 10, or 16. If supplied, _radix_ is a default radix that will be overridden if an explicit radix prefix is present in string (e.g. `"#o177"`). If _radix_ is not supplied, then the default radix is 10. If string _str_ is not a syntactically valid notation for a number, or would result in a number that cannot be represented, then `string->number` returns `#f`. An error is never signaled due to the content of string.

```scheme
(string->number "100")     ⇒ 100
(string->number "100" 16)  ⇒ 256
(string->number "1e2")     ⇒ 100.0
```

## Bitwise operations

The following bitwise functions operate on integers including fixnums and bignums.

**(bitwise-not&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the bitwise complement of _n_; i.e. all 1 bits are changed to 0 bits and all 0 bits to 1 bits.

**(bitwise-and&#x20;**_**n ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the _bitwise and_ of the given integer arguments _n ..._.

**(bitwise-ior&#x20;**_**n ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the _bitwise inclusive or_ of the given integer arguments _n ..._.

**(bitwise-xor&#x20;**_**n ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the _bitwise exclusive or (xor)_ of the given integer arguments _n ..._.

**(bitwise-if&#x20;**_**mask n m**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Merge the integers _n_ and _m_, via integer _mask_ determining from which integer to take each bit. That is, if the _k_-th bit of _mask_ is 0, then the _k_-th bit of the result is the _k_-th bit of _n_, otherwise the _k_-th bit of _m_. `bitwise-if` is defined in the following way:

```scheme
(define (bitwise-if mask n m)
  (bitwise-ior (bitwise-and mask n) (bitwise-and (bitwise-not mask) m)))
```

**(bit-count&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the population count of 1's if _n >= 0_, or 0's, if _n < 0_. The result is always non-negative. The R6RS analogue `bitwise-bit-count` procedure is incompatible as it applies `bitwise-not` to the population count before returning it if _n_ is negative.

```scheme
(bit-count 0)    ⇒  0
(bit-count -1)   ⇒  0
(bit-count 7)    ⇒  3
(bit-count  13)  ⇒  3
(bit-count -13)  ⇒  2
(bit-count  30)  ⇒  4
(bit-count -30)  ⇒  4
(bit-count (expt 2 100))           ⇒  1
(bit-count (- (expt 2 100)))       ⇒  100
(bit-count (- (+ 1 (expt 2 100)))) ⇒  1
```

**(integer-length&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of bits needed to represent _n_, i.e.

```scheme
(ceiling (/ (log (if (negative? integer)
			           (- integer)
			           (+ 1 integer)))
		        (log 2)))
```

The result is always non-negative. For non-negative _n_, this is the number of bits needed to represent _n_ in an unsigned binary representation. For all _n_, `(+ 1 (integer-length i))` is the number of bits needed to represent _n_ in a signed two's-complement representation.

**(first-bit-set&#x20;**_**n**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

Returns the index of the least significant 1 bit in the two's complement representation of _n_. If _n_ is 0, then −1 is returned.

```scheme
(first-bit-set 0)   ⇒  -1
(first-bit-set 1)   ⇒  0
(first-bit-set -4)  ⇒  2
```

**(bit-set?&#x20;**_**n k**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

_k_ must be non-negative. The `bit-set?` procedure returns `#t` if the _k_-th bit is 1 in the two's complement representation of _n_, and `#f` otherwise. This is the result of the following computation:

```scheme
(not (zero? (bitwise-and (bitwise-arithmetic-shift-left 1 k) n)))
```

**(copy-bit&#x20;**_**n k b**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

_k_ must be non-negative, and _b_ must be either 0 or 1. The `copy-bit` procedure returns the result of replacing the _k_-th bit of _n_ by the _k_-th bit of _b_, which is the result of the following computation:

```scheme
(bitwise-if (bitwise-arithmetic-shift-left 1 k)
            (bitwise-arithmetic-shift-left b k)
            n)
```

**(arithmetic-shift&#x20;**_**n count**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

If _count > 0_, shifts integer _n_ left by _count_ bits; otherwise, shifts fixnum _n_ right by _count_ bits. In general, this procedure returns the result of the following computation: `(floor (* n (expt 2 count)))`.

```scheme
(arithmetic-shift -6 -1)  ⇒  -3
(arithmetic-shift -5 -1)  ⇒  -3
(arithmetic-shift -4 -1)  ⇒  -2
(arithmetic-shift -3 -1)  ⇒  -2
(arithmetic-shift -2 -1)  ⇒  -1
(arithmetic-shift -1 -1)  ⇒  -1
```

**(arithmetic-shift-left&#x20;**_**n count**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the result of arithmetically shifting _n_ to the left by _count_ bits. _count_ must be non-negative. The `arithmetic-shift-left` procedure behaves the same as `arithmetic-shift`.

**(arithmetic-shift-right&#x20;**_**n count**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the result of arithmetically shifting _n_ to the right by _count_ bits. _count_ must be non-negative. `(arithmetic-shift-right n m)` behaves the same as `(arithmetic-shift n (fx- m))`.

## Fixnum operations

LispKit supports arbitrarily large exact integers. Internally, it has two different representations, one for smaller integers and one for the rest. These are colloquially known as _fixnums_ and _bignums_ respectively. In LispKit, a _fixnum_ is represented as a 64 bit signed integer which is encoded using two-complement.

Fixnum operations perform integer arithmetic on their fixnum arguments. If any argument is not a fixnum, or if the mathematical result is not representable as a fixnum, it is an error. In particular, this means that fixnum operations may return a mathematically incorrect fixnum in these situations without raising an error.

**(integer->fixnum&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

`integer->fixnum` coerces a given integer _n_ into a fixnum. If _n_ is a fixnum already, _n_ is returned by `integer->fixnum`. If _n_ is a bignum, then the first word of the bignum is returned as the result of `integer->fixnum`.

**(fx+&#x20;**_**n m ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fx-&#x20;**_**n ...**_**)**\
**(fx\*&#x20;**_**n m ...**_**)**\
**(fx/&#x20;**_**n m ...**_**)**

These procedures return the sum, the difference, the product and the quotient of their fixnum arguments _n m ..._. These procedures may overflow without reporting an error. `(fx- n)` is negating `n`.

**(fx=&#x20;**_**n m o ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fx<&#x20;**_**n m o ...**_**)**\
**(fx>&#x20;**_**n m o ...**_**)**\
**(fx<=&#x20;**_**n m o ...**_**)**\
**(fx>=&#x20;**_**n m o ...**_**)**

These procedures implement the comparison predicates for fixnums. `fx=` returns `#t` if all provided fixnums are equal. `fx<` returns `#t` if all provided fixnums are strictly monotonically increasing. `fx>` returns `#t` if all provided fixnums are strictly monotonically decreasing. `fx<=` returns `#t` if all provided fixnums are monotonically increasing. `fx>=` returns `#t` if all provided fixnums are monotonically decreasing.

**(fx1+&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Increments the fixnum _n_ by one and returns the value. This procedure may overflow without raising an error.

**(fx1-&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Decrements the fixnum _n_ by one and returns the value. This procedure may overflow without raising an error.

**(fxzero?&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if fixnum _n_ equals to 0.

**(fxpositive?&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if fixnum _n_ is positive, i.e. _n > 0_.

**(fxnegative?&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if fixnum _n_ is negative, i.e. _n < 0_.

**(fxeven?&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if fixnum _n_ is even, i.e. divisible by 2.

**(fxodd?&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if fixnum _n_ is odd, i.e. not divisible by 2.

**(fxabs&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the absolute value of its fixnum argument _n_.

**(fxremainder&#x20;**_**n m**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

This procedure returns a value _r_ such that the following equation holds: _n = m \* q + r_ where _q_ is the largest number of multiples of _m_ that will fit inside _n_. The sign of _m_ gets ignored. This means that `(fxremainder n m)` and `(fxremainder n (- m))` always return the same answer.

```scheme
(fxremainder 13 5)   ⇒  3
(fxremainder 13 -5)  ⇒  3
(fxremainder -13 5)  ⇒  -3
(fxremainder -13 -5) ⇒  -3
```

**(fxmodulo&#x20;**_**n m**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

This procedure computes a remainder similar to `(fxremainder n m)`, but when `(fxremainder n m)` has a different sign than _m_, `(fxmodulo n m)` returns `(+ (fxremainder n m) m)` instead.

```scheme
(fxmodulo 13 5)   ⇒  3
(fxmodulo 13 -5)  ⇒  -2
(fxmodulo -13 5)  ⇒  2
(fxmodulo -13 -5) ⇒  -3
```

**(fxsqrt&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Approximates the square root _s_ of fixnum _n_ such that _s_ is the biggest fixnum for which _s × s ≤ n_.

**(fxnot&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the _bitwise-logical inverse_ for fixnum _n_.

```scheme
(fxnot 0)    ⇒  -1
(fxnot -1)   ⇒  0
(fxnot 1)    ⇒  -2
(fxnot -34)  ⇒  33
```

**(fxand&#x20;**_**n m**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the _bitwise-logical and_ for _n_ and _m_.

```scheme
(fxand #x43 #x0f)  ⇒  3
(fxand #x43 #xf0)  ⇒  64
```

**(fxior&#x20;**_**n m**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the _bitwise-logical inclusive or_ for _n_ and _m_.

**(fxxor&#x20;**_**n m**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the _bitwise-logical exclusive or (xor)_ for _n_ and _m_.

**(fxif&#x20;**_**mask n m**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Merges the bit sequences _n_ and _m_, with bit sequence _mask_ determining from which sequence to take each bit. That is, if the _k_-th bit of _mask_ is 1, then the _k_-th bit of the result is the _k_-th bit of _n_, otherwise it's the _k_-th bit of _m_.

```scheme
(fxif 3 1 8)  ⇒  9
(fxif 3 8 1)  ⇒  0
(fxif 1 1 2)  ⇒  3
(fxif #b00111100 #b11110000 #b00001111)  ⇒  #b00110011 = 51
```

`fxif` can be implemented via `(fxior (fxand mask n) (fxand (fxnot mask) m)))`.

**(fxarithmetic-shift&#x20;**_**n count**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

If _count > 0_, shifts fixnum _n_ left by _count_ bits; otherwise, shifts fixnum _n_ right by _count_ bits. The absolute value of _count_ must be less than `fx-width`.

```scheme
(fxarithmetic-shift 8 2)    ⇒  32
(fxarithmetic-shift 4 0)    ⇒  4
(fxarithmetic-shift 8 -1)   ⇒  4
(fxarithmetic-shift -1 62)  ⇒  -4611686018427387904
```

`fxarithmetic-shift` can be implemented via `(floor (fx* n (expt 2 m)))` if this computes to a fixnum.

**(fxarithmetic-shift-left&#x20;**_**n count**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fxlshift&#x20;**_**n count**_**)**

Returns the result of arithmetically shifting _n_ to the left by _count_ bits. _count_ must be non-negative, and less than `fx-width`. The `fxarithmetic-shift-left` procedure behaves the same as `fxarithmetic-shift`.

**(fxarithmetic-shift-right&#x20;**_**n count**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fxrshift&#x20;**_**n count**_**)**

Returns the result of arithmetically shifting _n_ to the right by _count_ bits. _count_ must be non-negative, and less than `fx-width`. `(fxarithmetic-shift-right n m)` behaves the same as `(fxarithmetic-shift n (fx- m))`.

**(fxlogical-shift-right&#x20;**_**n count**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fxlrshift&#x20;**_**n count**_**)**

Returns the result of logically shifting _n_ to the right by _count_ bits. _count_ must be non-negative, and less than `fx-width`.

```scheme
(fxlogical-shift 8 2)    ⇒  2
(fxlogical-shift 4 0)    ⇒  4
(fxlogical-shift -1 62)  ⇒  3
```

**(fxbit-count&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

If _n_ is non-negative, this procedure returns the number of 1 bits in the two's complement representation of _n_. Otherwise, it returns the result of the following computation: `(fxnot (fxbit-count (fxnot n)))`.

**(fxlength&#x20;**_**n**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of bits needed to represent _n_ if it is positive, and the number of bits needed to represent `(fxnot n)` if it is negative, which is the fixnum result of the following computation:

```scheme
(do ((res 0 (fx1+ res))
     (bits (if (fxnegative? n) (fxnot n) n)
           (fxarithmetic-shift-right bits 1)))
    ((fxzero? bits) res))
```

**(fxfirst-bit-set&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the index of the least significant 1 bit in the two's complement representation of _n_. If _n_ is 0, then −1 is returned.

```scheme
(fxfirst-bit-set 0)   ⇒  -1
(fxfirst-bit-set 1)   ⇒  0
(fxfirst-bit-set -4)  ⇒  2
```

**(fxbit-set?&#x20;**_**n k**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

_k_ must be non-negative and less than `fx-width`. The `fxbit-set?` procedure returns `#t` if the _k_-th bit is 1 in the two's complement representation of _n_, and `#f` otherwise. This is the fixnum result of the following computation:

```scheme
(not (fxzero? (fxand n (fxarithmetic-shift-left 1 k))))
```

**(fxcopy-bit&#x20;**_**n k b**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

_k_ must be non-negative and less than `fx-width`. _b_ must be 0 or 1. The `fxcopy-bit` procedure returns the result of replacing the _k_-th bit of _n_ by _b_, which is the result of the following computation:

```scheme
(fxif (fxarithmetic-shift-left 1 k)
      (fxarithmetic-shift-left b k)
      n)
```

**(fxmin&#x20;**_**n m ...**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

Returns the minimum of the provided fixnums _n, m ..._.

**(fxmax&#x20;**_**n m ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the maximum of the provided fixnums _n, m ..._.

**(fxrandom)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fxrandom&#x20;**_**max**_**)**\
**(fxrandom&#x20;**_**min max**_**)**

Returns a random number between fixnum _min_ (inclusive) and fixnum _max_ (exclusive). If _min_ is not provided, then 0 is assumed to be the minimum bound. _max_ is required to be greater than _min_. If called without any arguments, `fxrandom` returns a random fixnum number from the full fixnum range.

```scheme
(fxrandom)           ⇒ 3845975858750874798
(fxrandom 10)        ⇒ 7
(fxrandom -6 -2)     ⇒ -5
```

## Floating-point operations

**(make-flonum&#x20;**_**x n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns _x_ × 2^_n_, where _n_ is a fixnum with an implementation-dependent range. The significand _x_ is a flonum.

**(real->flonum&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the best flonum representation of real number _x_.

**(flexponent&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the exponent of flonum _x_ (using a base of 2).

**(flsignificand&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the significand of flonum _x_.

**(flnext&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the least representable flonum value that compares greater than flonum _x_.

**(flprev&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the greatest representable flonum value that compares less than flonum _x_.

**(fl+&#x20;**_**x y...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fl\*&#x20;**_**x y...**_**)**

These procedures return the flonum sum or product of their flonum arguments _x y ..._. In general, they return the flonum that best approximates the mathematical sum or product.

**(fl-&#x20;**_**x ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fl/&#x20;**_**x ...**_**)**

These procedures return the flonum difference or quotient of their flonum arguments _x ..._. In general, they return the flonum that best approximates the mathematical difference or quotient. `(fl- x)` negates `x`, `(fl/ x)` is equivalent to `(fl/ 1.0 x)`.

**(flzero?&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _x = 0.0_, `#f` otherwise.

**(flpositive?&#x20;**_**x**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _x > 0.0_, `#f` otherwise.

**(flnegative?&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _x < 0.0_, `#f` otherwise.

**(fl=&#x20;**_**x y z ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fl<&#x20;**_**x y z ...**_**)**\
**(fl>&#x20;**_**x y z ...**_**)**\
**(fl<=&#x20;**_**x y z ...**_**)**\
**(fl>=&#x20;**_**x y z ...**_**)**

These procedures implement the comparison predicates for flonums. `fl=` returns `#t` if all provided flonums are equal. `fl<` returns `#t` if all provided flonums are strictly monotonically increasing. `fl>` returns `#t` if all provided flonums are strictly monotonically decreasing. `fl<=` returns `#t` if all provided flonums are monotonically increasing. `fl>=` returns `#t` if all provided flonums are monotonically decreasing.

```scheme
(fl= +inf.0 +inf.0)  ⇒  #t
(fl= -inf.0 +inf.0)  ⇒  #f
(fl= -inf.0 -inf.0)  ⇒  #t
(fl= 0.0 -0.0)       ⇒  #t
(fl< 0.0 -0.0)       ⇒  #f
(fl= +nan.0 123.0)   ⇒  #f
(fl< +nan.0 123.0)   ⇒  #f
```

**(flabs&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the absolute value of _x_ as a flonum.

**(flmin&#x20;**_**x ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the minimum value of the provided flonum values _x ..._. If no arguments are provided, positive infinity is returned.

**(flmax&#x20;**_**x ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the maximum value of the provided flonum values _x ..._. If no arguments are provided, negative infinity is returned.

**(flsqrt&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the square root of flonum _x_. The result is a flonum. If _x_ is negative, the result is `+nan.0`.

**(flrandom)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(flrandom&#x20;**_**max**_**)**\
**(flrandom&#x20;**_**min max**_**)**

Returns a random number between flonum _min_ (inclusive) and flonum _max_ (exclusive). If _min_ is not provided, then 0.0 is assumed to be the minimum bound. _max_ is required to be greater than _min_. If called without any arguments, `flrandom` returns a random floating-point number from the interval `[0.0, 1.0[`.

```scheme
(flrandom)          ⇒ 0.2179448178976645
(flrandom 123.4)    ⇒ 30.841401002076296
(flrandom -5.0 5.0) ⇒ -2.6619236065396237
```
