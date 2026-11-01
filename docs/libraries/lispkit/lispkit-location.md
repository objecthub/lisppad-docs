---
sidebar_position: 440
---

# (lispkit location)

Library `(lispkit location)` implements procedures for geocoding and reverse geocoding and provides representations of _locations_ (latitude, longitude, altitude) and _places_ (structured representation of addresses). Since geocoding operations take some time, procedures typically return Futures as implemented by library `(lispkit thread future)`.

## Locations

A _location_ consists of a latitude, a longitude, and an optional altitude. Locations are represented as lists of two or three flonum values.

**(location?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if the given expression _obj_ is a valid location; returns `#f` otherwise.

**(location&#x20;**_**latitude longitude**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(location&#x20;**_**latitude longitude altitude**_**)**

Creates a location for the given _latitude_, _longitude_, and _altitude_. This procedure fails with an error if any of the provided arguments are not flonum values.

**(current-location)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a future which eventually refers to the current device location. If a device location can't be determined, the returned future will refer to `#f`. Similarly, the returned future will refer to `#f` if the user did not authorize the device to reveal the location.

**(location-latitude&#x20;**_**loc**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the latitude of location _loc_.

**(location-longitude&#x20;**_**loc**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the longitude of location _loc_.

**(location-altitude&#x20;**_**loc**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the altitude of location _loc_. Since altitudes are optional, procedure `location-altitude` returns `#f` if the altitude is undefined.

**(location-distance&#x20;**_**loc1 loc2**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the distance between location _loc1_ and location _loc2_ in meters.

**(location->timezone&#x20;**_**loc**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a timezone identifier (string) for location _loc_.

## Places

A _place_ is a structured representation describing a place on Earth. Its main components are address components, but a place might also provide meta-information such as the timezone of the place or the ISO country code. Library `(lispkit date-time)` provides more functionality to deal with such meta-data. Places are represented as lists of one to ten strings in the following order:

1. ISO country code
2. Country
3. Region (a part of the country; e.g. State, Bundesland, Kanton, etc.)
4. Administrational region (a part of the region; e.g. County, Landkreis, etc.)
5. Postal code
6. City
7. Locality (a part of the city; e.g. District, Stadtteil, etc.)
8. Street
9. Street number
10. Time zone

Note that all components are optional. An optional component is represented as `#f`.

**(place?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if the given expression _obj_ is a valid place; returns `#f` otherwise.

**(place&#x20;**_**code**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(place&#x20;**_**code country**_**)**\
**(place&#x20;**_**code country region**_**)**\
**(place&#x20;**_**code country region admin**_**)**\
**(place&#x20;**_**code country region admin zip**_**)**\
**(place&#x20;**_**code country region admin zip city**_**)**\
**(place&#x20;**_**code country region admin zip city locality**_**)**\
**(place&#x20;**_**code country region admin zip city locality street**_**)**\
**(place&#x20;**_**code country region admin zip city locality street nr**_**)**\
**(place&#x20;**_**code country region admin zip city locality street nr tz**_**)**

Returns a location for the given components of a place. Each component is either `#f` (= undefined) or a string.

**(place-country-code&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the country code for place _pl_ as a string or `#f` if the country code is undefined.

**(place-country&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the country for place _pl_ as a string or `#f` if the country is undefined.

**(place-region&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the region for place _pl_ as a string or `#f` if the region is undefined.

**(place-admin&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the administrational region for place _pl_ as a string or `#f` if the administrational region is undefined.

**(place-postal-code&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the postal code for place _pl_ as a string or `#f` if the postal code is undefined.

**(place-city&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the city for place _pl_ as a string or `#f` if the city is undefined.

**(place-locality&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the locality for place _pl_ as a string or `#f` if the locality is undefined.

**(place-street&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the street for place _pl_ as a string or `#f` if the street is undefined.

**(place-street-number&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the street number for place _pl_ as a string or `#f` if the street number is undefined.

**(place-timezone&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the timezone for place _pl_ as a string or `#f` if the timezone is undefined.

## Geocoding

**(geocode&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(geocode&#x20;**_**obj locale**_**)**

Returns a future for a list of locations at the given place or address. _obj_ is either a valid place representation or it is an address string. _locale_ is a symbol representing a locale, which is used to interpret the given place or address. The future returned by `geocode` signals an error if the geocoding operation fails, e.g. if there is no network access.

```scheme
(future-get (geocode "Brandschenkestrasse 110, Zürich" 'de_CH))
⇒ ((47.365535 8.524876))
```

**(reverse-geocode&#x20;**_**loc**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(reverse-geocode&#x20;**_**loc locale**_**)**\
**(reverse-geocode&#x20;**_**lat long**_**)**\
**(reverse-geocode&#x20;**_**lat long locale**_**)**

Returns a future for a list of places at the given location. _loc_ is a valid location. _lat_ and _long_ describe latitude and longitude as flonums directly. _locale_ is a symbol representing a locale. It is used for the place representations returned by `reverse-geocode`.

```scheme
(future-get (reverse-geocode (location 47.36541 8.5247) 'en_US))
⇒ (("CH" "Switzerland" "ZH" "Zürich"
    "8002" "Zürich" "Enge"
    "Brandschenkestrasse" "110" "Europe/Zurich"))
```

**(place->address&#x20;**_**pl**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Formats a place as an address. For this operation to succeed, it is important that the country code of the place _pl_ is set as it is used to determine the address format.

```scheme
(define pl (car (future-get (reverse-geocode (location 47.36541 8.5247) 'de_CH))))
pl ⇒ ("CH" "Schweiz" "ZH" "Zürich"
       "8002" "Zürich" "Enge"
       "Brandschenkestrasse" "110" "Europe/Zurich")
(display (place->address pl))
⇒
Brandschenkestrasse 110
8002 Zürich
Schweiz
```

**(address->place&#x20;**_**str**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(address->place&#x20;**_**str locale**_**)**

Parses the given address string _str_ into a place (or potentially multiple possible places) and returns a future referring to this as a list of places. _locale_ is a symbol representing a locale. It is used for the place representations returned by `address->place`.

```scheme
(future-get (address->place "Brandschenkestrasse 110, Zürich"))
⇒ (("CH" "Switzerland" "Zürich" "Zürich"
    "8002" "Zürich" "Enge"
    "Brandschenkestrasse" "110" "Europe/Zurich"))
```
