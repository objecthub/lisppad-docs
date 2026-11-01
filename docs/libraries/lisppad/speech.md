---
sidebar_position: 60
---

# (lisppad speech)

Library `(lisppad speech)` provides a speech synthesis API which parses text and converts it into audible speech. The conversion is based on factors like the language, the _voice_, and a range of parameters which are all aggregated by _speaker_ objects.

## Speech synthesis

**(speak&#x20;**_**text**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(speak&#x20;**_**text speaker**_**)**

Speaks the given string _text_ using with the _speaker_ object providing all speech synthesis parameters. If _speaker_ is not provided, the value of parameter object `current-speaker` is used.

**(phonemes&#x20;**_**text**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(phonemes&#x20;**_**text speaker**_**)**

Converts the given natural language string _text_ into a string of phonemes using the given _speaker_. If _speaker_ is not provided, the value of parameter object `current-speaker` is used.

Speakers can be configured to speak phonemes instead of natural language via procedure `speaker-interpret-phonemes!`.

## Speakers

A _speaker_ is an object defining speech synthesis parameters. There is a _current speaker_ which is used by default, unless a speaker is explicitly specified for the various procedures that require a speaker parameter.

A speaker object has the following components:

* an immutable voice,
* a mutable speaking rate,
* a mutable speaking volume,
* a flag determining whether the speaker interprets text or phonemes,
* a flag determining how numbers are interpreted, as well as
* a speaking pitch.

**current-speaker** <img class="kind" src="/img/param.png" alt="parameter">

Defines the _current speaker_, which is used as a default by all functions for which the speaker argument is optional. If there is no current speaker, this parameter is set to `#f`.

**(speaker?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a speaker object; otherwise `#f` is returned.

**(make-speaker)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(make-speaker&#x20;**_**voice**_**)**

Returns a new speaker for the given _voice_. If _voice_ is not provided, a default voice, specified at the operating system level, is being used. Speakers are stateful objects which can be configured with a number of procedures: `set-speaker-rate!`, `set-speaker-volume!`, `set-speaker-interpret-phonemes!`, `set-speaker-interpret-numbers!`, and `set-speaker-pitch!`.

**(speaker-voice)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(speaker-voice&#x20;**_**speaker**_**)**

Returns the voice of _speaker_. If _speaker_ is not provided, the parameter object `current-speaker` is used.

**(speaker-rate)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(speaker-rate&#x20;**_**speaker**_**)**

Returns the speaking rate of _speaker_. If _speaker_ is not provided, the parameter object `current-speaker` is used.

**(set-speaker-rate!&#x20;**_**rate**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-speaker-rate!&#x20;**_**rate speaker**_**)**

Sets the speaking rate of _speaker_ to number _rate_. If _speaker_ is not provided, the parameter object `current-speaker` is used.

**(speaker-volume)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(speaker-volume&#x20;**_**speaker**_**)**

Returns the volume of _speaker_ as a flonum ranging from 0.0 to 1.0. If _speaker_ is not provided, the parameter object `current-speaker` is used.

**(set-speaker-volume!&#x20;**_**volume**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-speaker-volume!&#x20;**_**volume speaker**_**)**

Sets the volume of _speaker_ to number _volume_ which is a flonum between 0.0 and 1.0. If _speaker_ is not provided, the parameter object `current-speaker` is used.

**(speaker-interpret-phonemes)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(speaker-interpret-phonemes&#x20;**_**speaker**_**)**

Returns `#t` if _speaker_ interprets phonemes instead of natural language text. If _speaker_ is not provided, the parameter object `current-speaker` is used.

**(set-speaker-interpret-phonemes!&#x20;**_**phoneme?**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-speaker-interpret-phonemes!&#x20;**_**phoneme? speaker**_**)**

If boolean argument _phoneme?_ is `#f`, _speaker_ is configured to interpret natural language. If _phoneme?_ is set to any other value, the _speaker_ is interpreting phonemes instead. If _speaker_ is not provided, the parameter object `current-speaker` is used.

**(speaker-interpret-numbers)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(speaker-interpret-numbers&#x20;**_**speaker**_**)**

Returns `#t` if _speaker_ interprets numbers as a natural language speaker would do ("100" is spoken as "hundred"). If it returns `#f`, _speaker_ decomposes numbers into a sequence of digits and speaks them individually ("100" is spoken as "one zero zero"). If _speaker_ is not provided, the parameter object `current-speaker` is used.

**(set-speaker-interpret-numbers!&#x20;**_**natural?**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-speaker-interpret-numbers!&#x20;**_**natural? speaker**_**)**

Sets the number interpretation of _speaker_ to boolean _natural?_. If _natural?_ is `#t` _speaker_ will interpret numbers as a natural language speaker would do ("100" is spoken as "hundred"). If _natural?_ is `#f`, _speaker_ decomposes numbers into a sequence of digits and speaks them individually ("100" is spoken as "one zero zero"). If _speaker_ is not provided, the parameter object `current-speaker` is used.

**(speaker-pitch)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(speaker-pitch&#x20;**_**speaker**_**)**

Returns the pitch of _speaker_ as a pair of two flonums: the car is the base of the pitch, and the cdr is the modulation of the pitch. If _speaker_ is not provided, the parameter object `current-speaker` is used.

**(set-speaker-pitch!&#x20;**_**pitch**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-speaker-pitch!&#x20;**_**pitch speaker**_**)**

Sets the pitch of _speaker_ to the pair of flonums _pitch_ whose car is the base of the pitch, and the cdr is the modulation of the pitch. If _speaker_ is not provided, the parameter object `current-speaker` is used.

## Voices

Voices are provided by the operating system and library `(lispkit speech)` does not have an explicit representation as objects. Symbols are used as identifiers for voices. For example, `com.apple.speech.synthesis.voice.Alex` refers to the default US voice.

A voice has the following characteristics:

* Name (string)
* Age (fixnum)
* Gender (`male` or `female`)
* Locale (symbol, e.g. `en_US`)

Library `(lispkit system)` provides means to handle _locales_, including language and country codes.

**(voice)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(voice&#x20;**_**name**_**)**\
**(voice&#x20;**_**id**_**)**

Returns a symbol identifying the voice specified by the arguments of `voice`. If no argument is provided, an indentifier for the default voice is returned. If a _name_ string is provided, then an identifier for a voice whose name is _name_ is returned, or `#f` if no such voice exists. If an _id_ symbol is provided, then an identifier for a voice whose identifier matches _id_ is returned, or `#f` if no such voice exists.

**(available-voices)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(available-voices&#x20;**_**lang**_**)**\
**(available-voices&#x20;**_**lang gender**_**)**

Returns a list of symbols identifying voices matching the given language filter _lang_ and gender filter _gender_. Both _lang_ and _gender_ are symbols. _lang_ should either be a language or locale identifier. It can also be set to `#f` if only a gender filter is needed. _gender_ should either be symbol `male` or `female`.

```scheme
(available-voices 'en)
⇒ (com.apple.speech.synthesis.voice.Alex com.apple.speech.synthesis.voice.daniel com.apple.speech.synthesis.voice.fiona com.apple.speech.synthesis.voice.Fred com.apple.speech.synthesis.voice.karen com.apple.speech.synthesis.voice.moira com.apple.speech.synthesis.voice.rishi com.apple.speech.synthesis.voice.samantha com.apple.speech.synthesis.voice.tessa com.apple.speech.synthesis.voice.veena)
(available-voices (locale "en" "GB"))
⇒ (com.apple.speech.synthesis.voice.daniel)
```

**(available-voice?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a symbol identifying an available voice, otherwise `#f` is returned. This procedure fails if _obj_ is neither a symbol nor the value `#f`.

**(voice-name&#x20;**_**voice**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the name of the voice identified by symbol _voice_.

**(voice-age&#x20;**_**voice**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the age of the voice identified by symbol _voice_.

**(voice-gender&#x20;**_**voice**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the gender of the voice identified by symbol _voice_.

**(voice-locale&#x20;**_**voice**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the locale of the voice identified by symbol _voice_.
