---
sidebar_position: 10
---

# (lispkit archive tar)

Library `(lispkit archive tar)` provides an API for creating and managing tar archives. `(lispkit archive tar)` manages tar archives fully in memory, i.e. they are created and mutated in memory and can be saved and loaded from disk. A tar archive is made up of file objects, also called _tar entries_, which consist of the actual file data, compressed or uncompressed, as well as metadata, such as creation and modification date and file permissions.

### Constructors

**(make-tar-archive)**  <img class="kind" src="/img/proc.png" alt="procedure">\
**(make-tar-archive&#x20;**_**bytevector**_**)**\
**(make-tar-archive&#x20;**_**bytevector start**_**)**\
**(make-tar-archive&#x20;**_**bytevector start end**_**)**

Returns a new tar archive. If no argument is provided, a new, empty tar archive object is created. Otherwise, a tar archive is created from the binary data provided by _bytevector_ between indices _start_ and _end_.

If is an error if _bytevector_, between _start_ and _end_, is not encoded using a supported tar encoding. At this point, the basic tar format and POSIX encodings _ustar_ and _pax_ are supported. If _end_ is not provided, it is assumed to be the length of _bytevector_. If _start_ is not provided, it is assumed to be 0.

### Reading and writing archives

**(load-tar-archive&#x20;**_**filepath**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Loads the tar file at path _filepath_ and stores its content in a new tar archive object in memory. This new object is returned by `load-tar-archive`. It is an error if the file at the given file path is not in a supported tar file format. Supported tar file formats are the basic tar format as well as the two POSIX encodings _ustar_ and _pax_.

**(save-tar-archive&#x20;**_**archive**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">\
**(save-tar-archive&#x20;**_**archive filepath**_**)**

Saves the given tar _archive_ at path _filepath_ using the _pax_ encoding. If the archive was previously loaded from disk, then it is possible to omit parameter _filepath_ and overwrite the previously loaded archive at the same location on disk.

### Properties of archives

**tar-archive-type-tag**   <img class="kind" src="/img/const.png" alt="constant">

Symbol representing the `tar-archive` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all tar archive objects.

**(tar-archive?&#x20;**_**obj**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a tar archive object; otherwise `#f` is returned.

**(tar-archive-path&#x20;**_**archive**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the file path of _archive_ or `#f` if _archive_ was not loaded from disk, i.e. it was created via `make-tar-archive`.

**(tar-archive-bytevector&#x20;**_**archive**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Procedure `tar-archive-bytevector` returns _archive_ encoded using the _pax_ format into a bytevector. This bytevector can be written to disk or used to create an in-memory copy of the tar archive via `make-tar-archive`.

**(tar-entry-count&#x20;**_**archive**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of entries in tar _archive_.

**(tar-entries&#x20;**_**archive**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(tar-entries&#x20;**_**archive prefix**_**)**

Returns a list of file paths for all entries of tar _archive_ which have _prefix_ as their file path prefix. If _prefix_ is not given, the file paths of all entries are being returned as a list.

### Introspecting entries

Entries in zip archives are referred to via their relative file path in the archive. All procedures that provide information about a zip archive entry therefore expect two arguments: the zip archive and a file path.

**(tar-entry-exists?&#x20;**_**archive path**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">\
**(tar-entry-exists?&#x20;**_**archive path prefix?**_**)**

Returns `#t` if _archive_ contains an entry for _path_ (string) if _prefix?_ is `#f`, or _archive_ contains an entry whose path is a prefix of _path_ if _prefix?_ is `#t`.

**(tar-entry-file?&#x20;**_**archive path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _archive_ contains an entry for the given path and this entry is a file. If _path_ does not refer to a valid entry in _archive_, the procedure `tar-entry-file?` fails with an error.

**(tar-entry-directory?&#x20;**_**archive path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _archive_ contains an entry for the given path and this entry is a directory. If _path_ does not refer to a valid entry in _archive_, the procedure `tar-entry-directory?` fails with an error.

**(tar-entry-symlink?&#x20;**_**archive path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _archive_ contains an entry for the given path and this entry is a symbolic link. If _path_ does not refer to a valid entry in _archive_, the procedure `tar-entry-symlink?` fails with an error.

**(tar-entry-linked&#x20;**_**archive path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

If _archive_ contains an entry for the given _path_ and this entry is a symbolic link, then procedure `tar-entry-linked` returns the path of the linked file as a string, otherwise `#f` is returned. If _path_ does not refer to a valid entry in _archive_, the procedure `tar-entry-linked` fails with an error.

**(tar-entry-creation-date&#x20;**_**archive path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the creation date of the entry to which _path_ refers to in _archive_. If there is no entry in _archive_ for the given _path_, `#f` gets returned.

**(tar-entry-modification-date&#x20;**_**archive path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the modification date of the entry to which _path_ refers to in _archive_. If there is no entry in _archive_ for the given _path_, `#f` gets returned.

**(tar-entry-permissions&#x20;**_**archive path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the access permissions of the entry to which _path_ refers to in _archive_ as a fixnum (Unix style). If there is no entry in _archive_ for the given _path_, `#f` gets returned.

Permission numbers can be created by selecting from the following attributes and summing up the corresponding values: _Read by owner_ (400), _Write by owner_ (200), _Execute by owner_ (100), _Read by group_ (040), _Write by group_ (020), _Execute by group_ (010), _Read by others_ (004), _Write by others_ (002), _Execute by others_ (001).

**(tar-entry-size&#x20;**_**archive path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the size of the entry in bytes to which _path_ refers to in _archive_. If there is no entry in _archive_ for the given _path_, `#f` gets returned.

**(tar-entry-data&#x20;**_**archive path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the data of the entry to which _path_ refers to in _archive_ as a bytevector. If there is no entry in _archive_ for the given _path_, `#f` gets returned.

### Adding and removing entries

**(add-tar-entry!&#x20;**_**archive path base**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(add-tar-entry!&#x20;**_**archive path base recursive?**_**)**

Adds the file, directory, or symbolic link at _path_ relative to path _base_ to the given tar _archive_. The corresponding entry in _archive_ is identified via _path_. If the entry is a directory and parameter _recursive?_ is true, all entries in the directory are added to _archive_ as well.

**(set-tar-entry!&#x20;**_**archive path content**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(set-tar-entry!&#x20;**_**archive path content mdate**_**)**\
**(set-tar-entry!&#x20;**_**archive path content mdate permissions**_**)**

Adds or overwrites the entry in _archive_ at _path_. Parameter _content_ determines whether the new entry is a file, directory, or symbolic link. If _content_ is a bytevector, the new entry is a file containing the data of the bytevector. If _content_ is a string, it represents a path of a symbolic link. If _content_ is `()`, the new entry is a directory.

The creation date of the new entry is the current date, the modification date is _mdate_ or the current date if _mdate_ is not provided. The permissions are _permissions_ or an entry type specific default (`644` for files, and `755` otherwise).

**(delete-tar-entry!&#x20;**_**archive path**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(delete-tar-entry!&#x20;**_**archive path prefix?**_**)**

Deletes the entry at _path_ from _archive_. If argument _prefix?_ is true, _path_ is interpreted as a prefix and all entries with prefix _path_ are deleted.

### Extracting entries

**(extract-tar-entry&#x20;**_**archive path base**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(extract-tar-entry&#x20;**_**archive path base prefix?**_**)**

Extracts the entry at _path_ in _archive_ and stores it on the file system at _path_ relative to path _base_. If _prefix?_ is true, all entries with prefix _path_ are extracted.

**(get-tar-entry&#x20;**_**archive path**_**)**   <img class="kind" src="/img/proc.png" alt="procedure">

Returns a representation of the entry at _path_ in _archive_. If the entry is a file, `get-tar-entry` returns the content of this file as a bytevector. If the entry is a symbolic link, then the target of the link is returned as a string. If the entry is a directory, `()` is returned. The procedure fails if the entry does not exist.
