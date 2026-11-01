---
sidebar_position: 200
---

# (lispkit draw barcode)

Library `(lispkit draw barcode)` provides procedures for generating images of barcodes. Supported are _Code 128_, _QR Code_, _Aztec_, and _PDF417_ barcodes.

_Code 128_ is a high-density linear barcode defined in ISO 15417. It is used for alphanumeric or numeric-only barcodes and can encode any of the 128 ASCII characters. _GS1-128_ (formerly known as _UCC/EAN-128_) is a subset of _Code 128_ and is used extensively worldwide in retail, shipping and packaging industries as a product identification code.

<div align="center"><figure><img src="/img/code128.png" alt=""><figcaption></figcaption></figure></div>

_QR codes_ (quick-response codes) are two-dimensional matrix barcodes, featureing black squares on a white background with fiducial markers, readable by imaging devices like cameras, and processed using Reed–Solomon error correction.

<figure><img src="/img/qrcode.png" alt=""><figcaption></figcaption></figure>

_Aztec codes_ are matrix codes defined by ISO 24778. Named after the resemblance of the central finder pattern to an Aztec pyramid, Aztec codes have the potential to use less space than other matrix barcodes because they do not require a surrounding blank/"quiet" zone.

<figure><img src="/img/aztec.png" alt=""><figcaption></figcaption></figure>

_PDF417_ is a stacked linear barcode format used in a variety of applications such as transport, identification cards, and inventory management. It is defined in ISO 15438.

<figure><img src="/img/pdf417.png" alt=""><figcaption></figcaption></figure>

**(code128-image&#x20;**_**str height**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(code128-image&#x20;**_**str height pad**_**)**\
**(code128-image&#x20;**_**str height pad scale**_**)**\
**(code128-image&#x20;**_**str height pad scale color**_**)**\
**(code128-image&#x20;**_**str height pad scale color backgr**_**)**\
**(code128-image&#x20;**_**str height pad scale color backgr ppi**_**)**

Returns a [_Code 128_](https://en.wikipedia.org/wiki/Code_128) barcode for the given string _str_ and _height_ in points as a bitmap image. _pad_ defines the padding around the barcode in points (default: 0.0). It is possible to scale the barcode with scaling factor _scale_ (default: 1.0). _color_ defines the color of the barcode (default: `#f`), _backgr_ defines the background color (default: `#f`). _ppi_ determines the number of pixels per inch. By default, _ppi_ is set to 72.

```scheme
(define bc (code128-image "010123456789012815051231" 50 10))
(save-bitmap "barcode.png" bc 'png)
```

**(qr-code-image&#x20;**_**str**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(qr-code-image&#x20;**_**str corr**_**)**\
**(qr-code-image&#x20;**_**str corr scale**_**)**\
**(qr-code-image&#x20;**_**str corr scale color**_**)**\
**(qr-code-image&#x20;**_**str corr scale color backgr**_**)**\
**(qr-code-image&#x20;**_**str corr scale color backgr ppi**_**)**

Returns a [_QR Code_](https://en.wikipedia.org/wiki/QR_code) matrix barcode for the given string _str_ with 1 pixel matrix cells as a bitmap image. _corr_ is the correction level, a symbol which can be one of: `low`, `medium`, `quartile`, and `high` (default: `medium`). It is possible to scale the QR code with scaling factor _scale_ (default: 2.0). _color_ defines the color of the barcode (default: `#f`), _backgr_ defines the background color (default: `#f`). _ppi_ determines the number of pixels per inch. By default, _ppi_ is set to 72.

```scheme
(define qc (qr-code-image "http://lisppad.app" 'quartile 2.5))
(save-bitmap "qrcode.png" qc 'png)
```

**(aztec-code-image&#x20;**_**str**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(aztec-code-image&#x20;**_**str corr**_**)**\
**(aztec-code-image&#x20;**_**str corr compact?**_**)**\
**(aztec-code-image&#x20;**_**str corr compact? scale**_**)**\
**(aztec-code-image&#x20;**_**str corr compact? scale color**_**)**\
**(aztec-code-image&#x20;**_**str corr compact? scale color backgr**_**)**\
**(aztec-code-image&#x20;**_**str corr compact? scale color backgr ppi**_**)**

Returns an [Aztec Code](https://en.wikipedia.org/wiki/Aztec_Code) matrix barcode for the given string _str_ with 1 pixel matrix cells as a bitmap image. _corr_ is the correction level (default: 23.0). If _compact?_ is provided, it can be used to select between a standard and a compact representation (default: `()`). It is possible to scale the Aztec code with scaling factor _scale_ (default: 1.0). _color_ defines the color of the barcode (default: `#f`), _backgr_ defines the background color (default: `#f`). _ppi_ determines the number of pixels per inch. By default, _ppi_ is set to 72.

```scheme
(define ac (aztec-code-image "help@lisppad.app" #f '() 3.0))
(save-bitmap "azteccode.png" ac 'png)
```

**(pdf417-code-image&#x20;**_**str**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(pdf417-code-image&#x20;**_**str config**_**)**\
**(pdf417-code-image&#x20;**_**str config scale**_**)**\
**(pdf417-code-image&#x20;**_**str config scale color**_**)**\
**(pdf417-code-image&#x20;**_**str config scale color backgr**_**)**\
**(pdf417-code-image&#x20;**_**str config scale color backgr ppi**_**)**

Returns a [PDF417](https://en.wikipedia.org/wiki/PDF417) barcode for the given string _str_ and barcode configuration _config_ as a bitmap image. _config_ is an association list supporting the following symbolic keys:

* `min-width`: Minimum width in points
* `max-width`: Maximum width in points
* `min-height`: Minimum height in points
* `max-height`: Maximum height in points
* `columns`: The number of columns (between 1 and 31)
* `rows`: The number of rows (between 1 and 91)
* `preferred-aspect-ratio`: Aspect ratio of the barcode
* `compaction-mode`: Compaction mode (between 0 and 4)
* `correction-level`: Compaction level (between 0 and 9)
* `always-specify-compaction`: Is compaction mode always required? (bool)

It is possible to scale the PDF417 barcode with scaling factor _scale_ (default: 1.0). _color_ defines the color of the barcode (default: `#f`), _backgr_ defines the background color (default: `#f`). _ppi_ determines the number of pixels per inch. By default, _ppi_ is set to 72.

```scheme
(define pc (pdf417-code-image "help@lisppad.app" '() 1.5))
(save-bitmap "pdf417.png" pc 'png)
```
