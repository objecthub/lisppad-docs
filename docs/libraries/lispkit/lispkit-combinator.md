---
sidebar_position: 90
---

# (lispkit combinator)

Library `(lispkit combinator)` defines abstractions for _combinator-style programming_. It provides means to create and compose functions.

**(const&#x20;**_**c ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a function accepting any number of arguments and returning the values `c` ... .

**(flip&#x20;**_**f**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Takes a function with two parameters and returns an equivalent function where the two parameters are swapped.

```scheme
(define snoc (flip cons))
(snoc (snoc (snoc '() 3) 2) 1)  ⇒  (1 2 3)
```

**(negate&#x20;**_**f**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a function which invokes `f` and returns the logical negation.

```scheme
(define gvector-has-elements? (negate gvector-empty?))
(gvector-has-elements? #g(1 2 3))  ⇒  #t
```

**(partial f&#x20;**_**arg ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Applies arguments _arg ..._ partially to _f_ and returns a new function accepting the remaining arguments. For a function `(f a1 a2 a3 ... an)`, `(partial f a1 a2)` will return a function `(lambda (a3 ... an) (f a1 a2 a3 ... an))`.

**(compose&#x20;**_**f ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Composes the given functions _f ..._ such that `((compose f1 f2 ... fn) x)` is equivalent to `(f1 (f2 (... (fn x))))`. `compose` supports functions returning multiple arguments.

**(o&#x20;**_**f ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Composes the given functions _f ..._ such that `((o f1 f2 ... fn) x)` is equivalent to `(f1 (f2 (... (fn x))))`. `o` is a more efficient version of `compose` which only works if the involved functions only return a single argument. `compose` is more general and supports functions returning multiple arguments.

**(conjoin&#x20;**_**f ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a function invoking all functions _f ..._ and combining the results with `and`. `((conjoin f1 f2 ...) x ...)` is equivalent to `(and (f1 x ...) (f2 x ...) ...)`.

**(disjoin&#x20;**_**f ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a function invoking all functions _f ..._ and combining the results with `or`. `((disjoin f1 f2 ...) x ...)` is equivalent to `(or (f1 x ...) (f2 x ...) ...)`.

**(list-of?&#x20;**_**f**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a predicate which takes a list as its argument and returns `#t` if for every element _x_ of the list _(f x)_ returns true.

**(each&#x20;**_**f ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a function which applies the functions `f` ... each individually to its arguments in the given order, returning the result of the last function application.

**(cut&#x20;**_**f**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">\
**(cut&#x20;**_**f**_**&#x20;<...>)**\
**(cut&#x20;**_**f arg ...**_**)**\
**(cut&#x20;**_**f arg ...**_**&#x20;<...>)**

Special form `cut` transforms an expression _(f arg ...)_ into a lambda expression with as many formal variables as there are slots `<>` in the expression _(f arg ...)_. The body of the resulting lambda expression calls procedure _f_ with arguments _arg ..._ in the order they appear. In case there is a rest symbol `<...>` at the end, the resulting procedure is of variable arity, and the body calls _f_ with all arguments provided to the actual call of the specialized procedure.

```scheme
(cut cons (+ a 1) <>)   ⇒  (lambda (x2) (cons (+ a 1) x2))
(cut list 1 <> 3 <> 5)  ⇒  (lambda (x2 x4) (list 1 x2 3 x4 5))
(cut list 1 <> 3 <...>) ⇒  (lambda (x2 . xs) (apply list 1 x2 3 xs))
```

**(cute&#x20;**_**f**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">\
**(cute&#x20;**_**f**_**&#x20;<...>)**\
**(cute&#x20;**_**f arg ...**_**)**\
**(cute&#x20;**_**f arg ...**_**&#x20;<...>)**

Special form `cute` is similar to `cut`, except that it first binds new variables to the result of evaluating the non-slot expressions (in an unspecific order) and then substituting the variables for the non-slot expressions. In effect, `cut` evaluates non-slot expressions at the time the resulting procedure is called, whereas `cute` evaluates the non-slot expressions at the time the procedure is constructed.

```scheme
(cute cons (+ a 1) <>)
⇒  (let ((a1 (+ a 1))) (lambda (x2) (cons a1 x2)))
```

**(Y&#x20;**_**f**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Y combinator for computing a fixed point of a function _f_. This is a value that is mapped to itself.

```scheme
; factorial function
(define fac
  (Y (lambda (r)
       (lambda (x) (if (< x 2) 1 (* x (r (- x 1))))))))
; fibonacci numbers
(define fib
  (Y (lambda (f)
       (lambda (x)
         (if (< x 2) x (+ (f (- x 1)) (f (- x 2))))))))
```
