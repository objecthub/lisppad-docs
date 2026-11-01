---
sidebar_position: 620
---

# (lispkit stack)

Library `(lispkit stack)` provides an implementation for mutable stacks, i.e. mutable LIFO buffers.

**stack-type-tag** <img class="kind" src="/img/const.png" alt="constant">

Symbol representing the `stack` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all stack objects.

**(make-stack)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new empty stack.

**(stack&#x20;**_**x ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new stack with _x_ on its top position followed by the remaining parameters.

```scheme
(stack-top (stack 1 2 3))  ⇒ 1 
```

**(stack?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a stack; otherwise `#f` is returned.

**(stack-empty?&#x20;**_**s**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if stack _s_ is empty.

**(stack-size&#x20;**_**s**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the size of stack _s_, i.e. the number of elements buffered in _s_.

**(stack=?&#x20;**_**s1 s2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if stack _s1_ has the exact same elements in the same order like stack _s2_; otherwise, `#f` is returned.

**(stack-push!&#x20;**_**s x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Pushes element _x_ onto stack _s_.

**(stack-top&#x20;**_**s**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the top element of stack _s_. If the stack is empty, an error is raised.

**(stack-pop!&#x20;**_**s**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Removes the top element from stack _s_ and returns its value.

```scheme
(define s (make-stack))
(stack-push! s 1)
(stack-push! s 2)
(stack-pop! s)  ⇒ 2
(stack-size s)  ⇒ 1
```

**(stack-clear!&#x20;**_**s**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Removes all elements from stack _s_.

**(stack-copy&#x20;**_**s**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a copy of stack _s_.

**(stack->list&#x20;**_**s**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a list consisting of all elements on stack _s_ in the order they appear, i.e. starting with the top element.

```scheme
(stack->list (stack 1 2 3))
```

**(list->stack&#x20;**_**l**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new stack consisting of the elements of list _l_. The first element in _l_ will become the top element of the stack that is returned.

**(list->stack!&#x20;**_**s l**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Pushes the elements of list _l_ onto stack _s_ in reverse order.

```scheme
(define s (list->stack '(3 2 1)))
(list->stack! s '(6 5 4))
(stack->list s)  ⇒ (6 5 4 3 2 1)
```
