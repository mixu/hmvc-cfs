HMVC-CFS - a HMVC style cascading file system
=============================================
A cascading filesystem is an elegant solution to a common problem: how to provide a mechanism for loading modules and reusing code?

See my blog post for details:



Load order and file name resolution
===================================

The load order for my implementation is:

Application path –  files under ./application/ are always checked first.
Module paths – set modules(['./modules/my-module']) to enable module loading. Files from modules are loaded from in the order they are added.
System path – files under ./system/ are loaded if no alternative exists.
Assumptions about file and class names

Files are assumed to be lowercase. Underscores in class names are replaced by slashes (so Controller_User becomes ./application/classes/ controller/user.js).

Performance impact
==================

Requests are cached, so that additional calls to find_file() do not cause additional stat() calls in the filesystem. This is insignificant anyway, since Node.js servers are persistent so the cascading search is only done once per server instance for each file (not once per request).

Loading 3rd party code
======================
The loaded files do not need to be “compatible” in any way other than layout in the file system. For example, while Hmvc.factory(‘some_other_lib’) loads the file from ./application/ classes/some/other/lib.js, that file does not actually need to contain a class named some_other_lib; just that it returns something via module.exports.

Methods
=======
The methods are:

Hmvc.modules(['./modules/path-to-module']) – set the modules directories to search.
Hmvc.find_file(dir, file, ext) – Search each path under dir (e.g. ‘classes’, ‘views’) for file (filename) with the extension (ext, default is “.js”).
Hmvc.factory(class_name) – Return a new instance of the given class after loading the corresponding file from the cascading file system. Note that classes should be in the classes subdirectory.
Hmvc.load(class_name) – Return whatever require(file-which-contains-the-class) returns. Useful for extending classes, see below for an example.

LICENCE (Simplified BSD licence)
===============================
Please consult a lawyer if you need legal advice.

Copyright 2010 Mikito Takada. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY MIKITO TAKADA ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL MIKITO TAKADA OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the authors and should not be interpreted as representing official policies, either expressed or implied, of Mikito Takada.

Not that I have any official policies.

