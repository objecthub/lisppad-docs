---
sidebar_position: 510
---

# (lispkit math util)

Library `(lispkit math util)` implements mathematical utility functions.

***

**(sgn&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Implements the sign/signum function. Returns -1 if _x_ is negative, 0 (or a signed zero, when inexact) if _x_ is zero, and 1 if _x_ is a positive number. `sgn` fails if _x_ is not a real number.

**(numbers&#x20;**_**lo hi**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(numbers&#x20;**_**lo hi f**_**)**\
**(numbers&#x20;**_**lo hi guard f**_**)**

Returns a list of numbers by iterating from integer _lo_ to integer _hi_ (both inclusive) and applying function _f_ to each integer in the range for which _guard_ returns true. The default guard always returns true. The default for _f_ is `identity`.

**(sum&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the sum of all numbers of list _xs_. This procedure fails if there is an element in _xs_ which is not a number.

**(product&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the product of all numbers of list _xs_. This procedure fails if there is an element in _xs_ which is not a number.

**(minimum&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the minimum of all numbers of list _xs_. This procedure fails if there is an element in _xs_ which is not a number.

**(maximum&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the maximum of all numbers of list _xs_. This procedure fails if there is an element in _xs_ which is not a number.

**(conjugate&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Conjugates number _x_. For real numbers _x_, `conjugate` returns _x_, otherwise _x_ is being returned with the opposite sign for the imaginary part.

**(degrees->radians&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Converts degrees into radians.

**(radians->degrees&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Converts radians into degrees.

**(prime?&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if integer _n_ is a prime number, `#f` otherwise.

**(make-nan&#x20;**_**neg quiet payload**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a NaN whose sign bit is equal to _neg_ (`#t` for negative, `#f` for positive), whose quiet bit is equal to _quiet_ (`#t` for quiet, `#f` for signaling), and whose payload is the positive exact integer _payload_. It is an error if _payload_ is larger than a NaN can hold.

**(nan-negative?&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if the sign bit of _x_ is 1 and `#f` otherwise.

**(nan-quiet?&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _x_ is a quiet NaN.

**(nan-payload&#x20;**_**x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the payload bits of floating-point number _x_ as a positive exact integer.

**(nan=?&#x20;**_**x y**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _x_ and _y_ have the same sign, quiet bit, and payload; and `#f` otherwise.
