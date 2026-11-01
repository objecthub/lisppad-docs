---
sidebar_position: 50
---

# (lispkit box)

LispKit is a R7RS-compliant implementation with one exception: pairs are immutable. This library provides implementations of basic mutable data structures with reference semantics: mutable multi-place buffers, also called _boxes_, mutable pairs, and _atomic boxes_. The difference between a two-place box and a mutable pair is that a mutable pair allows mutations of the two elements independent of each other. The difference between a _box_ and an _atomic box_ is that access to atomic boxes is synchronized such that reading and writing is atomic.

## Boxes

**(box?&#x20;**_**obj**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a box; `#f` otherwise.

**(box&#x20;**_**obj ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new box object that contains the objects _obj ..._.

**(unbox&#x20;**_**box**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the current contents of _box_. If multiple values have been stored in the box, `unbox` will return multiple values. This procedure fails if _box_ is not referring to a box.

**(set-box!&#x20;**_**box obj ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Sets the content of _box_ to objects _obj ..._. This procedure fails if _box_ is not referring to a box.

**(update-box!&#x20;**_**box proc**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Invokes _proc_ with the content of _box_ and stores the result of this function invocation in _box_. `update-box!` is implemented like this:

```scheme
(define (update-box! box proc)
  (set-box! box (apply-with-values proc (unbox box))))
```

## Mutable pairs

**(mpair?&#x20;**_**obj**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if v is a mutable pair (mpair); `#f` otherwise.

**(mcons&#x20;**_**car cdr**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new mutable pair whose first element is set to _car_ and whose second element is set to _cdr_.

**(mcar&#x20;**_**mpair**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the first element of the mutable pair _mpair_.

**(mcdr&#x20;**_**mpair**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the second element of the mutable pair _mpair_.

**(set-mcar!&#x20;**_**mpair obj**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Sets the first element of the mutable pair _mpair_ to _obj_.

**(set-mcdr!&#x20;**_**mpair obj**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Sets the second element of the mutable pair _mpair_ to _obj_.

## Atomic boxes

**atomic-box-type-tag**   <img class="kind" src="/img/const.png" alt="constant">

Symbol representing the `atomic-box` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all atomic box objects.

**(atomic-box?&#x20;**_**obj**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is an atomic box; `#f` otherwise.

**(make-atomic-box&#x20;**_**obj ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new atomic box that contains the objects _obj ..._.

**(atomic-box-ref&#x20;**_**abox**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the current contents of atomic box _abox_ synchronizing access such that it is atomic. If multiple values have been stored in _abox_, `atomic-box-ref` will return multiple values. This procedure fails if _abox_ is not referring to an atomic box.

**(atomic-box-set!&#x20;**_**abox obj ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Sets the content of _abox_ to objects _obj ..._ synchronizing access such that it is atomic. This procedure fails if _abox_ is not referring to an atomic box.

**(atomic-box-swap!&#x20;**_**abox obj ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Sets the content of _abox_ to objects _obj ..._ synchronizing access such that it is atomic. This procedure fails if _abox_ is not referring to an atomic box. This procedure returns the former values of _abox_.

**(atomic-box-compare-and-set!&#x20;**_**abox curr obj ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Sets the content of _abox_ to objects _obj ..._ if the values of _abox_ match _curr_; in this case `#t` is returned. If the values of _abox_ do not match _curr_, the values of _abox_ remain untouched and `#f` is returned. This operation is atomic and fails if _abox_ is not referring to an atomic box.

**(atomic-box-compare-and-swap!&#x20;**_**abox curr obj ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Sets the content of _abox_ to objects _obj ..._ if the values of _abox_ match _curr_. If the values of _abox_ do not match _curr_, the values of _abox_ remain untouched. This operation is atomic and fails if _abox_ is not referring to an atomic box. It returns the former values of _abox_.

**(atomic-box-inc+mul!&#x20;**_**abox i1**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(atomic-box-inc+mul!&#x20;**_**abox i1 m**_**)**\
**(atomic-box-inc+mul!&#x20;**_**abox i1 m i2**_**)**

This procedure can be used for atomic boxes containing a single value of type _flonum_ or _fixnum_ to update its value _x_ with _(x + i1) \* m + i2_ in a synchronized fashion. `atomic-box-inc+mul!` returns the new value of _abox_.

**(atomic-box-update!&#x20;**_**abox proc**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Invokes _proc_ with the content of _abox_ and stores the result of this function invocation in _abox_. The computation of the new value and the update of _abox_ is performed atomically and the new value of _abox_ is returned by `atomic-box-update!`.
