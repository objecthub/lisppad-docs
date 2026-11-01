---
sidebar_position: 800
---

# (lispkit url)

Library `(lispkit url)` defines procedures for creating and decomposing URLs. URLs are represented as strings which conform to the syntax of a generic URI. Each URI consists of five components organized hierarchically in order of decreasing significance from left to right:

```
url = scheme ":" ["//" authority] path ["?" query] ["#" fragment]
```

A component is _undefined_ if it has an associated delimiter and the delimiter does not appear in the URI. The scheme and path components are always defined. A component is _empty_ if it has no characters. The scheme component is always non-empty. The authority component consists of several _subcomponents_:

```
authority = [userinfo "@"] host [":" port]
userinfo = username [":" password]
```

The following illustration shows all components:

![URL Syntax](https://x-devonthink-item/54C1ABDC-D6F4-4E5A-B96B-CF58D5C1E5DC)

## Generic URLs

**(url?&#x20;**_**obj**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a string containing a valid URL; `#f` otherwise.

**(make-url&#x20;**_**proto**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(make-url&#x20;**_**proto scheme**_**)**\
**(make-url&#x20;**_**proto scheme auth**_**)**\
**(make-url&#x20;**_**proto scheme auth path**_**)**\
**(make-url&#x20;**_**proto scheme auth path query**_**)**\
**(make-url&#x20;**_**proto scheme auth path query fragment**_**)**

Returns a string representing the URL defined by merging the given URL components with URL prototype _proto_. _proto_ is either `#f` (no prototype) or it is a string which is interpreted as a partially defined URL. The URL components provided as arguments of `make-url` overwrite the respective components of _proto_. If a URL component such as _scheme_, _auth_, _path_, etc. is set to `#f`, no changes are made to the respective component of _proto_. If they are set to `#t`, then the respective component in _proto_ is removed. If a non-boolean value is provided, it replaces the respective value in _proto_. The result of applying all given URL components to _proto_ is returned as the result of `make-url`. The result is not guaranteed to be a valid URL. It could, for instance, be used as a prototype for other `make-url` calls. If it is not possible to return a result that can be parsed back into a URL prototype, `#f` is returned.

_scheme_ is a string defining the URL scheme. _auth_ is defining the URL authority. The following formats are supported for _auth_:

* `host`: A simple string defines the host of the URL without port.
* `(host)`: A list with one element has the same effect than just using string `host` alone.
* `(host port)`: Specifies both the host of the URL as a string followed by the port of the URL as a fixnum.
* `(user host port)`: Defines the username as a string followed by the host of the URL as a string followed by a port number.
* `(user passwd host port)`: The username followed by a password, followed by a hostname followed by a port number. The first three elements of the list are strings, the last element is a number.

If a list is used to specify the URL authority, again `#f` and `#t` can be used to either not modify the respective authority component from _proto_ or to remove it. _path_ and _fragment_ define a path or fragment of a URL as a string. _query_ defines the query component of a URL using two possible formats:

* `query`: A simple string defining the full query component of the URL
* `((name . value) ...)`: An association list of query items consisting of name/value pairs of strings provides a structured representation of a query. It gets automatically mapped to a query string in which items are represented in the form `name=value`, separated by `&`.

If the URL extensibility mechanism via prototype _proto_ is not used and it is the goal to defined a valid URL, then using procedures `url` and `url-copy` should be preferred over using `make-url`.

```scheme
(make-url #f "https" "lisppad.app")
  ⇒  "https://lisppad.app"
(make-url #f "https" "lisppad.app" "/libraries/lispkit")
  ⇒  "https://lisppad.app/libraries/lispkit"
(make-url #f "https" "lisppad.app" "/libraries/lispkit"
          '(("lang" . "en")("c" . "US")))
  ⇒  "https://lisppad.app/libraries/lispkit?lang=en&c=US"
```

**(url)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url&#x20;**_**scheme**_**)**\
**(url&#x20;**_**scheme auth**_**)**\
**(url&#x20;**_**scheme auth path**_**)**\
**(url&#x20;**_**scheme auth path query**_**)**\
**(url&#x20;**_**scheme auth path query fragment**_**)**

Returns a string representing the URL defined by the given URL components. Providing `#f` for a component means the component does not exist. _scheme_ is a string defining the URL scheme. _auth_ is defining the URL authority supporting the following formats: `host`, `(host)`, `(host port)`, `(user host port)`, and `(user passwd host port)`. _path_ and _fragment_ define a path or fragment of a URL as a string. _query_ defines the query component of a URL either as a query string or an association list of query items consisting of name/value pairs of strings.

`(url scheme ...)` is similar to `(make-url #f scheme ...)`, but it guarantees that the result is a valid URL. Invalid combinations of URL components result in procedure `url` returning `#f`.

**(url-copy&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-copy&#x20;**_**url scheme**_**)**\
**(url-copy&#x20;**_**url scheme auth**_**)**\
**(url-copy&#x20;**_**url scheme auth path**_**)**\
**(url-copy&#x20;**_**url scheme auth path query**_**)**\
**(url-copy&#x20;**_**url scheme auth path query fragment**_**)**

Returns a new string representing the URL defined by merging the given URL components with URL prototype _url_. _url_ is a string which is interpreted as a partially defined URL. The URL components provided as arguments of `url-copy` overwrite the respective components of _url_. If a URL component such as _scheme_, _auth_, _path_, etc. is set to `#f`, no changes are made to the respective component of _proto_. If they are set to `#t`, then the respective component in _proto_ is removed. If a non-boolean value is provided, it replaces the respective value in _url_. The result of applying all given URL components to _url_ is returned as the result of `url-copy` if it constitutes a valid URL, otherwise `#f` is returned.

_scheme_ is a string defining the URL scheme. _auth_ is defining the URL authority supporting the following formats: `host`, `(host)`, `(host port)`, `(user host port)`, and `(user passwd host port)`. _path_ and _fragment_ define a path or fragment of a URL as a string. _query_ defines the query component of a URL either as a query string or an association list of query items consisting of name/value pairs of strings.

**(url-scheme&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the scheme of the URL string _url_.

**(url-authority&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-authority&#x20;**_**url url-encoded?**_**)**

Returns the authority of the URL string _url_ as a list of four components: username, password, host and port. URL components that do not exist are represented as `#f`. If _url-encoded?_ is provided and set to true, then the authority components are returned in percent-encoded form.

**(url-user&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-user&#x20;**_**url url-encoded?**_**)**

Returns the user name of the URL string _url_ as a string, or `#f` if there is no user name defined. If _url-encoded?_ is provided and set to true, then the user name is returned in percent-encoded form.

**(url-password&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-password&#x20;**_**url url-encoded?**_**)**

Returns the password of the URL string _url_ as a string, or `#f` if there is no password defined. If _url-encoded?_ is provided and set to true, then the password is returned in percent-encoded form.

**(url-host&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-host&#x20;**_**url url-encoded?**_**)**

Returns the host of the URL string _url_ as a string, or `#f` if there is no host defined. If _url-encoded?_ is provided and set to true, then the host is returned in percent-encoded form.

**(url-port&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the port of the URL string _url_ as a fixnum, or `#f` if there is no port defined.

**(url-path&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-path&#x20;**_**url url-encoded?**_**)**

Returns the path of the URL string _url_ as a string, or `#f` if there is no path defined. If _url-encoded?_ is provided and set to true, then the path is returned in percent-encoded form.

**(url-query&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-query&#x20;**_**url url-encoded?**_**)**

Returns the query of the URL string _url_ as a string, or `#f` if there is no query defined. If _url-encoded?_ is provided and set to true, then the query is returned in percent-encoded form.

**(url-query-items&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">

Returns the query of the URL string _url_ as an association list of string pairs, mapping URL query parameters to values. `#f` is returned, if the query cannot be parsed.

**(url-fragment&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-fragment&#x20;**_**url url-encoded?**_**)**

Returns the fragment of the URL string _url_ as a string, or `#f` if there is no fragment defined. If _url-encoded?_ is provided and set to true, then the fragment is returned in percent-encoded form.

**(url-format&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-format&#x20;**_**url schc**_**)**\
**(url-format&#x20;**_**url schc usrc**_**)**\
**(url-format&#x20;**_**url schc usrc passc**_**)**\
**(url-format&#x20;**_**url schc usrc passc hostc**_**)**\
**(url-format&#x20;**_**url schc usrc passc hostc portc**_**)**\
**(url-format&#x20;**_**url schc usrc passc hostc portc pathc**_**)**\
**(url-format&#x20;**_**url schc usrc passc hostc portc pathc qc**_**)**\
**(url-format&#x20;**_**url schc usrc passc hostc portc pathc qc fragc**_**)**

Formats the given URL string _url_ using the provided component-level configurations _schc_, _usrc_, _passc_, _hostc_, _portc_, _pathc_, _qc_, and _fragc_, and returns the result as a string. Each configuration has one of the following forms:

* `#f`: The component is omitted in the formatted URL.
* `#t`: The component is always included in the formatted URL.
* `"..."`: The component is omitted if the component of _url_ matches the string.
* `("..." ...)` or `("..." ... . #t)`: The component is omitted if the list contains a string matching the component of _url_.
* `("..." ... . #f)`: The component is only displayed if the list contains a string matching the component of _url_.
* `("..." ... . comp)` where _comp_ is a symbol: The component is omitted if the list contains a string matching the component specified via _comp_ of _url_. The following specifiers can be used: `scheme`, `user`, `password`, `host`, `port`, `path`, `query`, and `fragment`. The component is only displayed if the list contains a string matching the component specified via _comp_ of _url_. The following specifiers can be used: `scheme?`, `user?`, `password?`, `host?`, `port?`, `path?`, `query?`, and `fragment?`.

```scheme
(url-format "http://x@lisppad.app:80/index.html?lang=en"
  #t #f #f #t "80" '("/index.html" "/index.htm") #t)
  ⇒  "http://lisppad.app?lang=en"
```

**(url-parse&#x20;**_**str**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-parse&#x20;**_**str schs**_**)**\
**(url-parse&#x20;**_**str schs usrs**_**)**\
**(url-parse&#x20;**_**str schs usrs pass**_**)**\
**(url-parse&#x20;**_**str schs usrs pass ports**_**)**\
**(url-parse&#x20;**_**str schs usrs pass hosts ports**_**)**\
**(url-parse&#x20;**_**str schs usrs pass hosts ports paths**_**)**\
**(url-parse&#x20;**_**str schs usrs pass hosts ports paths qs**_**)**\
**(url-parse&#x20;**_**str schs usrs pass hosts ports paths qs frags**_**)**

Parses a string _str_ using the provided component-level parsing settings _schs_, _usrs_, _pass_, _hosts_, _ports_, _paths_, _qs_, and _frags_, and returns the result as a string. Each setting has one of the following forms:

* `#f`: The component is optional.
* `#t`: The component is required.
* `"..."` or number: The component is optional and if it is missing, this string or number is used as a default.

```scheme
(url-parse " http://lisppad.app:80?lang=en ok")
  ⇒  "http://lisppad.app:80?lang=en"
(url-parse " http://lisppad.app/?lang=en ok"
  #t #f #f #t 80 #t #f "target")
  ⇒  "http://lisppad.app:80/?lang=en#target"
```

## File URLs

**(file-url?&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(file-url?&#x20;**_**url dir?**_**)**

If _dir?_ is not provided, `file-url?` returns `#t` if _obj_ is a string containing a valid file URL; `#f` otherwise. If _dir?_ is provided and set to true, `file-url?` returns `#t` if _obj_ is a string containing a valid file URL and the file URL refers to a directory; `#f` otherwise. If _dir?_ is provided and set to `#f`, `file-url?` returns `#t` if _obj_ is a string containing a valid file URL and the file URL refers to a regular file; `#f` otherwise.

**(file-url&#x20;**_**path**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(file-url&#x20;**_**path base**_**)**\
**(file-url&#x20;**_**path base expand?**_**)**

Returns a file URL string for the given file _path_. If file URL _base_ is provided, _path_ is considered to be relative to _base_. If _base_ is not provided or set to `#f` and _path_ is a relative path, it is considered relative to the current directory. If _expand?_ is given and set to true, symbolic links are getting resolved in the resulting file URL.

**(file-url-standardize&#x20;**_**url**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(file-url-standardize&#x20;**_**url expand?**_**)**

Returns a standardized version of file URL _url_. If _expand?_ is given and set to true, symbolic links are getting resolved in the resulting file URL.

## URL encoding

**(url-encode&#x20;**_**str**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-encode&#x20;**_**str allowed-char**_**)**\
**(url-encode&#x20;**_**str allowed-char force?**_**)**

Returns a URL/percent-encoded version of the string _str_. _allowed-char_ defines the characters that are exempted from the encoding. By default, _allowed-char_ corresponds to all characters that are allowed to be unencoded in URL queries. Argument _allowed-char_ can either be:

* `#f`: All characters get encoded
* `#t`: The default characters are allowed to be unencoded.
* Symbols `user`, `password`, `host`, `path`, `query`, `fragment`: The characters that are allowed in the respective URL components.
* String: All characters included in the string are allowed to be unencoded.
* Character set: All characters included in the character set (as defined by library `(lispkit char-set)` are allowed to be unencoded.

If argument _force?_ is set to `#t`, it is guaranteed that `url-encode` returns a string. If argument _force?_ is set to `#f` (the default), then `url-encode` might return `#f` if encoding fails.

**(url-decode&#x20;**_**str**_**)**     <img class="kind" src="/img/proc.png" alt="procedure">\
**(url-decode&#x20;**_**str force?**_**)**

Returns a decoded version of the URL/percent-encoded string _str_. If argument _force?_ is set to `#t`, it is guaranteed that `url-decode` returns a string. If argument _force?_ is set to `#f` (the default), then `url-decode` might return `#f` if decoding fails.
