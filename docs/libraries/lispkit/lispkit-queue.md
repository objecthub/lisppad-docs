---
sidebar_position: 560
---

# (lispkit queue)

Library `(lispkit queue)` provides an implementation for mutable queues, i.e. mutable FIFO buffers.

**queue-type-tag**   <img class="kind" src="/img/const.png" alt="constant">

Symbol representing the `queue` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all queue objects.

**(make-queue)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new empty queue.

**(queue&#x20;**_**x ...**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new queue with _x_ on its first position followed by the remaining parameters.

```scheme
(dequeue! (queue 1 2 3))  ⇒ 1 
```

**(queue?&#x20;**_**obj**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a queue; otherwise `#f` is returned.

**(queue-empty?&#x20;**_**q**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if queue _q_ is empty.

**(queue-size&#x20;**_**q**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns the size of queue _q_, i.e. the number of elements buffered in _q_.

**(queue=?&#x20;**_**q1 q2**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if queue _q1_ has the exact same elements in the same order like queue _q2_; otherwise, `#f` is returned.

**(enqueue!&#x20;**_**q x**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Inserts element _x_ at the end of queue _q_.

**(queue-front&#x20;**_**q**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns the first element in queue _q_. If the queue is empty, an error is raised.

**(dequeue!&#x20;**_**q**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Removes the first element from queue _q_ and returns its value.

```scheme
(define q (make-queue))
(enqueue! q 1)
(enqueue! q 2)
(dequeue! q)     ⇒ 1
(queue-front q)  ⇒ 2
(queue-size q)   ⇒ 1
```

**(queue-clear!&#x20;**_**q**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Removes all elements from queue _q_.

**(queue-copy&#x20;**_**q**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns a copy of queue _q_.

**(queue->list&#x20;**_**q**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns a list consisting of all elements in queue _q_ in the order they were inserted, i.e. starting with the first element.

```scheme
(define q (make-queue))
(enqueue! q 1)
(enqueue! q 2)
(enqueue! q 3)
(queue->list q)  ⇒ (1 2 3)
```

**(list->queue&#x20;**_**l**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new queue consisting of the elements of list _l_. The first element in _l_ will become the front element of the new queue that is returned.

```scheme
(dequeue! (list->queue '(1 2 3)))  ⇒ 1
```

**(list->queue!&#x20;**_**s l**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Inserts the elements of list _l_ into queue _q_ in the order they appear in the list.

```scheme
(define q (list->queue '(1 2 3)))
(list->queue! q '(4 5 6))
(queue->list q)  ⇒ (1 2 3 4 5 6)
```
