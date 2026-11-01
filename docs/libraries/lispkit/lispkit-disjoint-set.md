---
sidebar_position: 180
---

# (lispkit disjoint-set)

Library `(lispkit disjoint-set)` implements disjoint sets, a mutable union-find data structure that tracks a set of elements partitioned into disjoint subsets. Disjoint sets are based on hashtables and require the definition of an equality and a hash function.

**disjoint-set-type-tag** <img class="kind" src="/img/const.png" alt="constant">

Symbol representing the `disjoint-set` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all disjoint set objects.

**(disjoint-set? \_obj**\_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a disjoint set object; otherwise `#f` is returned.

**(make-eq-disjoint-set)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new empty disjoint set using `eq` as equality and `eq-hash` as hash function.

**(make-eqv-disjoint-set)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new empty disjoint set using `eqv` as equality and `eqv-hash` as hash function.

**(make-disjoint-set&#x20;**_**comparator)**_   <img class="kind" src="/img/proc.png" alt="procedure">\
**(make-disjoint-set&#x20;**_**hash eql**_**)**

Returns a new empty disjoint set using _eql_ as equality and _hash_ as hash function. Instead of providing two functions, a new disjoint set can also be created based on a _comparator_.

**(disjoint-set-make&#x20;**_**dset x**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Adds a new singleton set _x_ to _dset_ if element _x_ does not exist already in disjoint set _dset_.

**(disjoint-set-find&#x20;**_**dset x)**_   <img class="kind" src="/img/proc.png" alt="procedure">\
**(disjoint-set-find&#x20;**_**dset x default**_**)**

Looks up element _x_ in _dset_ and returns the set in which _x_ is currently contained. Returns _default_ if element _x_ is not found. If _default_ is not provided, `disjoint-set-find` uses `#f` instead.

**(disjoint-set-union&#x20;**_**dset x y**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Unifies the sets containing _x_ and _y_ in disjoint set _dset_.

**(disjoint-set-size&#x20;**_**dset**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of sets in _dset_.
