---
sidebar_position: 720
---

# (lispkit system pasteboard)

Library `(lispkit system pasteboard)` provides a simple API for interfacing with the system pasteboard. The type of content copied to the pasteboard or pasted from it is described with lists of [_uniform type identifiers_](https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html#//apple_ref/doc/uid/TP40009259-SW1).

**(pasteboard-change-count)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns a change count number. Changes to this number reflect state changes to the system pasteboard.

**(pasteboard-empty?)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if the system pasteboard is empty; `#f` otherwise.

**(pasteboard-contains?&#x20;**_**type**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if the pasteboard contains an entry and this entry is of the given _type_. _type_ is either a string or a list of strings. Each string is a uniform type identifier (UTI) such as `public.data`, `public.plain-text`, `public.utf8-plain-text`, `public.rtf`, `public.html`, `public.url`, `public.file-url`, `public.image`, `public.png`, `public.jpeg`, etc.

**(pasteboard-types)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns a list of strings describing the type of content available in the system pasteboard. Each type is a string containing a uniform type identifier (UTI) such as `public.data`, `public.plain-text`, `public.utf8-plain-text`, `public.rtf`, `public.html`, `public.url`, `public.file-url`, `public.image`, `public.png`, `public.jpeg`, etc. An empty list is returned when the pasteboard is empty.

**(pasteboard-ref)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns a value representing the content in the pasteboard. `#f` is returned if the pasteboard is empty. Values of the following data types are being returned: images, colors, styled text, strings, and bytevectors.

**(pasteboard-ref-string)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(pasteboard-ref-string&#x20;**_**type**_**)**

Returns a string representation of the content in the pasteboard for the given _type_. `#f` is returned if the pasteboard is empty. _type_ is a uniform type identifier (UTI) such as `public.data`, `public.plain-text`, `public.utf8-plain-text`, `public.rtf`, `public.html`, `public.url`, `public.file-url`, `public.image`, `public.png`, `public.jpeg`, etc. If _type_ is not provided, `public.plain-text` is used as a default.

**(pasteboard-ref-data)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(pasteboard-ref-data&#x20;**_**type**_**)**

Returns a string representation of the content in the pasteboard for the given _type_. `#f` is returned if the pasteboard is empty. _type_ is a uniform type identifier (UTI) such as `public.data`, `public.plain-text`, `public.utf8-plain-text`, `public.rtf`, `public.html`, `public.url`, `public.file-url`, `public.image`, `public.png`, `public.jpeg`, etc. If _type_ is not provided, `public.plain-text` is used as a default.

**(pasteboard-set!&#x20;**_**expr**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(pasteboard-set!&#x20;**_**expr type**_**)**\
**(pasteboard-set!&#x20;**_**expr type local**_**)**\
**(pasteboard-set!&#x20;**_**expr type local expiry**_**)**

Copies _expr_ into the pasteboard, delaring it to be of the given _type_. _type_ is a uniform type identifier (UTI) such as `public.data`, `public.plain-text`, `public.utf8-plain-text`, `public.rtf`, `public.html`, `public.url`, `public.file-url`, `public.image`, `public.png`, `public.jpeg`, etc. _local_ is a boolean, indicating whether to keep the pasteboard content local to the device or allow it to be published to other devices. _expiry_ is a date at which the pasteboard is automatically cleared. It is `#f` by default and only supported on iOS.

**(pasteboard-clear!)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns a value representing the content in the pasteboard. `#f` is returned if the pasteboard is empty. Values of the following data types are being returned: images, colors, styled text, strings, and bytevectors.
