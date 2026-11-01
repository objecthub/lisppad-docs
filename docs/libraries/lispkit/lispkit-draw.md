---
sidebar_position: 190
---

# (lispkit draw)

Library `(lispkit draw)` provides an API for creating _drawings_. A drawing is defined in terms of a sequence of instructions for drawing _shapes_ and _images_. Drawings can be composed and saved as a PDF. It is also possible to draw a drawing into a _bitmap_ and save it in formats like PNG, JPG, or TIFF. A _bitmap_ is a special _image_ that is not based on vector graphics.

Both drawings and shapes are based on a coordinate system whose zero point is in the upper left corner of a plane. The x and y axis extend to the right and down. Coordinates and dimensions are always expressed in terms of floating-point numbers.

## Drawings

Drawings are mutable objects created via `make-drawing`. The functions listed in this section change the state of a drawing object and they persist drawing instructions defining the drawing. For most functions, the drawing is an optional argument. If it is not provided, the function applies to the drawing provided by the `current-drawing` parammeter object.

**drawing-type-tag** <img class="kind" src="/img/obj.png" alt="object">

Symbol representing the `drawing` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all drawing objects.

**current-drawing**    <img class="kind" src="/img/param.png" alt="parameter">

Defines the _current drawing_, which is used as a default by all functions for which the drawing argument is optional. If there is no current drawing, this parameter is set to `#f`.

**(drawing?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a drawing. Otherwise, it returns `#f`.

**(make-drawing)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new, empty drawing. A drawing consists of a sequence of drawing instructions and drawing state consisting of the following components:

* Stroke color (set via `set-color`)
* Fill color (set via `fill-color`)
* Shadow (set via `set-shadow` and `remove-shadow`)
* Transformation (add transformation via `enable-transformation` and remove via `disable-transformation`)

**(copy-drawing&#x20;**_**drawing**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a copy of the given _drawing_.

**(clear-drawing&#x20;**_**drawing**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Clears the given _drawing_.

**(set-color&#x20;**_**color**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-color&#x20;**_**color drawing**_**)**

Sets the _stroke color_ for the given drawing, or `current-drawing` if the drawing argument is not provided.

**(set-fill-color&#x20;**_**color**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-fill-color&#x20;**_**color drawing**_**)**

Sets the _fill color_ for the given drawing, or `current-drawing` if the drawing argument is not provided.

**(set-line-width&#x20;**_**width**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-line-width&#x20;**_**width drawing**_**)**

Sets the default _stroke width_ for the given drawing, or `current-drawing` if the drawing argument is not provided.

**(set-shadow&#x20;**_**color size blur-radius**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-shadow&#x20;**_**color size blur-radius drawing**_**)**

Defines a shadow for the given drawing, or `current-drawing` if the drawing argument is not provided. _color_ is the color of the shade, _blur-radius_ defines the radius for bluring the shadow.

**(remove-shadow)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(remove-shadow&#x20;**_**drawing**_**)**

Removes shadow for the subsequent drawing instructions of the given drawing, or `current-drawing` if the drawing argument is missing.

**(enable-transformation&#x20;**_**tf**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(enable-transformation&#x20;**_**tf drawing**_**)**

Enables the transformation _tf_ for subsequent drawing instructions of the given drawing, or `current-drawing` if the drawing argument is missing. Each drawing maintains an active affine transformation for shifting, rotating, and scaling the coordinate systems of subsequent drawing instructions.

**(disable-transformation&#x20;**_**tf**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(disable-transformation&#x20;**_**tf drawing**_**)**

Disables the transformation _tf_ for subsequent drawing instructions of the given drawing, or `current-drawing` if the drawing argument is missing.

**(draw&#x20;**_**shape**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(draw&#x20;**_**shape width**_**)**\
**(draw&#x20;**_**shape width drawing**_**)**

Draws _shape_ with a given stroke _width_ into the drawing specified via _drawing_ or parameter object `current-drawing` if _drawing_ is not provided. The default for _width_, in case it is not provided, is set via _set-line-width_. The stroke is drawn in the current stroke color of the drawing.

**(draw-dashed&#x20;**_**shape lengths phase**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(draw-dashed&#x20;**_**shape lengths phase width**_**)**\
**(draw-dashed&#x20;**_**shape lengths phase width drawing**_**)**

Draws _shape_ with a dashed stroke of width _width_ into the drawing specified via _drawing_ or parameter object `current-drawing` if _drawing_ is not provided. `1.0` is the default for _width_ in case it is not provided. _lengths_ specifies an alternating list of dash/space lengths. _phase_ determines the start of the dash/space pattern. The dashed stroke is drawn in the current stroke color of the drawing.

**(fill&#x20;**_**shape**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fill&#x20;**_**shape drawing**_**)**

Fills _shape_ with the current _fill color_ in the drawing specified via _drawing_ or parameter object `current-drawing` if _drawing_ is not provided.

**(fill-gradient&#x20;**_**shape colors**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fill-gradient&#x20;**_**shape colors spec**_**)**\
**(fill-gradient&#x20;**_**shape colors spec drawing**_**)**

Fills _shape_ with a gradient in the drawing specified via argument _drawing_ or parameter object `current-drawing` if _drawing_ is not provided. The gradient is specified in terms of a list of _colors_ and argument _spec_. _spec_ can either be a number or a point. If _spec_ is a number, this number determines an angle for a linear gradient. If _spec_ is a point, it is the center of a radial gradient.

**(draw-line&#x20;**_**start end**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(draw-line&#x20;**_**start end drawing**_**)**

Draws a line between point _start_ and point _end_ in the drawing specified via argument _drawing_ or parameter object `current-drawing`, if _drawing_ is not provided. The line is drawn in the default _stroke width_ and the current _stroke color_.

**(draw-rect&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(draw-rect&#x20;**_**rect drawing**_**)**

Draws a rectangular given by _rect_ in the drawing specified via argument _drawing_ or parameter object `current-drawing`, if _drawing_ is not provided. The rectangular is drawn in the default _stroke width_ and the current _stroke color_.

**(fill-rect&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fill-rect&#x20;**_**rect drawing**_**)**

Fills a rectangular given by _rect_ with the current _fill color_ in the drawing specified via argument _drawing_ or parameter object `current-drawing`, if _drawing_ is not provided.

**(draw-ellipse&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(draw-ellipse&#x20;**_**rect drawing**_**)**

Draws an ellipse into the rectangular _rect_ in the drawing specified via argument _drawing_ or parameter object `current-drawing`, if _drawing_ is not provided. The ellipse is drawn in the default _stroke width_ and the current _stroke color_.

**(fill-ellipse&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(fill-ellipse&#x20;**_**rect drawing**_**)**

Fills an ellipse given by rectangular _rect_ with the current _fill color_ in the drawing specified via argument _drawing_ or parameter object `current-drawing`, if _drawing_ is not provided.

**(draw-text&#x20;**_**str location font**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(draw-text&#x20;**_**str location font color**_**)**\
**(draw-text&#x20;**_**str location font color drawing**_**)**

Draws string _str_ at _location_ in the given font and color in the drawing specified by argument _drawing_ or parameter object `current-drawing` if _drawing_ is not provided. _location_ is either the left, top-most point at which the string is drawn, or it is a rect specifying a bounding box. _color_ specifies the text color. If it is not provided, the text is drawn in black.

**(text-size&#x20;**_**str**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(text-size&#x20;**_**str font**_**)**\
**(text-size&#x20;**_**str font dimensions**_**)**

Returns a size object describing the width and height needed to draw string _str_ using _font_ in a space constrained by _dimensions_. _dimensions_ is either a size object specifying the maximum width and height, or it is a number constraining the width only, assuming infinite hight. If _dimensions_ is omitted, the maximum width and height is infinity.

**(draw-styled-text&#x20;**_**txt location**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(draw-styled-text&#x20;**_**txt location drawing**_**)**

Draws styled text _txt_ at _location_ in the drawing specified by argument _drawing_ or parameter object `current-drawing` if _drawing_ is not provided. _location_ is either the left, top-most point at which the styled text is drawn, or it is a rect specifying a bounding box.

**(styled-text-size&#x20;**_**txt**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(styled-text-size&#x20;**_**txt dimensions**_**)**

Returns a size object describing the width and height needed to draw styled text _txt_ in a space constrained by _dimensions_. _dimensions_ is either a size object specifying the maximum width and height, or it is a number constraining the width only, assuming infinite hight. If _dimensions_ is omitted, the maximum width and height is infinity.

**(draw-html&#x20;**_**html location**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(draw-html&#x20;**_**html location drawing**_**)**

Draws a string _html_ containing HTML source code at _location_ in the drawing specified by argument _drawing_ or parameter object `current-drawing` if _drawing_ is not provided. _location_ is either the left, top-most point at which the HTML is drawn, or it is a rect specifying a bounding box.

**(html-size&#x20;**_**html**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(html-size&#x20;**_**html dimensions**_**)**

Returns a size object describing the width and height needed to render the HTML in string _html_ in a space constrained by _dimensions_. _dimensions_ is either a size object specifying the maximum width and height, or it is a number constraining the width only, assuming infinite hight. If _dimensions_ is omitted, the maximum width and height is infinity.

**(draw-image&#x20;**_**image location**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(draw-image&#x20;**_**image location opacity**_**)**\
**(draw-image&#x20;**_**image location opacity composition**_**)**\
**(draw-image&#x20;**_**image location opacity composition drawing**_**)**

Draws image _image_ at _location_ with the given _opacity_ and _composition_ method. The image is drawn in the drawing specified by argument _drawing_ or parameter object `current-drawing` if _drawing_ is not provided. _location_ is either the left, top-most point at which the image is drawn, or it is a rect specifying a bounding box for the image. _composition_ is a floating-point number between 0.0 (= transparent) and 1.0 (= completely not transparent) with 1.0 being the default. _composition_ refers to a symbol specifying a composition method. The following methods are supported (the source is the image, the destination is the drawing):

* `clear`: Transparency everywhere.
* `copy`: The source image (default).
* `multiply`: The source color is multiplied by the destination color.
* `overlay`: Source colors overlay the destination.
* `source-over`: The source image wherever it is opaque, and the destination elsewhere.
* `source-in`: The source image wherever both images are opaque, and transparent elsewhere.
* `source-out`: The source image wherever it is opaque and the destination is transparent, and transparent elsewhere.
* `source-atop`: The source image wherever both source and destination are opaque, the destination wherever it is opaque but the source image is transparent, and transparent elsewhere.
* `destination-over`: The destination wherever it is opaque, and the source image elsewhere.
* `destination-in`: The destination wherever both images are opaque, and transparent elsewhere.
* `destination-out`: The destination wherever it is opaque and the source image is transparent, and transparent elsewhere.
* `destination-atop`: The destination wherever both image and destination are opaque, the source image wherever it is opaque and the destination is transparent, and transparent elsehwere.

**(draw-drawing&#x20;**_**other**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(draw-drawing&#x20;**_**other drawing**_**)**

Draws drawing _other_ into the drawing specified by argument _drawing_ or parameter object `current-drawing` if _drawing_ is not provided. This function can be used to compose drawings.

**(clip-drawing&#x20;**_**other clippingshape**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(clip-drawing&#x20;**_**other clippingshape drawing**_**)**

Draws drawing _other_ into the drawing specified by argument _drawing_ or parameter object `current-drawing` if _drawing_ is not provided. This function clips the drawing using shape _clippingshape_; i.e. only parts within _clippingshape_ are drawn.

**(inline-drawing&#x20;**_**other**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(inline-drawing&#x20;**_**other drawing**_**)**

Draws drawing _other_ into the drawing specified by argument _drawing_ or parameter object `current-drawing` if _drawing_ is not provided. This function can be used to compose drawings in a way such that the drawing instructions from _other_ are inlined into _drawing_.

**(save-drawing&#x20;**_**path drawing size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(save-drawing&#x20;**_**path drawing size title**_**)**\
**(save-drawing&#x20;**_**path drawing size title author**_**)**

Saves _drawing_ into a PDF file at the given filepath _path_. _size_ is a size specifying the width and height of the PDF page containing the drawing in points; i.e. the media box of the page is `(rect zero-point` _size_`)`. _title_ and _author_ are optional strings defining the title and author metadata for the generated PDF file.

**(save-drawings&#x20;**_**path pages**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(save-drawings&#x20;**_**path pages title**_**)**\
**(save-drawings&#x20;**_**path pages title author**_**)**

Saves a list of pages into a PDF file at the given filepath _path_. A page is defined in terms of a list of two elements (_drawing_ _size_), where _drawing_ is a drawing for that page and _size_ is a media box for the page. _title_ and _author_ are optional strings defining the title and author metadata for the generated PDF file.

**(drawing&#x20;**_**body ...**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">

Creates a new empty drawing, binds parameter object `current-drawing` to it and executes the body statements in the dynamic scope of this binding. This special form returns the new drawing.

**(with-drawing&#x20;**_**drawing body ...**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">

Binds parameter object `current-drawing` to _drawing_ and executes the body statements in the dynamic scope of this binding. This special form returns the result of the last statement in the body.

**(transform&#x20;**_**tf body ...**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">

This form is used in the context of drawing into `current-drawing`. It enables the transformation _tf_, executes the statements in the body and disables the transformation again.

## Shapes

Shapes are mutable objects created via a number of constructors, including `make-shape`, `copy-shape`, `line`, `polygon`, `rectangular`, `circle`, `oval`, `arc`, and `glyphs`. Besides the constructors, functions like `move-to`, `line-to` and `curve-to` are used to extend a shape. For those functions, the affected shape is an optional argument. If it is not provided, the function applies to the shape defined by the `current-shape` parammeter object.

**shape-type-tag** <img class="kind" src="/img/obj.png" alt="object">

Symbol representing the `shape` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all shape objects.

**current-shape** <img class="kind" src="/img/param.png" alt="parameter">

Defines the _current shape_, which is used as a default by all functions for which the shape argument is optional. If there is no current shape, this parameter is set to `#f`.

**(shape?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a shape. Otherwise, it returns `#f`.

**(make-shape)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(make-shape&#x20;**_**prototype**_**)**\
**(make-shape&#x20;**_**prototype freeze?**_**)**

Returns a new shape object. If argument _prototype_ is provided, the new shape object will inherit from shape _prototype_; i.e. the new shape's definition will extend the definition of shape _prototype_. If _freeze?_ is provided and set to true, if will create a copy of _prototype_ and make the new shape inherit from the copy. In this case, the returned shape has no dependency on _prototype_, i.e. further changes to _prototype_ are ignored.

**(copy-shape&#x20;**_**shape**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a copy of _shape_.

**(line&#x20;**_**start end**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Retuns a new line shape. _start_ and _end_ are the start and end points of the line.

**(polygon&#x20;**_**point ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new polygon shape. The polygon is defined in terms of a sequence of points.

**(closed-polygon&#x20;**_**point ...**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new closed polygon shape. The polygon is defined in terms of a sequence of points and automatically closes by connecting the last point to the first.

**(rectangle&#x20;**_**point size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(rectangle&#x20;**_**point size radius**_**)**\
**(rectangle&#x20;**_**point size xradius yradius**_**)**

Returns a new rectangular shape. The rectangle is defined in terms of the left, topmost point and a _size_ defining both width and height of the rectangle. The optional _radius_, _xradius_ and _yradius_ arguments are used to create a rounded rectangular whose rounded edges are defined in terms of an x and y-radius. If only one radius is provided, it defines both x and y-radius.

**(circle&#x20;**_**point radius**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new circle shape. The circle is defined in terms of a center point and a radius.

**(oval&#x20;**_**point size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new oval shape. The oval is defined in terms of a rectangle whose left, topmost point is provided as argument _point_, and whose width and height are given via argument _size_.

**(arc&#x20;**_**point radius start end**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(arc&#x20;**_**point radius start end clockwise**_**)**

Returns a new arc shape. The arc is defined via the arguments _point_, _radius_, _start_ , _end_ and optionally _clockwise_. _point_ is the starting point of the arc, _radius_ defines the radius of the arc, _start_ is a starting angle in radians, and _end_ is the end angle in radians. _clockwise_ is a boolean argument defining whether the arc is drawn clockwise or counter-clockwise. The default is `#t`.

**(glyphs&#x20;**_**str point size font**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new "glyphs" shape. This is a shape defined by a string _str_ rendered in the given size and font at a given point. _font_ is a font object, _size_ is the font size in points, and _point_ are the start coordinates where the glyphs are drawn.

**(move-shape&#x20;**_**shape dx**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(move-shape&#x20;**_**shape dx dy**_**)**

Returns a new shape by translating _shape_ by _dx_ horizontally and _dy_ vertically. If _dy_ is not provided, the shape is moved by _dx_ in both directions.

**(scale-shape&#x20;**_**shape sx**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(scale-shape&#x20;**_**shape sx sy**_**)**

Returns a new shape by scaling _shape_ by factor _sx_ horizontally and _sy_ vertically. If _sy_ is not provided, the shape is scaled uniformly by _sx_ in both directions.

**(transform-shape&#x20;**_**shape tf**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new shape derived from _shape_ by applying transformation _tf_.

**(flip-shape&#x20;**_**shape**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(flip-shape&#x20;**_**shape box**_**)**\
**(flip-shape&#x20;**_**shape box orientation**_**)**

Returns a new shape by flipping/mirroring _shape_ within _box_. _box_ is a rect. If it is not provided, the bounding box of _shape_ is used as a default. Argument _orientation_ is a symbol defining along which axis the shape is flipped. Supported are `horizontal`, `vertical`, and `mirror`. Default is `vertical`.

**(interpolate&#x20;**_**points**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(interpolate&#x20;**_**points closed**_**)**\
**(interpolate&#x20;**_**points closed alpha**_**)**\
**(interpolate&#x20;**_**points closed alpha method**_**)**

Returns a shape interpolating a list of points. _closed_ is an optional boolean argument specifying whether the shape is closed. The default for _closed_ is `#f`. _alpha_ is an interpolation parameter in the range \[0.0,1.0]; default is 0.33. _method_ specifies the interpolation method via a symbol. The following two methods are supported: `hermite` and `catmull-rom`; default is `hermite`.

**(move-to&#x20;**_**point**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">\
**(move-to&#x20;**_**point shape**_**)**

Sets the "current point" to _point_ for the shape specified by argument _shape_ or parameter object `current-shape` if _shape_ is not provided.

**(line-to&#x20;**_**point ...**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">\
**(line-to&#x20;**_**point ... shape**_**)**

Creates a line from the "current point" to _point_ for the shape specified by argument _shape_ or parameter object `current-shape` if _shape_ is not provided. _point_ becomes the new "current point".

**(curve-to&#x20;**_**point cntrl1 cntrl2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(curve-to&#x20;**_**point cntrl1 cntrl2 shape**_**)**

Creates a curve from the "current point" to _point_ for the shape specified by argument _shape_ or parameter object `current-shape` if _shape_ is not provided. _cntrl1_ and _cntrl2_ are control points defining tangets shaping the curve at the start and end points.

**(relative-move-to&#x20;**_**point**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(relative-move-to&#x20;**_**point shape**_**)**

This function is equivalent to `move-to` with the exception that _point_ is relative to the "current point".

**(relative-line-to&#x20;**_**point ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(relative-line-to&#x20;**_**point ... shape**_**)**

This function is equivalent to `line-to` with the exception that _point_ is relative to the "current point".

**(relative-curve-to&#x20;**_**point cntrl1 cntrl2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(relative-curve-to&#x20;**_**point cntrl1 cntrl2 shape**_**)**

This function is equivalent to `curve-to` with the exception that _point_, _cntrl1_ and _cntrl2_ are relative to the "current point".

**(add-shape&#x20;**_**other**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(add-shape&#x20;**_**other shape**_**)**

Adds shape _other_ to the shape specified by argument _shape_ or parameter object `current-shape` if _shape_ is not provided. This function is typically used to compose shapes.

**(shape-bounds&#x20;**_**shape**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the bounding box for the given shape as a rect.

**(shape-contains?&#x20;**_**shape point**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(shape-contains?&#x20;**_**shape points**_**)**\
**(shape-contains?&#x20;**_**shape points some?**_**)**

Returns `#t` if _shape_ contains the given _point_ or _points_. _point_ is a single point, or _points_ is a list of points. If _some?_ is `#f` (the default), all points must be contained in the shape. If _some?_ is `#t`, returns `#t` if at least one point is contained in the shape.

**(shape&#x20;**_**body ...**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">

Creates a new empty shape, binds parameter object `current-shape` to it and executes the body statements in the dynamic scope of this binding. This special form returns the new drawing.

**(with-shape&#x20;**_**shape body ...**_**)** <img class="kind" src="/img/syntax.png" alt="syntax">

Binds parameter object `current-shape` to _shape_ and executes the body statements in the dynamic scope of this binding. This special form returns the result of the last statement in the body.

## Images

Images are objects representing immutable pictures of mutable size and metadata. Images are either loaded from image files or they are created from drawings. Images are either vector-based or bitmap-based. The current image API only allows loading vector-based images from PDF files. Bitmap-based images, on the other hand, can be loaded from PNG, JPG, GIF, etc. image files or they are created by drawing a drawing object into an empty bitmap. Bitmap-based images optionally have mutable EXIF data.

**image-type-tag** <img class="kind" src="/img/obj.png" alt="object">

Symbol representing the `image` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all image objects.

**(image?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is an image. Otherwise, it returns `#f`.

**(load-image&#x20;**_**path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Loads an image from the file at _path_ and returns the corresponding image object.

**(load-image-asset&#x20;**_**path type**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(load-image-asset&#x20;**_**path type dir**_**)**

Loads an image from the file at the given relative file _path_ and returns the corresponding image object. _type_ refers to the default suffix of the file to load (e.g. `"png"` for PNG images).

`load-image-asset` constructs a relative file path in the following way (assuming _path_ does not have a suffix already):

&#x20;  _dir/path.type_

where _dir_ is `"Images"` if it is not provided as a parameter. It then searches the asset paths in their given order for a file matching this relative file path. Once the first matching file is found, the file is loaded as an image file and the image gets returned by `load-image-asset`. It is an error if no matching image was found.

**(mermaid->image&#x20;**_**source**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(mermaid->image&#x20;**_**source config**_**)**

Draws the diagram described by the string _source_ in the [Mermaid](https://mermaid.js.org) syntax and returns it as an image on a transparent background. Drawn diagrams are cached. An error is signaled if Mermaid rejects the diagram, if drawing it takes longer than the timeout, or if the image cannot be created. _config_ is an optional association list with symbol keys that configure the diagram; defaults are in parentheses:

* `theme`: Mermaid theme, one of `default`, `neutral`, `dark`, `forest`, and `base` (`default`); diagrams are drawn on a transparent background, so use `dark` for dark backgrounds
* `theme-variables`: association list overriding variables of the theme, e.g. `((primaryColor . "#ffcc00"))`; names are symbols or strings, values are strings (`()`)
* `font-family`: font family of the text in the diagram, or `#f` for the font of Mermaid's theme (`#f`)
* `scale`: factor by which the resolution of the image is higher than its size in points (`2`)
* `width`: width in points of the page that the diagram is laid out on; wider diagrams are scaled down (`800`)
* `margin`: margin in points around the diagram; `#f` keeps the margins that Mermaid adds, which depend on the diagram type (`8`)
* `timeout`: maximum time in seconds for drawing the diagram (`5`)

The keys `max-width` and `spacing` are accepted, too, but they have no effect on the image.

```scheme
(define diagram
  (mermaid->image "graph LR\n  A[Start] --> B{Choice}\n  B -->|yes| C[Done]"
                  '((theme . forest) (scale . 3))))
(save-bitmap "diagram.png" diagram 'png)
```

**(latex-math->image&#x20;**_**tex**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(latex-math->image&#x20;**_**tex display?**_**)**\
**(latex-math->image&#x20;**_**tex display? size**_**)**\
**(latex-math->image&#x20;**_**tex display? size color**_**)**\
**(latex-math->image&#x20;**_**tex display? size color config**_**)**

Typesets the LaTeX formula _tex_, a string without dollar signs, with [KaTeX](https://katex.org) and returns it as an image on a transparent background. The formula is drawn by a headless web view using the KaTeX resources that come with LispKit, so no network connection is needed. Drawn formulas are cached. An error is signaled if KaTeX rejects the formula (the message of KaTeX is part of the error), if it is too long, if drawing it takes longer than the timeout, or if the image cannot be created. All arguments except _tex_ are optional, and `#f` selects the default:

* _display?_ is `#t` for display math, which is centered and uses larger operators, and `#f` for a formula within a line of text (`#f`).
* _size_ is the font size in points, between 1 and 1000, of the text that the formula is meant to be shown in. It determines the size of the image (`14`).
* _color_ is the color of the formula, a color object (black).
* _config_ is an association list with symbol keys; defaults are in parentheses:
  * `scale`: factor by which the resolution of the image is higher than its size in points (`3`)
  * `macros`: association list defining commands which formulas can use; names (e.g. `"\\half"`) and expansions (e.g. `"\\frac{1}{2}"`) are strings, and names can also be symbols (`()`)
  * `max-expand`: maximum number of macro expansions in a formula (`1000`)
  * `max-size`: maximum size in `em` that a formula can specify, e.g. for `\rule`, or `#f` for no limit (`#f`)
  * `min-rule-thickness`: minimum thickness in `em` of fraction lines and similar items, or `#f` for the default of KaTeX (`#f`)
  * `max-length`: maximum length of the formula in bytes (`10000`)
  * `timeout`: maximum time in seconds for drawing the formula; 0 means no limit (`15`)

The keys `max-width` and `spacing` are accepted, too, but they are not used.

```scheme
(define formula
  (latex-math->image "\\int_0^1 x^2\\,dx = \\frac{1}{3}" #t 24 (color 0.8 0.1 0.1)))
(image-size formula)
  ⇒  (178.0 . 78.0)
```

**(bytevector->image&#x20;**_**bvec**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(bytevector->image&#x20;**_**bvec start**_**)**\
**(bytevector->image&#x20;**_**bvec start end**_**)**

Loads an image from the binary data provided by bytevector _bvec_ between positions _start_ and _end_ and returns the corresponding image object.

**(image->bytevector&#x20;**_**image format**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(image->bytevector&#x20;**_**image format quality**_**)**

Returns a bytevector containing the encoded image data for _image_ in the specified _format_. _format_ is a symbol specifying the image format (e.g., `png`, `jpg`, `gif`, `bmp`, `tiff`, or `pdf`). _quality_ is an optional floating-point number between 0.0 and 1.0 specifying the compression quality for formats that support it (e.g., JPEG). Returns `#f` if the conversion fails.

**(save-image&#x20;**_**path image format**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(save-image&#x20;**_**path image format quality**_**)**

Saves _image_ to a file at the given filepath _path_ in the specified _format_. _format_ is a symbol specifying the image format (e.g., `png`, `jpg`, `gif`, `bmp`, `tiff`, or `pdf`). _quality_ is an optional floating-point number between 0.0 and 1.0 specifying the compression quality for formats that support it (e.g., JPEG). Returns `#t` if successful, `#f` otherwise.

**(image-size&#x20;**_**image**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the size of the given image object in points.

**(set-image-size!&#x20;**_**image size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Sets the size of _image_ to _size_, a size in points.

**(bitmap?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a bitmap-based image. Otherwise, it returns `#f`.

**(bitmap-size&#x20;**_**bmap**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the size of the bitmap _bmap_ in points. If _bmap_ is not a bitmap object, `bitmap-size` returns `#f`.

**(bitmap-pixels&#x20;**_**bmap**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of horizontal and vertical pixels of the bitmap _bmap_ as a size. If _bmap_ is not a bitmap object, `bitmap-size` returns `#f`.

**(bitmap-ppi&#x20;**_**bmap**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the pixels per inch (PPI) resolution of the bitmap _bmap_. This is calculated from the pixel dimensions and the size in points. If _bmap_ is not a bitmap object or the PPI cannot be determined, returns `#f`.

**(bitmap-exif-data&#x20;**_**bmap**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the EXIF metadata associated with bitmap _bmap_. EXIF metadata is represented as an association list in which symbols are used as keys.

```scheme
> (define photo (load-image (asset-file-path "Regensberg" "jpeg" "Images")))
> (bitmap-exif-data photo)
((ExposureBiasValue . 0)
 (CustomRendered . 6)
 (SensingMethod . 2)
 (SubsecTimeOriginal . "615")
 (SubsecTimeDigitized . "615")
 (Flash . 0)
 (ExposureTime . 0.00040306328093510683)
 (OffsetTime . "+01:00")
 (PixelXDimension . 8066)
 (ExifVersion 2 3 1)
 (OffsetTimeDigitized . "+01:00")
 (ISOSpeedRatings 25)
 (OffsetTimeOriginal . "+01:00")
 (DateTimeDigitized . "2019:10:27 14:21:39")
 (FlashPixVersion 1 0)
 (WhiteBalance . 0)
 (PixelYDimension . 3552)
 (LensSpecification 4.25 4.25 1.7999999523162842 1.7999999523162842)
 (ColorSpace . 65535)
 (LensModel . "iPhone XS back camera 4.25mm f/1.8")
 (SceneCaptureType . 0)
 (ApertureValue . 1.6959938128383605)
 (SceneType . 1)
 (ShutterSpeedValue . 11.276932534193945)
 (FocalLength . 4.25)
 (FNumber . 1.8)
 (LensMake . "Apple")
 (FocalLenIn35mmFilm . 26)
 (BrightnessValue . 10.652484683458134)
 (ComponentsConfiguration 1 2 3 0)
 (MeteringMode . 5)
 (DateTimeOriginal . "2019:10:27 14:21:39"))
```

**(set-bitmap-exif-data!&#x20;**_**bmap**_ _**exif**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Sets the EXIF metadata for the given bitmap _bmap_ to _exif_. _exif_ is an association list defining all the EXIF attributes with symbols being used as keys.

```scheme
> (define photo (load-image (asset-file-path "Regensberg" "jpeg" "Images")))
> (set-bitmap-exif-data! photo
    '((ExposureBiasValue . 0)
      (Flash . 0)
      (ExposureTime . 0.0005)
      (PixelXDimension . 8066)
      (PixelYDimension . 3552)
      (ExifVersion 2 3 1)
      (ISOSpeedRatings 25)
      (FlashPixVersion 1 0)
      (WhiteBalance . 0)
      (LensSpecification 4.25 4.25 1.7999999523162842 1.7999999523162842)
      (ColorSpace . 65535)
      (SceneCaptureType . 0)
      (ApertureValue . 1.6959938128383605)
      (SceneType . 1)
      (ShutterSpeedValue . 11.276932534193945)
      (FocalLength . 4.25)
      (FNumber . 1.8)
      (BrightnessValue . 10.652484683458134)
      (ComponentsConfiguration 1 2 3 0)
      (OffsetTime . "+01:00")
      (OffsetTimeOriginal . "+01:00")
      (DateTimeOriginal . "2019:10:27 14:21:39")
      (OffsetTimeDigitized . "+01:00")
      (DateTimeDigitized . "2019:10:27 14:21:39")))
```

**(make-bitmap&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(make-bitmap&#x20;**_**obj size**_**)**\
**(make-bitmap&#x20;**_**obj size ppi**_**)**\
**(make-bitmap&#x20;**_**obj size ppi ipol**_**)**

Creates a new bitmap-based image by drawing the object _obj_ into an empty bitmap of size _size_ in points. _obj_ is either a drawing or an image. Images do not have to be bitmaps; for instance, a vector image loaded from a PDF file is converted into a bitmap by `make-bitmap`. An image is scaled to fill the bitmap; its aspect ratio is not preserved.

_size_ is optional for images: if it is omitted or `#f`, the new bitmap has the same size as the image. For drawings, _size_ is required.

_ppi_ determines the number of pixels per inch. For drawings, _ppi_ is set to 72 by default. In this case, the number of pixels of the bitmap corresponds to the number of points (since 1 pixel corresponds to 1/72 of an inch). For a _ppi_ value of 144, the horizontal and vertical number of pixels is doubled, etc. For images, _ppi_ is set to the resolution of the image by default (72 for images without a fixed resolution), so that converting a bitmap keeps all its pixels. `#f` selects the default.

_ipol_ determines the interpolation quality used if an image is scaled. It is an integer between 0 and 4: 0 is the default, 1 turns interpolation off, 2 is low, 3 is high, and 4 is medium quality. `#f` selects the default.

```scheme
(define photo (load-image (asset-file-path "Inga" "jpg" "Images")))
(bitmap-pixels (make-bitmap photo))
  ⇒  (1200 . 1200)
(bitmap-pixels (make-bitmap photo (size 300 150) 144))
  ⇒  (600 . 300)
```

**(bitmap-crop&#x20;**_**bitmap rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Crops a rectangle from the given bitmap and returns the result in a new bitmap. _rect_ is a rectangle in pixels. Its intersection with the dimensions of _bitmap_ (in pixels) are used for cropping.

**(bitmap-trim&#x20;**_**bitmap**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(bitmap-trim&#x20;**_**bitmap threshold**_**)**\
**(bitmap-trim&#x20;**_**bitmap threshold inset**_**)**

Removes the transparent area around the content of _bitmap_ and returns the result in a new image. The content of a bitmap is the smallest rectangle that contains all pixels that are not transparent. _threshold_ is an integer between 0 and 255 that determines which pixels count as transparent: all pixels whose alpha value is at most _threshold_ are considered to be transparent. By default, _threshold_ is 2, which ignores the faint edges created by antialiasing. With a _threshold_ of 0, every pixel that is not completely transparent belongs to the content.

_inset_ specifies the width of the transparent space, in points, that is left between the content and the edges of the resulting image. By default, there is no such space. Wherever the transparent area around the content of _bitmap_ is wider than requested by _inset_, it is cut off. Wherever it is narrower, transparent space is added. The widths are rounded to whole pixels; negative widths are treated like 0. _inset_ can be specified in the following ways:

* `#f`: no space on any edge (the default),
* a number: space of this width on all four edges,
* `(`_horizontal vertical_`)` or `(`_horizontal_ `.` _vertical_`)`: space of width _horizontal_ on the left and right edge, and space of width _vertical_ on the top and bottom edge,
* `(`_top left bottom right_`)`: space for each edge individually, or
* `((`_top_ `.` _bottom_`)` `.` `(`_left_ `.` _right_`))`: space for each edge individually, with the two vertical and the two horizontal widths paired up.

The resolution of _bitmap_ is preserved, i.e. the size of the new image in points is the size of the content plus the insets.  `bitmap-trim` returns `#f` if trimming could not be performed.

```scheme
(define bmp
  (make-bitmap
    (drawing (fill (rectangle (point 20 30) (size 40 10))))
             (size 100 80)))
(image-size bmp)
  ⇒  (100.0 . 80.0)
(image-size (bitmap-trim bmp))
  ⇒  (40.0 . 10.0)
(image-size (bitmap-trim bmp 2 '(4 8)))
  ⇒  (48.0 . 26.0)
```

**(bitmap-blur&#x20;**_**bitmap radius**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Blurs the given bitmap with the given blur radius and returns the result in a new bitmap of the same size.

**(save-bitmap&#x20;**_**path bitmap format**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(save-bitmap&#x20;**_**path bitmap format compr**_**)**

Saves a given bitmap-based image _bitmap_ in a file at filepath _path_. _format_ is a symbol specifying the image file format. Supported are: `png`, `jpg`, `gif`, `bmp`, and `tiff`. _compr_ is a floating-point number between 0.0 and 1.0, with 1.0 resulting in no compression and 0.0 resulting in the maximum compression possible. This compression factor applies only if `jpg` is used.

**(bitmap->bytevector&#x20;**_**bitmap format**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(bitmap->bytevector&#x20;**_**bitmap format compr**_**)**

Returns a bytevector with an encoding of _bitmap_ in the given format. _format_ is a symbol specifying the image format. Supported are: `png`, `jpg`, `gif`, `bmp`, and `tiff`. _compr_ is a floating-point number between 0.0 and 1.0, with 1.0 resulting in no compression and 0.0 resulting in the maximum compression possible. This compression factor applies only if `jpg` is used.

## Transformations

A transformation is an immutable object defining an affine transformation. Transformations can be used to:

* shift,
* scale, and
* rotate coordinate systems.

Transformations are typically used in drawings to transform drawing instructions. They can also be used to transform shapes.

**transformation-type-tag** <img class="kind" src="/img/obj.png" alt="object">

Symbol representing the `transformation` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all transformation objects.

**(transformation?&#x20;**_**obj**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a transformation. Otherwise, it returns `#f`.

**(transformation&#x20;**_**tf ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Creates a new transformation by composing the given transformations _tf_.

**(invert&#x20;**_**tf**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Inverts transformation _tf_ and returns a new transformation object for it.

**(translate&#x20;**_**dx dy**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(translate&#x20;**_**dx dy tf**_**)**

Returns a transformation for shifting the coordinate system by _dx_ and _dy_. If transformation _tf_ is provided, the translation transformation extends _tf_.

**(scale&#x20;**_**dx dy**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(scale&#x20;**_**dx dy tf**_**)**

Returns a transformation for scaling the coordinate system by _dx_ and _dy_. If transformation _tf_ is provided, the scaling transformation extends _tf_.

**(rotate&#x20;**_**angle**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(rotate&#x20;**_**angle tf**_**)**

Returns a transformation for rotating the coordinate system by _angle_ (in radians). If transformation _tf_ is provided, the rotation transformation extends _tf_.

## Colors

Colors are immutable objects defining colors in terms of four components: red, green, blue and alpha. Library `(lispkit draw)` currently only supports RGB color spaces.

`(lispkit draw)` supports the concept of _color lists_ on _macOS_. A color list is provided as a `.plist` file and stored in the "ColorLists" asset directory of LispKit. It maps color names expressed as symbols to color values. Color lists need to be loaded explicitly via procedure `load-color-list`.

**color-type-tag** <img class="kind" src="/img/obj.png" alt="object">

Symbol representing the `color` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all color objects.

**(color?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a color. Otherwise, it returns `#f`.

**(color&#x20;**_**spec**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(color&#x20;**_**name clist**_**)**\
**(color&#x20;**_**r g b**_**)**\
**(color&#x20;**_**r g b alpha**_**)**

This procedure returns new color objects. If _spec_ is provided, it either is a string containing a color description in hex format, or it is a symbol referring to the name of a color in the default color list `(White Yellow Red Purple Orange Magenta Green Cyan Brown Blue Black)`. If a different color list should be used, its name can be specified via string _clist_. Procedure `(available-color-lists)` returns a list of all available color lists. If the color is specified via a hex string, the following formats can be used: `"ccc"`, `"#ccc"`, `"rrggbb"`, and `"#rrggbb"`.

The color can also be specified using color components _r, g, b,_ and _alpha_. _alpha_ determines the transparency of the color (0.0 = fully transparent, 1.0 = no transparency). The default value for _alpha_ is 1.0.

**(color-red&#x20;**_**color**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the red color component of _color_.

**(color-green&#x20;**_**color**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the green color component of _color_.

**(color-blue&#x20;**_**color**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the blue color component of _color_.

**(color-alpha&#x20;**_**color**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the alpha color component of _color_.

**(color->hex&#x20;**_**color**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a representation of the given _color_ in hex form as a string.

```scheme
(color->hex (color 1.0 0.5 0.1))  ⇒  "#FF801A"
(color->hex (color "#6AF"))       ⇒  "#66AAFF"
```

**black** <img class="kind" src="/img/obj.png" alt="object">\
**gray**\
**white**\
**red**\
**green**\
**blue**\
**yellow**

Predefined color objects.

**(available-color-lists)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a list of available color lists. The LispKit installation guarantees that there is at least color list "HTML" containing all named colors from the HTML 5 specification.

```scheme
(available-color-lists)
⇒  ("HTML" "Web Safe Colors" "Crayons" "System" "Apple")
```

**(load-color-list&#x20;**_**name path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Loads a new color list stored as a `.plist` file in the assets directory of LispKit at the given file _path_ (which can also refer to color lists outside of the assets directory via absolute file paths). _name_ is a string which specifies the name of the color list. It is added to the list of available colors if loading of the color list was successful. `load-color-list` returns `#t` if the color list could be successfully loaded, `#f` otherwise.

**(available-colors&#x20;**_**clist**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a list of color identifiers supported by the given color list. _clist_ is a string specifying the name of the color list.

```scheme
(available-colors "HTML")
⇒  (YellowGreen Yellow WhiteSmoke White Wheat Violet Turquoise Tomato Thistle Teal Tan SteelBlue Snow SlateGrey SlateGray SlateBlue SkyBlue Silver Sienna SeaShell SeaGreen SandyBrown Salmon SaddleBrown RoyalBlue RosyBrown Red RebeccaPurple Purple PowderBlue Plum Pink Peru PeachPuff PapayaWhip PaleVioletRed PaleTurquoise PaleGreen PaleGoldenRod Orchid OrangeRed Orange OliveDrab Olive OldLace Navy NavajoWhite Moccasin MistyRose MintCream MidnightBlue MediumVioletRed MediumTurquoise MediumSpringGreen MediumSlateBlue MediumSeaGreen MediumPurple MediumOrchid MediumBlue MediumAquaMarine Maroon Magenta Linen LimeGreen Lime LightYellow LightSteelBlue LightSlateGrey LightSlateGray LightSkyBlue LightSeaGreen LightSalmon LightPink LightGrey LightGreen LightGray LightGoldenRodYellow LightCyan LightCoral LightBlue LemonChiffon LawnGreen LavenderBlush Lavender Khaki Ivory Indigo IndianRed HotPink HoneyDew Grey GreenYellow Green Gray GoldenRod Gold GhostWhite Gainsboro Fuchsia ForestGreen FloralWhite FireBrick DodgerBlue DimGrey DimGray DeepSkyBlue DeepPink DarkViolet DarkTurquoise DarkSlateGrey DarkSlateGray DarkSlateBlue DarkSeaGreen DarkSalmon DarkRed DarkOrchid DarkOrange DarkOliveGreen DarkMagenta DarkKhaki DarkGrey DarkGreen DarkGray DarkGoldenRod DarkCyan DarkBlue Cyan Crimson Cornsilk CornflowerBlue Coral Chocolate Chartreuse CadetBlue BurlyWood Brown BlueViolet Blue BlanchedAlmond Black Bisque Beige Azure Aquamarine Aqua AntiqueWhite AliceBlue)
```

## Fonts

Fonts are immutable objects defining fonts in terms of a font name and a font size (in points).

**font-type-tag** <img class="kind" src="/img/obj.png" alt="object">

Symbol representing the `font` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all font objects.

**(font?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a font. Otherwise, it returns `#f`.

**(font&#x20;**_**fontname size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(font&#x20;**_**familyname size weight trait ...**_**)**

If only two arguments, _fontname_ and _size_, are provided, `font` will return a new font object for a font with the given font name and font size (in points). If more than two arguments are provided, `font` will return a new font object for a font with the given font family name, font size (in points), font weight, as well as a number of font traits.

The weight of a font is specified as an integer on a scale from 0 to 15. Library `(lispkit draw)` exports the following weight constants:

* `ultralight` (1)
* `thin` (2)
* `light` (3)
* `book` (4)
* `normal` (5)
* `medium` (6)
* `demi` (7)
* `semi` (8)
* `bold` (9)
* `extra` (10)
* `heavy` (11)
* `super` (12)
* `ultra` (13)
* `extrablack` (14)

Font traits are specified as integer masks. The following trait constants are exported from library `(lispkit draw)`:

* `italic`
* `boldface`
* `unitalic`
* `unboldface`
* `narrow`
* `expanded`
* `condensed`
* `small-caps`
* `poster`
* `compressed`
* `monospace`

**(font-name&#x20;**_**font**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the font name of _font_.

**(font-family-name&#x20;**_**font**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the font family name of _font_.

**(font-size&#x20;**_**font**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the font size of _font_ in points.

**(font-weight&#x20;**_**font**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the font weight of _font_. See documentation of function `font` for details.

**(font-traits&#x20;**_**font**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the font traits of _font_ as an integer bitmask. See documentation of function `font` for details.

**(font-has-traits&#x20;**_**font trait ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if font _font_ has all the given traits.

**(available-fonts)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(available-fonts&#x20;**_**trait ...**_**)**

Returns all the available fonts that have matching font traits.

**(available-font-families)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns all the available font families, i.e. all font families for which there is at least one font installed.

## Points

A _point_ describes a location on a two-dimensional plane consisting of a _x_ and _y_ coordinate. Points are represented as pairs of floating-point numbers where the car representes the x-coordinate and the cdr represents the y-coordinate. Even though an expression like `'(3.5 . -2.0)` does represent a point, it is recommended to always construct points via function `point`; e.g. `(point 3.5 -2.0)`.

**zero-point** <img class="kind" src="/img/obj.png" alt="object">

The _zero point_, i.e `(point 0.0 0.0)`.

**(point?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a valid point. Otherwise, it returns `#f`.

**(point&#x20;**_**x y**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a point for coordinates _x_ and _y_.

**(point-x&#x20;**_**point**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the x-coordinate for _point_.

**(point-y&#x20;**_**point**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

Returns the y-coordinate for _point_.

**(move-point&#x20;**_**point dx dy**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Moves _point_ by _dx_ and _dy_ and returns the result as a point.

**(scale-point&#x20;**_**point sx**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(scale-point&#x20;**_**point sx sy**_**)**

Scales _point_ by factor _sx_ horizontally and _sy_ vertically, and returns the result. If _sy_ is not provided, the point is scaled uniformly by _sx_ in both directions.

**(transform-point&#x20;**_**point transformation**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Applies the given affine _transformation_ to _point_ and returns the result.

## Size

A _size_ describes the dimensions of a rectangle consisting of _width_ and _height_ values. Sizes are represented as pairs of floating-point numbers where the car representes the width and the cdr represents the height. Even though an expression like `'(5.0 . 3.0)` does represent a size, it is recommended to always construct sizes via function `size`; e.g. `(size 5.0 3.0)`.

**zero-size** <img class="kind" src="/img/obj.png" alt="object">

The zero size, i.e. `(size 0.0 0.0)`.

**(size?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a valid size. Otherwise, it returns `#f`.

**(size&#x20;**_**w h**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a size for the given width _w_ and height _h_.

**(size-width&#x20;**_**size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the width for _size_.

**(size-height&#x20;**_**size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the height for _size_.

**(increase-size&#x20;**_**size dx dy**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new size object whose width is increased by _dx_ and whose height is increased by _dy_.

**(size-ratio&#x20;**_**size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the aspect ratio of _size_, i.e. the width divided by the height.

**(scale-size&#x20;**_**size factor**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new size object whose width and height is multiplied by _factor_.

## Rects

A _rect_ describes a rectangle in terms of an upper left _point_ and a _size_. Rects are represented as pairs whose car is a point and whose cdr is a size. Even though an expression like `'((1.0 . 2.0) . (3.0 4.0))` does represent a rect, it is recommended to always construct rects via function `rect`; e.g. `(rect (point 1.0 2.0) (size 3.0 4.0))`.

**(rect?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a valid rect. Otherwise, it returns `#f`.

**(rect&#x20;**_**point size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(rect&#x20;**_**x y width height**_**)**

Returns a rect either from the given _point_ and _size_, or from x-coordinate _x_, y-coordinate _y_, width _w_, and height _h_.

**(rect-point&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the upper left corner point of _rect_.

**(rect-size&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the size of _rect_ as a size object, i.e. as a pair of floating-point numbers where the car representes the width and the cdr represents the height of _rect_.

**(rect-x&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the x-coordinate of the upper left corner point of _rect_.

**(rect-y&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the y-coordinate of the upper left corner point of _rect_.

**(rect-width&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the width of _rect_.

**(rect-height&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the height of _rect_.

**(rect-max-point&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the lower right corner point of _rect_.

**(rect-max-x&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the x-coordinate of the lower right corner point of _rect_.

**(rect-max-y&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the y-coordinate of the lower right corner point of _rect_.

**(rect-mid-point&#x20;**_**rect**_**)**    <img class="kind" src="/img/proc.png" alt="procedure">

Returns the center point of _rect_, i.e. the midpoint between the upper left and lower right corners.

**(rect-mid-x&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the x-coordinate of the center point of _rect_.

**(rect-mid-y&#x20;**_**rect**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the y-coordinate of the center point of _rect_.

**(move-rect&#x20;**_**rect d**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(move-rect&#x20;**_**rect dx dy**_**)**

Moves _rect_ by _dx_ and _dy_ and returns the result. If only one argument _d_ is provided, _rect_ is moved by _d_ both horizontally and vertically.

**(scale-rect&#x20;**_**rect sx**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(scale-rect&#x20;**_**rect sx sy**_**)**\
**(scale-rect&#x20;**_**rect sx sy preserve-mid?**_**)**

Scales _rect_ by factor _sx_ horizontally and _sy_ vertically, and returns the result. If _sy_ is not provided, the rect is scaled uniformly by _sx_ in both directions. If _preserve-mid?_ is true, the rectangle's center point is preserved during scaling.

**(inset-rect&#x20;**_**rect d**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(inset-rect&#x20;**_**rect horizental vertical**_**)**\
**(inset-rect&#x20;**_**rect left top right bottom**_**)**

Insets _rect_ on all sides as specified by the arguments. If only _d_ is provided, it specifies the amount added to the rectangle's left and top and the amount subtracted from the rectangle's right and bottom. _horizontal_ specifies the amount added to the rectangle's left and subtracted from the rectangle's right. _vertical_ specifies the amount added to the rectangle's top and subtracted from the rectangle's bottom. If _left_, _top_, _right_, and _bottom_ are given individually, they specify the amounts to add/subtract from the individual sides.

**(transform-rect&#x20;**_**rect tf**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Applies the given transformation _tf_ to _rect_ and returns the result.

**(intersect-rect&#x20;**_**rect1 rect2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the intersection of _rect1_ and _rect2_ as a new rect. If the rectangles do not intersect, returns `#f`.

**(union-rect&#x20;**_**rect1 rect2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the smallest rect that contains both _rect1_ and _rect2_.

**(rect-contains?&#x20;**_**rect obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _rect_ contains _obj_. _obj_ can be either a point or another rect. For a rect to contain another rect, the second rect must be completely within the first rect.

## Utilities

**(transpose&#x20;**_**expr cur-size new-size**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(transpose&#x20;**_**expr cur-size new-size flip?**_**)**

Transposes coordinates in _expr_ from a coordinate system with _cur-size_ to a new coordinate system with _new-size_. This is useful for transforming drawings between different canvas sizes. _expr_ can be a point, rect, list, or vector containing points and rects. If _flip?_ is true or if _new-size_ is `#f`, the y-coordinates are flipped vertically. _cur-size_ and _new-size_ are either size objects, rects, or images.
