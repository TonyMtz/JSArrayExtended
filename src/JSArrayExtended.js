;(function(root) {
  'use strict';

  var
    // Some needed functions
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

  var o = {};

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = o;
    }
    exports.o = o;
  } else {
    root.o = o;
  }

  var assert = function(condition, message) {
    if (!condition) {
      throw Error('Assert failed' + (typeof message !== 'undefined' ? ': ' + message : ''));
    }
  };

  o.VERSION = o.version = '0.1.0';

  o.each = function(collection, callback) {
    var length;
    assert(collection, 'collection was not given');
    length = collection.length;
    if (!length) {
      return callback;
    }
    callback = isFunction(callback) ? callback : functionK;
    for (var index = 0; index < length; index += 1) {
      callback.call(collection, collection[index], index);
    }
    return collection;
  };

  o.where = function(collection, callback) {
    var length,
      buffer;
    assert(collection, 'collection was not given');
    length = collection.length;
    buffer = [];
    if (!length) {
      return buffer;
    }
    callback = isFunction(callback) ? callback : functionK;
    this.each(collection, function(element, index) {
      if (callback.call(collection, element, index)) {
        buffer.push(element);
      }
    });
    return buffer;
  };

  o.any = function(collection, callback) {
    var length;
    assert(collection, 'collection was not given');
    length = collection.length;
    if (!length) {
      return false;
    }
    callback = isFunction(callback) ? callback : simpleCompare(callback);
    for (var index = 0; index < length; index += 1) {
      if (callback.call(this, collection[index], index)) {
        return true;
      }
    }
    return false;
  };

  o.select = function(collection, callback) {
    var length,
      buffer;
    assert(collection, 'collection was not given');
    length = collection.length;
    buffer = [];
    callback = isFunction(callback) ? callback : simpleCompare(callback);
    if (length) {
      this.each(collection, function(element, index) {
        buffer.push(callback.call(this, element, index));
      });
    }
    return buffer;
  };

  o.take = function(collection, howMany, callback) {
    var length,
      buffer,
      current;
    assert(collection, 'collection was not given');
    length = collection.length;
    buffer = [];
    howMany = parseInt(howMany, 10) || 0;
    if (!length || 1 > howMany) {
      return buffer;
    }
    callback = isFunction(callback) ? callback : functionK;
    for (var index = 0; index < length && howMany > 0; index += 1) {
      current = collection[index];
      if (callback.call(this, current, index)) {
        buffer.push(current);
        if(buffer.length >= howMany) {
          return buffer;
        }
      }
    }
    return buffer;
  };

  o.skip = function(collection, howMany) {
    var length = collection.length,
      buffer = collection.slice();
    howMany = parseInt(howMany, 10) || 0;
    if (!length || 1 > howMany) {
      return buffer;
    }
    buffer.splice(0, howMany);
    return buffer;
  };

  o.first = function(collection, callback) {
    var length = collection.length,
      buffer = null,
      current;
    if (length === 1) {
      return collection[0];
    }
    buffer = null;
    if (!length) {
      return buffer;
    }
    callback = isFunction(callback) ? callback : functionK;
    for (var index = 0; index < length; index += 1) {
      current = collection[index];
      if (callback.call(this, current, index)) {
        return current;
      }
    }
    return buffer;
  };

  o.last = function(collection, callback) {
    var length = collection.length,
      buffer = null,
      current;
    if (length === 1) {
      return collection[0];
    }
    buffer = null;
    if (!length) {
      return buffer;
    }
    callback = isFunction(callback) ? callback : functionK;
    for (var index = length - 1; index >= 0; index -= 1) {
      current = collection[index];
      if (callback.call(this, current, index)) {
        return current;
      }
    }
    return buffer;
  };

  o.count = function(collection, callback) {
    var length = collection.length,
      buffer = 0,
      current;
    if (!length) {
      return buffer;
    }
    if (!isFunction(callback)) {
      return length;
    }
    for (var index = 0; index < length; index += 1) {
      current = collection[index];
      if (callback.call(this, current, index)) {
        buffer += 1;
      }
    }
    return buffer;
  };

  o.index = function(collection, callback) {
    var length = collection.length,
      buffer = -1,
      current;
    if (!length) {
      return buffer;
    }
    callback = isFunction(callback) ? callback : simpleCompare(callback);
    for (var index = 0; index < length; index += 1) {
      current = collection[index];
      if (callback.call(this, current, index)) {
        return index;
      }
    }
    return buffer;
  };

  o.pluck = function(collection, property) {
    var length = collection.length,
      buffer = [];

    if (!property) {
      return buffer;
    }

    if (length) {
      for (var index = 0; index < length; index += 1) {
        buffer.push(collection[index][property]);
      }
    }
    return buffer;
  };

  o.sum = function(collection, callback) {
    var length = collection.length,
      buffer = 0;
    if (!length) {
      return buffer;
    }
    callback = isFunction(callback) ? callback : functionK;
    for (var index = 0; index < length; index += 1) {
      buffer += callback.call(this, collection[index], index);
    }
    return buffer;
  };

  o.max = function(collection, callback) {
    var length = collection.length,
      max;
    if (!length) {
      return null;
    }
    callback = isFunction(callback) ? callback : substract;
    max = collection.reduce(
      function (a, b) {
        if (callback.call(this, a, b) >= 0) {
          return a;
        }
        return b;
      }
    );
    return max;
  };

  o.min = function(collection, callback) {
    var length = collection.length,
      min;
    if (!length) {
      return null;
    }
    callback = isFunction(callback) ? callback : substract;
    min = collection.reduce(
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
  };

  o.flatten = function(collection) {
    var self = this,
      buffer = [];
    this.each(collection, function (x) {
      if (isArray(x)) {
        x = self.flatten(x);
      }
      buffer = buffer.concat(x);
    });
    return buffer;
  };

  o.map = function() {
    console.log('#map not tested yet');
    return;
    // var result = [];
    // this.each(collection, function (i) {
    //   result.push(callback(i));
    // });
    // return result;
  };

  o.filter = function() {
    console.log('#filter not tested yet');
    return;
    // var result = [];
    // this.each(collection, function (i) {
    //   if (func(i)) {
    //     result.push(i);
    //   }
    // });
    // return result;
  };

  o.dot = function() {
    console.log('=========================================');
    console.log('\n ██████╗       ██████╗  ██████╗ ████████╗\n██╔═══██╗      ██╔══██╗██╔═══██╗╚══██╔══╝\n██║   ██║█████╗██║  ██║██║   ██║   ██║\n██║   ██║╚════╝██║  ██║██║   ██║   ██║\n╚██████╔╝      ██████╔╝╚██████╔╝   ██║\n ╚═════╝       ╚═════╝  ╚═════╝    ╚═╝\n');
    console.log('=========================================');
  };
}(this));
