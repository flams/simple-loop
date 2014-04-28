/**
* @license simple-loop https://github.com/flams/simple-loop
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert");

/**
 * Small abstraction for looping over objects and arrays
 * Warning: it's not meant to be used with nodeList
 * To use with nodeList, convert to array first
 * @param {Array/Object} iterated the array or object to loop through
 * @param {Function} callback the function to execute for each iteration
 * @param {Object} scope the scope in which to execute the callback
 */
module.exports = function loop(iterated, callback, scope) {
  assert(typeof iterated == "object", "simple-loop: iterated must be an array/object");
  assert(typeof callback == "function", "simple-loop: callback must be a function");

  if (Array.isArray(iterated)) {
      for (var i=0; i<iterated.length; i++) {
          callback.call(scope, iterated[i], i, iterated);
      }
  } else {
      for (var i in iterated) {
          if (iterated.hasOwnProperty(i)) {
              callback.call(scope, iterated[i], i, iterated);
          }
      }
  }
};
