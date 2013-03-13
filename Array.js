"use strict"; // Use strict

var m, // uset to enumerate properties
    is_function = function (value) {
        return typeof value === 'function';
    }, // Checks if the value is a function

    is_array = function (value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    }, // Checks if the value is an array

    functionK = function (value) {
        return value;
    }, // Default function wich returns the same value

    substract = function (a, b) {
        return a - b;
    }, // Return the result of the substract

    simpleCompare = function (a, b) {
        return function (b) {
            return a === b;
        };
    }; // Compare if the arguments are equals or not

var array_api = {    

    // Each method
    // Iterates over the array elements and executes the callback function.

    each: function (callback) {

        callback = is_function(callback) ? callback : functionK;

        this.reduce(
            function (a, b, c) {
                // a is the previous value, b is the current value, c is the current value index
                callback.call(this, b, c);
            },
            null
        );

        return this;

    },

    // Where method
    // Creates a new array that contains all the elements that satisfies the given specification. 

    where: function (spec) {

        var buffer = [];

        spec = is_function(spec) ? spec : functionK;

        this.reduce(
            function (a, b, c) {
                if (spec.call(this, b, c)) {
                    a.push(b);
                }
                return a;
            },
            buffer
        );

        return buffer;

    },

    // Any method
    // This method return a true value if any of the elements in the array satisfies the given spec

    any: function (spec) {

        var i,
            len = this.length;

        spec = is_function(spec) ? spec : simpleCompare(spec);

        for (i = 0; i < len; i += 1) {

            if (spec.call(this, this[i])) {

                return true;

            }

        }

        return false;

    },

    // Select method
    // Creates a new collection containing the elements returned by the spec function

    select: function (spec) {

        var buffer = [];

        spec = is_function(spec) ? spec : functionK;

        this.reduce(
            function (a, b, c) {
                a.push(spec.call(this, b, c));
                return a;
            },
            buffer
        );

        return buffer;
    },

    // Take method
    // Returns a new array containing ideally howMany elements.

    take: function (howMany, spec) {

        var i,
            len = this.length,
            value,
            buffer = [];

        spec = is_function(spec) ? spec : functionK;

        howMany = howMany || 0;

        for (i = 0; i < len; i += 1) {

            value = this[i];

            if (spec.call(this, value, i)) {

                buffer.push(value);

                if (buffer.length >= howMany) {

                    return buffer;

                }

            }

        }

    },

    // Skip method
    // Produces a new Array which will not include the first howMany elements.

    skip: function (howMany) {

        var buffer = this.slice();

        howMany = howMany || 0;

        buffer.splice(0, howMany);

        return buffer;

    },

    // First method
    // Will return the first element on collection that satisfies the specification, or the very first array’s element.

    first: function (spec) {

        var i,
            value,
            len = this.length;

        spec = is_function(spec) ? spec : functionK;

        for (i = 0; i < len; i += 1) {

            value = this[i];

            if (spec.call(this, value, i)) {

                return value;

            }

        }

        return null;

    },

    // Last method
    // Will return the last element on collection that satisfies the specification, or the very last array’s element.

    last: function (spec) {

        var i = this.length - 1,
            value;

        spec = is_function(spec) ? spec : functionK;

        for (i; i >= 0; i -= 1) {

            value = this[i];

            if (spec.call(this, value, i)) {

                return value;

            }

        }

        return null;

    },

    // Count method
    // Will return the number of elements on the collection that satisfies the specification.

    count: function (spec) {

        var sum = 0;

        if (!spec) {

            return this.length;

        }

        spec = is_function(spec) ? spec : functionK;

        this.reduce(
            function (a, b, c) {
                if (spec.call(this, b, c)) {
                    sum += 1;
                }
            },
            null
        );

        return sum;

    },

    // Index method
    // Will return the zero based position in the array of the element that satisfies the specification

    index: function (spec) {
        var i,
            len = this.length;

        spec = is_function(spec) ? spec : simpleCompare(spec);

        for (i = 0; i < len; i += 1) {

            if (spec.call(this, this[i], i)) {

                return i;

            }

        }

        return -1;

    },

    // Pluck method
    // This method will attempt to retrieve the given property of each element in the array and shall return a new array containing that property values

    pluck: function (property) {

        var buffer = [];

        this.reduce(function (a, b) { a.push(b[property]); return a; }, buffer);

        return buffer;

    },

    // Sum method
    // Will return the summatory of the result of executing the spec function on each array’s element

    sum: function (spec) {

        var sum;

        spec = is_function(spec) ? spec : functionK;

        sum = this.reduce(function (a, b) { return a + spec.call(this, b); }, 0);

        return sum;

    },

    // Max method
    // This method will find and return the maximum value on the collection

    max: function (comparer) {

        var max;

        comparer = is_function(comparer) ? comparer : substract;

        if (this.length <= 0) {
            return null;
        }

        max = this.reduce(
            function (a, b) {
                if (comparer.call(this, a, b) >= 0) {
                    return a;
                }
                return b;
            }
        );

        return max;

    },

    // Max method
    // This method will find and return the maximum value on the collection

    min: function (comparer) {

        var min;

        comparer = is_function(comparer) ? comparer : substract;

        if (this.length <= 0) {
            return null;
        }

        min = this.reduce(
            function (a, b) {
                if (comparer.call(this, a, b) <= 0) {
                    return a;
                }
                return b;
            }
        );

        return min;

    },

    // Flatten method
    // This method will return a new flat array

    flatten: function () {

        var buffer = [];

        this.reduce(function (a, b) {
            if (is_array(b)) {
                b = b.flatten();
            }
            return a.concat(b);
        }, buffer);

        return buffer;
    },

    reduce: function (callback, opt_initialValue) {
        if (null === this || 'undefined' === typeof this) {
            throw new TypeError ('Array.prototype.reduce called on null or undefined');
        }
        if ('function' !== typeof callback) {
            throw new TypeError(callback + ' is not a function');
        }
        var index = 0, length = this.length >>> 0, value, isValueSet = false;
        if (1 < arguments.length) {
            value = opt_initialValue;
            isValueSet = true;
        }
        for ( ; length > index; ++index) {
            if (!this.hasOwnProperty(index)) continue;
            if (isValueSet) {
                value = callback(value, this[index], index, this);
            } else {
                value = this[index];
                isValueSet = true;
            }
        }
        if (!isValueSet) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        return value;
    }
};

for(m in array_api){
    if ('function' !== typeof Array.prototype[m]) {
        Array.prototype[m] = array_api[m];
    }
}