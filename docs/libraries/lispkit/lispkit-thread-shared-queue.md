---
sidebar_position: 780
---

# (lispkit thread shared-queue)

Library `(lispkit thread shared-queue)` implements thread-safe queues for which all operations are done atomically. Such _shared queues_ optionally have a maximum length. They start out in state "open", which means they allow elements to be added. Once a _shared queue_ has been closed, new elements cannot be added anymore, but existing ones can still be dequeued.

With this functionality, shared queues provide a good basis for synchronizing threads. For example, you can let a consumer thread block if a shared queue is empty, or a producer thread block if the number of items in the shared queue reaches a specified limit. Thus, _shared queues_ constitute a more conventional alternative to _channels_ as provided by library `(lispkit thread channel)`.

Inspired by the `mtqueue` abstraction of the Scheme implementation _Gauche_, this library not only supports `enqueue!` for adding items to the end of the queue and `dequeue!` for taking items from the front of the queue, but also `queue-push!` for putting items at the front of the queue. Therefore, _shared queues_ can also be used for use cases where stack semantics (LIFO) is needed.

**shared-queue-type-tag** <img class="kind" src="/img/const.png" alt="constant">

Symbol representing the `shared-queue` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all shared queue objects.

**(shared-queue?&#x20;**_**obj**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a shared queue object; `#f` otherwise.

**(make-shared-queue)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(make-shared-queue&#x20;**_**maxlen**_**)**\
**(make-shared-queue&#x20;**_**maxlen capacity**_**)**

Returns a new empty shared queue with maximum length _maxlen_ and a given initial _capacity_. If _maxlen_ is not provided, there is no maximum length and inserting an element never blocks.

**(shared-queue-copy&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns a copy of shared queue _sq_. The copy has the same maximum length like _sq_ and all elements currently in the queue are copied over.

**(list->shared-queue&#x20;**_**xs**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(list->shared-queue&#x20;**_**xs maxlen**_**)**\
**(list->shared-queue&#x20;**_**xs maxlen capacity**_**)**

Returns a new shared queue with maximum length _maxlen_ and a given initial _capacity_. The new queue contains the elements from list _xs_. If _maxlen_ is not provided, there is no maximum length and inserting an element never blocks.

**(shared-queue->list&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the elements currently in the shared queue _sq_ as a list. The elements remain in _sq_.

**(shared-queue-empty?&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if shared queue _sq_ does not have any items queued up; returns `#f` otherwise.

**(shared-queue-closed?&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if shared queue _sq_ has been closed, i.e. it does not allow to enqueue more items; returns `#f` otherwise.

**(shared-queue-max-length&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the maximum number of items the shared queue _sq_ can hold.

**(shared-queue-length&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of items in the shared queue _sq_.

**(shared-queue-room&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of items the shared queue _sq_ can accept at this moment to reach its maximum length. For example, if the shared queue has the maximum number of items already, 0 is returned.

**(shared-queue-num-waiting&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns two values: the first value is the number of threads waiting on the shared queue _sq_ to read at this moment; the second value is the number of threads waiting on _sq_ to write at this moment.

**(shared-queue-front&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(shared-queue-front&#x20;**_**sq default**_**)**

Returns the first item in the shared queue _sq_. This is the item that `shared-queue-dequeue!` would remove if called. `shared-queue-front` does not modify _sq_ itself. If _sq_ is empty, _default_ is returned if it is given, otherwise an error is signaled.

**(shared-queue-rear&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(shared-queue-rear&#x20;**_**sq default**_**)**

Returns the last item in the shared queue _sq_. `shared-queue-rear` does not modify _sq_ itself. If _sq_ is empty, _default_ is returned if it is given, otherwise an error is signaled.

**(shared-queue-enqueue!&#x20;**_**sq x ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Inserts the elements _x ..._ at the end of the shared queue _sq_ in the order they are given.

```scheme
(define sq (make-shared-queue))
(shared-queue-front sq #f)  ⇒  #f
(shared-queue-enqueue! sq 1)
(shared-queue-front sq #f)  ⇒  1
(shared-queue-enqueue! sq 2 3 4)
(shared-queue-front sq #f)  ⇒  1
(shared-queue->list sq)  ⇒  (1 2 3 4)
```

**(shared-queue-push!&#x20;**_**sq x ...**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Inserts the elements _x ..._ at the start of the shared queue _sq_ in the order they are given.

```scheme
(define sq (make-shared-queue))
(shared-queue-push! sq 1)
(shared-queue-front sq #f)  ⇒  1
(shared-queue-push! sq 2 3 4)
(shared-queue-front sq #f)  ⇒  4
(shared-queue->list sq)  ⇒  (4 3 2 1)
```

**(shared-queue-dequeue!&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(shared-queue-dequeue!&#x20;**_**sq default**_**)**

Returns and removes the first element of the shared queue _sq_. If the queue is empty, an error is signaled unless the _default_ parameter is provided. In this case, _default_ is returned.

**(shared-queue-pop!&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(shared-queue-pop!&#x20;**_**sq default**_**)**

Returns and removes the first element of the shared queue _sq_. If the queue is empty, an error is signaled unless the _default_ parameter is provided. In this case, _default_ is returned. This procedure is functionally equivalent with `shared-queue-dequeue!`. It is provided to help emphasizing that the queue is used like a stack together with `shared-queue-push!`.

**(shared-queue-dequeue-all!&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(shared-queue-dequeue-all!&#x20;**_**sq close?**_**)**

Removes all items from the shared queue _sq_ and returns them as a list. If argument _close?_ is provided and set to true, the shared queue _sq_ will be closed. The whole operation is done atomically.

**(shared-queue-enqueue/wait!&#x20;**_**sq x**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(shared-queue-enqueue/wait!&#x20;**_**sq x timeout**_**)**\
**(shared-queue-enqueue/wait!&#x20;**_**sq x timeout default**_**)**\
**(shared-queue-enqueue/wait!&#x20;**_**sq x timeout default close?**_**)**

Inserts the element _x_ at the end of the shared queue _sq_. This procedure blocks if _sq_ has reached its maximum length until _x_ was eventually inserted successfully. The optional _timeout_ argument specifies the maximum time to wait in seconds. If it is set to `\#f`, `shared-queue-enqueue/wait!` will wait indefinitely. In case the call is timing out, the value of _default_ is returned (`#f` is the default). If the operation succeeds without timing out, `#t` is returned. If _sq_ is already closed, `shared-queue-enqueue/wait!` raises an error without modifying _sq_. The whole check and insert operation is performed atomically.

If the last optional argument _close?_ is given and true, `shared-queue-enqueue/wait!` closes the shared queue _sq_. The close operation is done atomically and it is guaranteed that _x_ is the last item put into the queue.

**(shared-queue-push/wait!&#x20;**_**sq x**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(shared-queue-push/wait!&#x20;**_**sq x timeout**_**)**\
**(shared-queue-push/wait!&#x20;**_**sq x timeout default**_**)**\
**(shared-queue-push/wait!&#x20;**_**sq x timeout default close?**_**)**

Inserts the element _x_ at the start of the shared queue _sq_. This procedure blocks if _sq_ has reached its maximum length until _x_ was eventually inserted successfully. The optional _timeout_ argument specifies the maximum time to wait in seconds. If it is set to `\#f`, `shared-queue-push/wait!` will wait indefinitely. In case the call is timing out, the value of _default_ is returned (`#f` is the default). If the operation succeeds without timing out, `#t` is returned. If _sq_ is already closed, `shared-queue-push/wait!` raises an error without modifying _sq_. The whole check and insert operation is performed atomically.

If the last optional argument _close?_ is given and true, `shared-queue-push/wait!` closes the shared queue _sq_. The close operation is done atomically and it is guaranteed that _x_ is the last item put into the queue.

**(shared-queue-dequeue/wait!&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(shared-queue-dequeue/wait!&#x20;**_**sq timeout**_**)**\
**(shared-queue-dequeue/wait!&#x20;**_**sq timeout default**_**)**\
**(shared-queue-dequeue/wait!&#x20;**_**sq timeout default close?**_**)**

Returns and removes the first element of the shared queue _sq_ independent of the queue being closed. This procedure blocks if _sq_ is empty waiting until an item has been inserted and can successfully be dequeued. The optional _timeout_ argument specifies the maximum time to wait in seconds. If it is set to `\#f`, `shared-queue-dequeue/wait!` will wait indefinitely. In case the call is timing out, the value of _default_ is returned (`#f` is the default). If the operation succeeds without timing out, the dequeued item is returned. The whole check and dequeue operation is performed atomically.

If the last optional argument _close?_ is given and true, `shared-queue-dequeue/wait!` closes the shared queue _sq_.

**(shared-queue-pop/wait!&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(shared-queue-pop/wait!&#x20;**_**sq timeout**_**)**\
**(shared-queue-pop/wait!&#x20;**_**sq timeout default**_**)**\
**(shared-queue-pop/wait!&#x20;**_**sq timeout default close?**_**)**

This procedure is functionally equivalent with `shared-queue-dequeue/wait!`. It is provided to help emphasizing that the queue is used like a stack together with `shared-queue-push/wait!`.

**(shared-queue-close!&#x20;**_**sq**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(shared-queue-close!&#x20;**_**sq force?**_**)**

Closes the shared queue _sq_. As a consequence, no new items can be inserted. It is still possible to dequeue items until the queue is empty. If argument _force?_ is provided and set to true, then even dequeuing is not possible anymore and attempts to do that result in errors to be signaled.
