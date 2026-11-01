---
sidebar_position: 600
---

# (lispkit set)

Library `(lispkit set)` provides a generic implementation for sets of objects. Its API design is compatible to the R6RS-style API of library `(lispkit hashtable)`.

A set is a data structure for representing collections of objects. Any object can be used as element, provided a hash function and a suitable equivalence function is available. A hash function is a procedure that maps elements to exact integer objects. It is the programmer’s responsibility to ensure that the hash function is compatible with the equivalence function, which is a procedure that accepts two objects and returns true if they are equivalent and `#f` otherwise. Standard sets for arbitrary objects based on the `eq?`, `eqv?`, and `equal?` predicates are provided.

## Constructors

**set-type-tag** <img class="kind" src="/img/const.png" alt="constant">

Symbol representing the `set` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all set objects.

**(make-eq-set)**     <img class="kind" src="/img/proc.png" alt="procedure">

Create a new empty set using `eq?` as equivalence function.

**(make-eqv-set)**     <img class="kind" src="/img/proc.png" alt="procedure">

Create a new empty set using `eqv?` as equivalence function.

**(make-equal-set)**     <img class="kind" src="/img/proc.png" alt="procedure">

Create a new empty set using `equal?` as equivalence function.

**(make-set&#x20;**_**hash equiv**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(make-set&#x20;**_**hash equiv k**_**)**

Create a new empty set using the given hash function _hash_ and equivalence function _equiv_. An initial capacity _k_ can be provided optionally.

**(eq-set&#x20;**_**element ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Create a new set using `eq?` as equivalence function. Initialize it with the values _element ..._ .

**(eqv-set&#x20;**_**element ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Create a new set using `eqv?` as equivalence function. Initialize it with the values _element ..._ .

**(equal-set&#x20;**_**element ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Create a new set using `equal?` as equivalence function. Initialize it with the values _element ..._ .

## Inspection

**(set-equivalence-function&#x20;**_**s**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the equivalence function used by set _s_.

**(set-hash-function&#x20;**_**s**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the hash function used by set _s_.

**(set-mutable?&#x20;**_**s**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if set _s_ is mutable.

## Predicates

**(set?&#x20;**_**obj**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a set.

**(set-empty?&#x20;**_**obj**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is an empty set.

**(set=?&#x20;**_**s1 s2**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if set _s1_ and set _s2_ are using the same equivalence function and contain the same elements.

**(disjoint?&#x20;**_**s1 s2**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if set _s1_ and set _s2_ are disjoint sets.

**(subset?&#x20;**_**s1 s2**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if set _s1_ is a subset of set _s2_.

**(proper-subset?&#x20;**_**s1 s2**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if set _s1_ is a proper subset of set _s2_, i.e. _s1_ is a subset of _s2_ and _s1_ is not equivalent to _s2_.

**(set-contains?&#x20;**_**s element**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#` if set _s_ contains _element_.

**(set-any?&#x20;**_**s proc**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns true if there is at least one element in set _s_ for which procedure _proc_ returns true (i.e. not `#f`).

**(set-every?&#x20;**_**s proc**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns true if procedure _proc_ returns true (i.e. not `#f`) for all elements of set _s_.

## Procedures

**(set-size&#x20;**_**s**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of elements in set _s_.

**(set-elements&#x20;**_**s**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the elements of set _s_ as a vector.

**(set-copy s)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-copy&#x20;**_**s mutable**_**)**

Copies set _s_ creating an immutable copy if `mutable` is set to `#f` or if `mutable` is not provided.

**(set-for-each&#x20;**_**s proc**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Applies procedure _proc_ to all elements of set _s_ in an undefined order.

**(set-filter&#x20;**_**s pred**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Creates a new set containing the elements of set _s_ for which the procedure _pred_ returns true.

**(set-union&#x20;**_**s s1 ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Creates a new set containing the union of _s_ with _s1 ..._.

**(set-intersection&#x20;**_**s s1 ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Creates a new set containing the intersection of _s_ with _s1 ..._.

**(set-difference&#x20;**_**s s1 ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Creates a new set containing the difference of `s` and the sets in _s1 ..._ .

**(set->list&#x20;**_**s**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the elements of set _s_ as a list.

**(list->eq-set&#x20;**_**elements**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Creates a new set using the equivalence function `eq?` from the values in list _elements_.

**(list->eqv-set&#x20;**_**elements**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Creates a new set using the equivalence function `eqv?` from the values in list _elements_.

**(list->equal-set&#x20;**_**elements**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Creates a new set using the equivalence function `equal?` from the values in list _elements_.

## Mutators

**(set-adjoin!&#x20;**_**s element ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Adds _element ..._ to the set _s_.

**(set-delete!&#x20;**_**s element ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Deletes _element ..._ from the set _s_.

**(set-clear!&#x20;**_**s**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-clear!&#x20;**_**s k**_**)**

Clears set _s_ and reserves a capacity of _k_ elements if _k_ is provided.

**(list->set!&#x20;**_**s elements**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Adds the values of list _elements_ to set _s_.

**(set-filter!&#x20;**_**s pred**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Removes all elements from set _s_ for which procedure _pred_ returns `#f`.

**(set-union!&#x20;**_**s s1 ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Stores the union of set _s_ and sets _s1 ..._ in _s_.

**(set-intersection!&#x20;**_**s s1 ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Stores the intersection of set _s_ and the sets _s1 ..._ in _s_.

**(set-difference!&#x20;**_**s s1 ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Stores the difference of set _s_ and the sets _s1 ..._ in _s_.
