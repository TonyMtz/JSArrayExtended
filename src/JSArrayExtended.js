;(function() {
  'use strict';

  var m, // used to enumerate properties
    isFunction = function (value) {
        return typeof value === 'function';
    }, // Checks if the value is a function

    isArray = function (value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    }, // Checks if the value is an array

    functionK = function (value) {
        return value;
    }, // Default function wich returns the same value

    substract = function (a, b) {
        return a - b;
    }, // Return the result of the substract

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
          callback.call(this, this[index], index);
        }
      }
      return this;
    },
    where: function (callback) {
      var buffer = [];
      this.each(function (element, index) {
        if (callback.call(this, element, index)) {
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
          if (callback.call(this, this[index], index)) {
            return true;
          }
        }
      }
      return false;
    },
    select: function (callback) {
      var length = this.length,
        buffer = [];
      callback = isFunction(callback) ? callback : simpleCompare(callback);
      if (length) {
        this.each(function(element, index) {
          buffer.push(callback.call(this, element, index));
        });
      }
      return buffer;
    },
    take: function (howMany, callback) {
      var length = this.length,
        buffer = [],
        current;
      howMany = parseInt(howMany, 10) || 0;
      if (!length || 1 > howMany) {
        return buffer;
      }
      callback = isFunction(callback) ? callback : functionK;
      for (var index = 0; index < length && howMany > 0; index += 1) {
        current = this[index];
        if (callback.call(this, current, index)) {
          buffer.push(current);
          if(buffer.length >= howMany) {
            return buffer;
          }
        }
      }
      return buffer;
    },
    skip: function (howMany) {
      var length = this.length,
        buffer = this.slice();
      howMany = parseInt(howMany, 10) || 0;
      if (!length || 1 > howMany) {
        return buffer;
      }
      buffer.splice(0, howMany);
      return buffer;
    },
    first: function (callback) {
      var length = this.length,
        buffer = null,
        current;
      if (length === 1) {
        return this[0];
      }
      buffer = null;
      if (!length) {
        return buffer;
      }
      callback = isFunction(callback) ? callback : functionK;
      for (var index = 0; index < length; index += 1) {
        current = this[index];
        if (callback.call(this, current, index)) {
          return current;
        }
      }
      return buffer;
    },
    last: function (callback) {
      var length = this.length,
        buffer = null,
        current;
      if (length === 1) {
        return this[0];
      }
      buffer = null;
      if (!length) {
        return buffer;
      }
      callback = isFunction(callback) ? callback : functionK;
      for (var index = length - 1; index >= 0; index -= 1) {
        current = this[index];
        if (callback.call(this, current, index)) {
          return current;
        }
      }
      return buffer;
    },
    count: function (callback) {
      var length = this.length,
        buffer = 0,
        current;
      if (!length) {
        return buffer;
      }
      if (!isFunction(callback)) {
        return length;
      }
      for (var index = 0; index < length; index += 1) {
        current = this[index];
        if (callback.call(this, current, index)) {
          buffer += 1;
        }
      }
      return buffer;
    },
    index: function (callback) {
      var length = this.length,
        buffer = -1,
        current;
      if (!length) {
        return buffer;
      }
      callback = isFunction(callback) ? callback : simpleCompare(callback);
      for (var index = 0; index < length; index += 1) {
        current = this[index];
        if (callback.call(this, current, index)) {
          return index;
        }
      }
      return buffer;
    },
    pluck: function (property) {
      var length = this.length,
        buffer = [];

      if (!property) {
        return buffer;
      }

      if (length) {
        for (var index = 0; index < length; index += 1) {
          buffer.push(this[index][property]);
        }
      }
      return buffer;
    },
    sum: function (callback) {
      var length = this.length,
        buffer = 0;
      if (!length) {
        return buffer;
      }
      callback = isFunction(callback) ? callback : functionK;
      for (var index = 0; index < length; index += 1) {
        buffer += callback.call(this, this[index], index);
      }
      return buffer;
    },
    max: function (callback) {
      var length = this.length,
        max;
      if (!length) {
        return null;
      }
      callback = isFunction(callback) ? callback : substract;
      max = this.reduce(
        function (a, b) {
          if (callback.call(this, a, b) >= 0) {
            return a;
          }
          return b;
        }
      );
      return max;
    },
    min: function (callback) {
      var length = this.length,
        min;
      if (!length) {
        return null;
      }
      callback = isFunction(callback) ? callback : substract;
      min = this.reduce(
        function (a, b) {
          if(!a) {
            return b;
          }
          if(!b) {
            return a;
          }
          if (callback.call(this, a, b) <= 0) {
            return a;
          }
          return b;
        }
      );
      return min;
    },
    flatten: function () {
      var buffer = [];
      this.each(function (x) {
        if (isArray(x)) {
          x = x.flatten();
        }
        buffer = buffer.concat(x);
      });
      return buffer;
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
