Simple loop
=============

Simple loop is an abstraction for iterating over arrays and objects the same way.
If an array is given, it will loop over it from the first item to the last one.
If an object is given, then the order will be the same as if `for ... in` were used.
Simple loop also loops through an array which length changes while looping.

Installation
============

```bash
npm install simple-loop
```

How to use
==========

Require simple-loop:


```js
var loop = require("simple-loop");
```

Use it with an array:

```js
var anArray = ["with", "some", "data"];

loop(anArray, function (value, key, iteratedObject) {
    // this === scope;
    // value is each item
    // key is each index
    // iteratedObject === anArray
}, scope /* optional object */);
```

Use it with an object:

```js
var anObject = {
  "property1": "with",
  "property2": "some",
  "property3": "data"
};

loop(anObject, function (value, key, iteratedObject) {
    // this === scope;
    // value is each property's value
    // key is property name
    // iteratedObject === anArray
}, scope /* optional object */);
```

CHANGELOG
=========

#### 0.0.4 - 7 MAY 2015

* Remove dependency on assert and use custom assert function instead. Saves 17kb in the end after browserification. Thanks to [@tomekwi](https://github.com/tomekwi).

LICENSE
=======

MIT
