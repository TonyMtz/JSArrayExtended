;(function() {
  'use strict';

  var m, // used to enumerate properties
    isFunction = function (value) {
        return typeof value === 'function';
    }, // Checks if the value is a function

    // isArray = function (value) {
    //     return Object.prototype.toString.apply(value) === '[object Array]';
    // }, // Checks if the value is an array

    functionK = function (value) {
        return value;
    }, // Default function wich returns the same value

    // substract = function (a, b) {
    //     return a - b;
    // }, // Return the result of the substract

    simpleCompare = function (a, b) {
      /* jshint unused: false */
      return function (b) {
        return a === b;
      };
    }; // Compare if the arguments are equals or not

  var arrayApi = {
    each: function (callback) {
      var length = this.length;
      if (length) {
        callback = isFunction(callback) ? callback : functionK;
        for (var index = 0; index < length; index += 1) {
          callback(this[index], index);
        }
      }
      return this;
    },
    where: function (callback) {
      var buffer = [];
      this.each(function (element, index) {
        if (callback(element, index)) {
          buffer.push(element);
        }
      });
      return buffer;
    },
    any: function (callback) {
      var length = this.length;
      if (length) {
        callback = isFunction(callback) ? callback : simpleCompare(callback);
        for (var index = 0; index < length; index += 1) {
          if (callback(this[index], index)) {
            return true;
          }
        }
      }
      return false;
    },
    select: function () {
      console.error('#select is not implemented yet');
    },
    take: function () {
      console.error('#take is not implemented yet');
    },
    skip: function () {
      console.error('#skip is not implemented yet');
    },
    first: function () {
      console.error('#first is not implemented yet');
    },
    last: function () {
      console.error('#last is not implemented yet');
    },
    count: function () {
      console.error('#count is not implemented yet');
    },
    index: function () {
      console.error('#index is not implemented yet');
    },
    pluck: function () {
      console.error('#pluck is not implemented yet');
    },
    sum: function () {
      console.error('#sum is not implemented yet');
    },
    max: function () {
      console.error('#max is not implemented yet');
    },
    min: function () {
      console.error('#min is not implemented yet');
    },
    flatten: function () {
      console.error('#flatten is not implemented yet');
    },
    map: function (callback) {
      console.log('#map not tested yet');
      var result = [];
      this.each(function (i) {
        result.push(callback(i));
      });
      return result;
    },
    filter: function (func) {
      console.log('#filter not tested yet');
      var result = [];
      this.each(function (i) {
        if (func(i)) {
          result.push(i);
        }
      });
      return result;
    },
    reduce: function (func, start) {
      console.log('#reduce not tested yet');
      var result = start;
      this.each(function (i) {
        result = func(i, result);
      });
      return result;
    }
  };

  for (m in arrayApi) {
    if (arrayApi.hasOwnProperty(m)) {
      if (!isFunction(Array.prototype[m])) {
        Array.prototype[m] = arrayApi[m];
      }
    }
  }
}());
