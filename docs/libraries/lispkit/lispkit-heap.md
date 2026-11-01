---
sidebar_position: 330
---

# (lispkit heap)

Library `(lispkit heap)` provides an implementation of a _priority queue_ in form of a _binary max heap_. A _max heap_ is a tree-based data structure in which for any given node _C_, if _P_ is a parent node of _C_, then the value of _P_ is greater than or equal to the value of _C_. Heaps as implemented by `(lispkit heap)` are mutable objects.

***

**heap-type-tag** <img class="kind" src="/img/const.png" alt="constant">

Symbol representing the `heap` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all heap objects.

**(make-heap&#x20;**_**pred\<?**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new empty binary max heap with _pred\<?_ being the associated ordering function.

**(heap-empty?&#x20;**_**hp**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if the heap _hp_ is empty, otherwise `#f` is returned.

**(heap-max&#x20;**_**hp**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the largest item in heap _hp_, i.e. the item which is larger than all others according to the comparison function of _hp_. Note, `heap-max` does not remove the largest item as opposed to `heap-delete-max!`. If there are no items on the heap, an error is signaled.

**(heap-add!&#x20;**_**hp e1 ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Inserts an item into the heap. The same item can be inserted multiple times.

**(heap-delete-max!&#x20;**_**hp**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the largest item in heap _hp_, i.e. the item which is larger than all others according to the comparison function of _hp_, and removes the item from the heap. If there are no items on the heap, an error is signaled.

**(heap-clear!&#x20;**_**hp**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Removes all items from _hp_. After this procedure has been executed, the heap is empty.

**(heap-copy&#x20;**_**hp**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a copy of heap _hp_.

**(heap->vector&#x20;**_**hp**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new vector containing all items of the heap _hp_ in descending order. This procedure does not mutate _hp_.

**(heap->list&#x20;**_**hp**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a list containing all items of the heap _hp_ in descending order.

**(heap->reversed-list&#x20;**_**hp**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a list containing all items of the heap _hp_ in ascending order.

**(list->heap!&#x20;**_**hp items**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Inserts all the items from list _items_ into heap _hp_.

**(list->heap&#x20;**_**items pred\<?**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Creates a new heap for the given ordering predicate _pred\<?_ and inserts all the items from list _items_ into it. `list-\>heap` returns the new heap.

**(vector->heap&#x20;**_**vec pred\<?**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Creates and returns a new heap for the given ordering predicate _pred\<?_ and inserts all the items from vector _vec_ into it.
