#<a name='title'>O.dot</a> [![Build Status](https://travis-ci.org/TonyMtz/o-dot.svg?branch=master)](https://travis-ci.org/TonyMtz/o-dot)
===
***Note:** This package still on development.*

Some extra functions for collections. All functions will not modify the original collection. All functions are focused more on performance than compatibility.

## <a name='toc'>Table of Contents</a>

  1. [Installation](#installation)
  1. [Usage](#usage)
  1. [Functions](#functions)
    * [each](#each)
    * [where](#where)
    * [any](#any)
    * [select](#select)
    * [take](#take)
    * [skip](#skip)
    * [first](#first)
    * [last](#last)
    * [count](#count)
    * [index](#index)
    * [pluck](#pluck)
    * [sum](#sum)
    * [max](#max)
    * [min](#min)
    * [flatten](#flatten)
    * [map](#map)
    * [filter](#filter)
  1. [Utils](#utils)
    * [extend](#extend)
    * [mixin](#mixin)
  1. [Known bugs](#bugs)

####[[⬆]](#toc) <a name='installation'>Installation:</a>
Save the file [JSArrayExtended.min.js](https://raw.githubusercontent.com/TonyMtz/JSArrayExtended/master/dist/JSArrayExtended.min.js) somewhere in your project and import it.

If HTML page, you cant import it with something like:

```
<script src="./path_to_file/o.js"></script>
```

Else, in Nodejs you can import it with this:

```
require('./path_to_file/o');
```
Easy, right?

####[[⬆]](#toc) <a name='usage'>Usage:</a>

Once you've imported the file, the Array prototype is augmented with all functions. Don't be worried about overwrite prototype's original functionality, the script automatically will check if each function already exists.

####[[⬆]](#toc) <a name='functions'>Functions:</a>

<a name='each'>each(callback)</a>

Iterates over the array elements and invokes the given callback function. The callback is bound to array's context, when invoked receives two arguments, the item and the index of the item in the array.

```
o.each([1, 2, 3], function (element) { console.log(element); });

>> 123
```

<a name='where'>where(spec)</a>

Creates a new array that contains all the elements that satisfies the given specification. The spec is a callback function actually, it should return a boolean to decide if a element shall or not be included in the new array.

```
o.where([1, 2, 3], function (element) { return 2 > element; });

>> 3
```

<a name=''></a>

Working...

####[[⬆]](#utils) <a name='bugs'>Utils:</a>

Working...

####[[⬆]](#toc) <a name='bugs'>Known Bugs:</a>

Working...

####[[⬆]](#toc) <a name='future'>The Future of the Application:</a>

Working...

This package still on development.
- tonymtz
