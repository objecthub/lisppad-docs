---
sidebar_position: 250
---

# (lispkit draw turtle)

Library `(lispkit draw turtle)` defines a simple "turtle graphics" API. The API provides functionality for creating turtles and for moving turtles on a plane generating _drawings_ as a side-effect. A _drawing_ is a data structure defined by library `(lispkit draw)`.

A _turtle_ is defined in terms of the following components:

* A position _(x, y)_ defining the coordinates where the turtle is currently located within a coordinate system defined by parameters used to create the turtle via `make-turtle`
* A heading _angle_ which defines the direction in degrees into which the turtle is moving
* A boolean flag _pen down_ which, if set to `#t`, will make the turtle draw lines on the graphics plane when moving.
* A _line width_ defining the width of lines drawn by the turtle
* A _color_ defining the color of lines drawn by the turtle
* A _drawing_ which records the moves of the turtle while the pen is down.

Turtles are mutable objects created via `make-turtle`. The functions listed below change the state of a turtle. In particular, they generate a drawing as a side-effect which can be accessed via `turtle-drawing`. For most functions, the turtle is an optional argument. If it is not provided, the function applies to the turtle provided by the `current-turtle` parammeter object.

**current-turtle**    <img class="kind" src="/img/param.png" alt="parameter">

Defines the _current turtle_, which is used as a default by all functions for which the turtle argument is optional. If there is no current turtle, this parameter is set to `#f`.

**(turtle?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a turtle. Otherwise, it returns `#f`.

**(make-turtle&#x20;**_**x y scale**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new turtle object. _x_ and _y_ determine the "home point" of the turtle. This is equivalent to the zero point of the coordinate system in which the turtle navigates. _scale_ is a scaling factor.

**(turtle-drawing&#x20;**_**turtle**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the drawing associated with the given _turtle_.

**(turtle-x&#x20;**_**turtle**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the x coordinate of the position of the given _turtle_.

**(turtle-y&#x20;**_**turtle**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the y coordinate of the position of the given _turtle_.

**(turtle-angle&#x20;**_**turtle**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the current angle of the given _turtle_. As opposed to the angles passed to `heading`, `turn`, `left`, `right`, and `arc`, which are expressed in degrees, the result is expressed in radians.

**(turtle-pen-down?&#x20;**_**turtle**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if the given _turtle_ has its pen down; otherwise `#f` is returned.

**(pen-up)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(pen-up&#x20;**_**turtle**_**)**

Lifts _turtle_ from the plane. If _turtle_ is not provided, the turtle defined by `current-turtle` is used. Subsequent `forward` and `backward` operations don't lead to lines being drawn. Only the current coordinates are getting updated.

**(pen-down)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(pen-down&#x20;**_**turtle**_**)**

Drops _turtle_ onto the plane. If _turtle_ is not provided, the turtle defined by `current-turtle` is used. Subsequent `forward` and `backward` operations will lead to lines being drawn.

**(pen-color&#x20;**_**color**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(pen-color&#x20;**_**color turtle**_**)**

Sets the drawing color of _turtle_ to _color_. If _turtle_ is not provided, the turtle defined by `current-turtle` is used. _color_ is a color object as defined by library `(lispkit draw)`.

**(pen-size&#x20;**_**size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(pen-size&#x20;**_**size turtle**_**)**

Sets the pen size of _turtle_ to _size_. If _turtle_ is not provided, the turtle defined by `current-turtle` is used. The pen size corresponds to the width of lines drawn by `forward` and `backward`.

**(home)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(home&#x20;**_**turtle**_**)**

Moves _turtle_ to its home position. If _turtle_ is not provided, the turtle defined by `current-turtle` is used.

**(move&#x20;**_**x y**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(move&#x20;**_**x y turtle**_**)**

Moves _turtle_ to the position described by the coordinates _x_ and _y_. If _turtle_ is not provided, the turtle defined by `current-turtle` is used.

**(heading&#x20;**_**angle**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(heading&#x20;**_**angle turtle**_**)**

Sets the heading of _turtle_ to _angle_. If _turtle_ is not provided, the turtle defined by `current-turtle` is used. _angle_ is expressed in terms of degrees.

**(turn&#x20;**_**angle**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(turn&#x20;**_**angle turtle**_**)**

Adjusts the heading of _turtle_ by _angle_ degrees. If _turtle_ is not provided, the turtle defined by `current-turtle` is used.

**(right&#x20;**_**angle**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(right&#x20;**_**angle turtle**_**)**

Adjusts the heading of _turtle_ by _angle_ degrees. If _turtle_ is not provided, the turtle defined by `current-turtle` is used.

**(left&#x20;**_**angle**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(left&#x20;**_**angle turtle**_**)**

Adjusts the heading of _turtle_ by _-angle_ degrees. If _turtle_ is not provided, the turtle defined by `current-turtle` is used.

**(forward&#x20;**_**distance**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(forward&#x20;**_**distance turtle**_**)**

Moves _turtle_ forward by _distance_ units drawing a line if the pen is down. If _turtle_ is not provided, the turtle defined by `current-turtle` is used.

**(backward&#x20;**_**distance**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(backward&#x20;**_**distance turtle**_**)**

Moves _turtle_ backward by _distance_ units drawing a line if the pen is down. If _turtle_ is not provided, the turtle defined by `current-turtle` is used.

**(arc&#x20;**_**angle radius**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(arc&#x20;**_**angle radius turtle**_**)**

Turns the turtle by the given _angle_ (in degrees) and draws an arc with _radius_ around the current turtle position if the pen is down. If _turtle_ is not provided, the turtle defined by `current-turtle` is used.
