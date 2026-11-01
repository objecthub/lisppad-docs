---
sidebar_position: 260
---

# (lispkit draw web)

Library `(lispkit draw web)` provides web page snapshotting capabilities through a WebKit-based web client. The library enables capturing images and generating PDFs from HTML content, local files, data streams, and remote URLs with configurable viewport settings and cropping options.

This is a minimalistic example showcasing how to snapshot a web page at a given URL and saving the snapshot in a JPEG file.

```scheme
(import (lispkit base)
        (lispkit draw)           ; For using `save-image`
        (lispkit draw web)       ; For web client functionality
        (lispkit thread future)) ; For handling futures
(save-image
  "~/Downloads/objecthub.jpeg"   ; Filename
  (future-get                    ; Wait for snapshot generation to finish
    (web-client-snapshot-url     ; Generate snapshot for given URL
      (make-web-client 1200)     ; Create simple web client with 1200 points width
      "http://objecthub.com"))   ; URL to snapshot
  'jpg)                          ; Save image as JPEG
```

Here is an example for creating an HTML document containing a reports table on the fly and then snapshotting the rendered document both as bitmap and PDF.

```scheme
(import (lispkit base)
        (lispkit draw)
        (lispkit draw web) 
        (lispkit thread future))

(define (generate-web-report data-source path)
  ;; Create web client optimized for documents
  (define client (make-web-client 600 '() #f "Report Generator" 1.5))
  ;; Generate report in HTML form
  (define html
    (string-append
      "<!DOCTYPE html><html><head>"
      "<title>Report</title>"
      "<style>body { font-family: Georgia, Arial; }"
      "h1 { color: #333; padding: 4px; border-bottom: 2px solid #ccc; }"
      "table { border-collapse: collapse; width: 100%; }"
      "th, td { border: 1px solid #ddd; padding: 8px; }</style>"
      "</head><body>"
      "<h1>Data Report</h1>"
      "<table><tr><th>Item</th><th>Value</th></tr>"
      (apply string-append
             (map (lambda (item)
                    (string-append "<tr><td>" (car item) "</td>"
                                 "<td>" (cdr item) "</td></tr>"))
                  data-source))
      "</table></body></html>"))

  ;; Render and snapshot the report both as bitmap and PDF.
  (define img-snapshot
    (web-client-snapshot-html client html 'all))
  (define pdf-snapshot
    (web-client-pdf-snapshot-html client html 'all))
  
  ;; Wait for completion and save the snapshots
  (save-image
    (string-append path ".png")
    (future-get img-snapshot)
    'png)
  (write-binary-file
    (string-append path ".pdf")
    (future-get pdf-snapshot)))

;; Use the report generator
(define sample-data
  '(("Revenue" . "$125,000")
    ("Expenses" . "$89,500")
    ("Profit" . "$35,500")
    ("Growth" . "12.5%")))
(generate-web-report sample-data "~/Downloads/report")
```

## Web clients

**(make-web-client&#x20;**_**width**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(make-web-client&#x20;**_**width scripts**_**)**\
**(make-web-client&#x20;**_**width scripts viewport**_**)**\
**(make-web-client&#x20;**_**width scripts viewport name**_**)**\
**(make-web-client&#x20;**_**width scripts viewport name delay**_**)**

Returns a new web client object representing a web view of the given _width_ with specified optional configuration parameters. Web clients are used to load and snapshot web pages.

_scripts_ is a list of JavaScript strings to inject into documents rendered via the web client. Supported are the following ways to specify a JavaScript string:

* `"..."`: The string contains the JavaScript code. It is injected at the end of the document.
* `("...")`: The string wrapped in a pair contains the JavaScript code. It is injected at the end of the document.
* `("..."` _start_ `)`: The string contains the JavaScript code which is injected at the end of the document if _start_ is `#f`. Otherwise, the JavaScript code is injected at the beginning of the document.
* `("..."` _start main_ `)`: The string contains the JavaScript code which is injected at the end of the document if _start_ is `#f`. Otherwise, the JavaScript code is injected at the beginning of the document. Boolean _main_ specifies if the code is injected only into the main frame or all frames.

Argument _viewport_ specifies the view port of rendered documents. Supported are the following values:

* `()`: No view port is being defined explicitly.
* `#t`: The view port is constraint by the width of the client with a transparent background.
* `#f`: The view port is constraint by the width of the client, setting the following other parameters: `initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no`. This is the default.
* `"..."`: The view port is defined via the following meta tag: `<meta name="viewport" content="...">`

Argument _name_ defines the name of the application that appears in the user agent string. _delay_ specifies the delay in seconds before taking snapshots to allow dynamic content loading (default: 0.0).

**(web-client?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a web client object, `#f` otherwise.

**(web-client-busy?&#x20;**_**web-client**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if the web client is currently processing a request, `#f` if it's available for new snapshotting requests. Web clients process requests sequentially to avoid conflicts.

## Crop Modes

The various snapshot procedures support six different _crop modes_ for controlling what portion of the web page to capture:

* **all**: Capture the entire web view bounds, including any empty space.
* **trim**: Automatically detect and capture only the content area, trimming empty margins.
* **(inset&#x20;**_**top right bottom left**_**)**: Crop by insetting the specified amounts from the web view edges.
* **(inset-trimmed&#x20;**_**top right bottom left**_**)**: Crop by insetting the specified amounts from the automatically detected content area.
* **(rect&#x20;**_**x y width height**_**)**: Capture a specific rectangular region (standard representation of rectangles).
* **((**_**x**_**&#x20;.&#x20;**_**y**_**) . (**_**width**_**&#x20;.&#x20;**_**height**_**))**: Alternative rectangle form.
* **(rect-trimmed&#x20;**_**x y width height**_**)**: Rectangle relative to the trimmed content area.

## Image snapshots

**(web-client-snapshot-html&#x20;**_**client html crop-mode**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(web-client-snapshot-html&#x20;**_**client html crop-mode width**_**)**\
**(web-client-snapshot-html&#x20;**_**client html url crop-mode**_**)**\
**(web-client-snapshot-html&#x20;**_**client html url crop-mode width**_**)**

Captures an image snapshot of HTML content provided by the string _html_ to the web client _client_ and returns a future referring to the captured image. _url_ is the base URL used for resolving relative resources. It is optional and can be set to `#f`. _crop-mode_ defines what portion of the web page is being captured. It is either a rectangular object or has one of the following forms: `all`, `trim`, `(inset top right bottom left)`, `(inset-trimmed top right bottom left)`, `(rect _x y width height_)`, or `(rect-trimmed x y width height)`. For details, see section on _Crop Modes_. _width_ defines a width for the rendered document and overrides, if provided, the width defined by web client _client_; default is `#f`.

**(web-client-snapshot-data&#x20;**_**client data mime**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(web-client-snapshot-data&#x20;**_**client data mime encoding**_**)**\
**(web-client-snapshot-data&#x20;**_**client data mime encoding url**_**)**\
**(web-client-snapshot-data&#x20;**_**client data mime encoding url crop-mode**_**)**\
**(web-client-snapshot-data&#x20;**_**client data mime encoding url crop-mode width**_**)**

Captures an image snapshot of content provided by the bytevector _data_ of mime type _mime_ to the web client _client_ and returns a future referring to the captured image. _encoding_ is a string specifying the encoding of the data; default is `"UTF-8"`. _url_ is the base URL used for resolving relative resources; default is `"http://localhost"`. _crop-mode_ defines what portion of the document is being captured. It is either a rectangular object or has one of the following forms: `all`, `trim`, `(inset top right bottom left)`, `(inset-trimmed top right bottom left)`, `(rect _x y width height_)`, or `(rect-trimmed x y width height)`; default is `all`. For details, see section on _Crop Modes_. _width_ defines a width for the rendered document and overrides, if provided, the width defined by web client _client_; default is `#f`.

**(web-client-snapshot-file&#x20;**_**client path dir**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(web-client-snapshot-file&#x20;**_**client path dir crop-mode**_**)**\
**(web-client-snapshot-file&#x20;**_**client path dir crop-mode width**_**)**

Captures an image snapshot of HTML content provided by the file at _path_ to the web client _client_ and returns a future referring to the captured image. _dir_ is the base directory used for resolving relative file resources. _crop-mode_ defines what portion of the web page is being captured. It is either a rectangular object or has one of the following forms: `all`, `trim`, `(inset top right bottom left)`, `(inset-trimmed top right bottom left)`, `(rect _x y width height_)`, or `(rect-trimmed x y width height)`; default is `all`. For details, see section on _Crop Modes_. _width_ defines a width for the rendered document and overrides, if provided, the width defined by web client _client_; default is `#f`.

**(web-client-snapshot-url&#x20;**_**client req**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(web-client-snapshot-url&#x20;**_**client req crop-mode**_**)**\
**(web-client-snapshot-url&#x20;**_**client req crop-mode width**_**)**

Captures an image snapshot of HTML content by _req_ to the web client _client_ and returns a future referring to the captured image. _req_ is either a URL or an HTTP request created with library `(lispkit http)`. _crop-mode_ defines what portion of the web page is being captured. It is either a rectangular object or has one of the following forms: `all`, `trim`, `(inset top right bottom left)`, `(inset-trimmed top right bottom left)`, `(rect _x y width height_)`, or `(rect-trimmed x y width height)`; default is `all`. For details, see section on _Crop Modes_. _width_ defines a width for the rendered document and overrides, if provided, the width defined by web client _client_; default is `#f`.

## PDF snapshots

**(web-client-pdf-snapshot-html&#x20;**_**client html**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(web-client-pdf-snapshot-html&#x20;**_**client html crop-mode**_**)**\
**(web-client-pdf-snapshot-html&#x20;**_**client html url**_**)**\
**(web-client-pdf-snapshot-html&#x20;**_**client html url crop-mode**_**)**

Captures a snapshot of HTML content provided by the string _html_ to the web client _client_ and returns a future referring to a PDF document containing the captured snapshot serialized into a bytevector. _url_ is the base URL used for resolving relative resources. It is optional and can be set to `#f`. _crop-mode_ defines what portion of the web page is being captured. It is either a rectangular object or has one of the following forms: `all`, `trim`, `(inset top right bottom left)`, `(inset-trimmed top right bottom left)`, `(rect _x y width height_)`, or `(rect-trimmed x y width height)`. For details, see section on _Crop Modes_.

**(web-client-pdf-snapshot-data&#x20;**_**client data mime**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(web-client-pdf-snapshot-data&#x20;**_**client data mime encoding**_**)**\
**(web-client-pdf-snapshot-data&#x20;**_**client data mime encoding url**_**)**\
**(web-client-pdf-snapshot-data&#x20;**_**client data mime encoding url crop-mode**_**)**

Captures a snapshot of content provided by the bytevector _data_ of mime type _mime_ to the web client _client_ and returns a future referring to a PDF document containing the captured snapshot serialized into a bytevector. _encoding_ is a string specifying the encoding of the data; default is `"UTF-8"`. _url_ is the base URL used for resolving relative resources; default is `"http://localhost"`. _crop-mode_ defines what portion of the document is being captured. It is either a rectangular object or has one of the following forms: `all`, `trim`, `(inset top right bottom left)`, `(inset-trimmed top right bottom left)`, `(rect _x y width height_)`, or `(rect-trimmed x y width height)`; default is `all`. For details, see section on _Crop Modes_.

**(web-client-pdf-snapshot-file&#x20;**_**client path dir**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(web-client-pdf-snapshot-file&#x20;**_**client path dir crop-mode**_**)**

Captures a snapshot of HTML content provided by the file at _path_ to the web client _client_ and returns a future referring to a PDF document containing the captured snapshot serialized into a bytevector. _dir_ is the base directory used for resolving relative file resources. _crop-mode_ defines what portion of the web page is being captured. It is either a rectangular object or has one of the following forms: `all`, `trim`, `(inset top right bottom left)`, `(inset-trimmed top right bottom left)`, `(rect _x y width height_)`, or `(rect-trimmed x y width height)`; default is `all`. For details, see section on _Crop Modes_.

**(web-client-pdf-snapshot-url&#x20;**_**client req**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(web-client-pdf-snapshot-url&#x20;**_**client req crop-mode**_**)**

Captures a snapshot of HTML content by _req_ to the web client _client_ and returns a future referring to a PDF document containing the captured snapshot serialized into a bytevector. _req_ is either a URL or an HTTP request created with library `(lispkit http)`. _crop-mode_ defines what portion of the web page is being captured. It is either a rectangular object or has one of the following forms: `all`, `trim`, `(inset top right bottom left)`, `(inset-trimmed top right bottom left)`, `(rect _x y width height_)`, or `(rect-trimmed x y width height)`; default is `all`. For details, see section on _Crop Modes_.
