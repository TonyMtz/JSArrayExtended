"use strict";

var is_function = function (value) {
        return typeof value === 'function';
    },
    is_array = function (value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    },
    functionK = function (k) {
        return k;
    };

Array.prototype.each = function (callback) {
    callback = is_function(callback) ? callback : functionK;
    this.reduce(
        function (a, b, c) {
            callback.call(this, b, c);
        },
        null
    );
};

Array.prototype.where = function (spec) {
    var buffer = [];
    spec = is_function(spec) ? spec : functionK;
    buffer = this.reduce(
        function (a, b) {
            if (spec.call(this, b)) {
                a.push(b);
            }
            return a;
        },
        buffer
    );
    return buffer;
};

Array.prototype.any = function (spec) {
    var buffer,
        i,
        len;
    if (is_function(spec)) {
        buffer = this.where(spec);
        if (buffer.length > 0) {
            return true;
        }
    } else {
        len = this.length;
        for (i = 0; i < len; i += 1) {
            if (this[i] === spec) {
                return true;
            }
        }
    }
    return false;
};

Array.prototype.select = function (spec) {
    var buffer = [];
    spec = is_function(spec) ? spec : functionK;
    buffer = this.reduce(
        function (a, b) {
            a.push(spec.call(this, b));
            return a;
        },
        buffer
    );
    return buffer;
};

Array.prototype.take = function (howMany, spec) {
    var i = 0,
        value,
        buffer = [];
    if (is_function(spec)) {
        value = this[i];
        do {
            if (spec.call(this, value)) {
                buffer.push(value);
            }
            i += 1;
            value = this[i];
        } while (value && buffer.length < howMany);
    } else {
        buffer = this.slice(0, howMany);
    }
    return buffer;
};

Array.prototype.skip = function (howMany) {
    var buffer = this.slice();
    howMany = howMany || 0;
    buffer.splice(0, howMany);
    return buffer;
};

Array.prototype.first = function (spec) {
    var element;
    element = (is_function(spec)) ?
            this.take(1, spec)[0] :
            element = this.take(1)[0];
    return element || null;
};

Array.prototype.last = function (spec) {
    var i = this.length - 1,
        value = this[i];
    if (is_function(spec)) {
        do {
            if (spec.call(this, value)) {
                return value;
            }
            i -= 1;
            value = this[i];
        } while (value);
    } else {
        return value || null;
    }
    return null;
};

Array.prototype.count = function (spec) {
    var sum = 0;
    if (is_function(spec)) {
        this.reduce(
            function (a, b) {
                if (spec.call(this, b)) {
                    sum += 1;
                }
            },
            null
        );
    } else {
        this.reduce(
            function () {
                sum += 1;
            },
            null
        );
    }
    return sum;
};

Array.prototype.index = function (spec) {
    var index;
    index = (is_function(spec)) ?
            this.reduce(
                function (a, b, c) {
                    var index;
                    if (spec.call(this, b)) {
                        index = c;
                    } else {
                        index = a;
                    }
                    return index;
                },
                null
            ) :
            this.reduce(
                function (a, b, c) {
                    var index;
                    if (b === spec) {
                        index = c;
                    } else {
                        index = a;
                    }
                    return index;
                },
                null
            );
    return index;
};

Array.prototype.pluck = function (property) {
    var buffer = [];
    buffer = this.reduce(function (a, b) { a.push(b[property]); return a; }, buffer);
    return buffer;
};

Array.prototype.sum = function (spec) {
    var sum = 0;
    sum = (is_function(spec)) ?
            this.reduce(function (a, b) { return a + spec.call(this, b); }, sum) :
            this.reduce(function (a, b) { return a + b; }, sum);
    return sum;
};

Array.prototype.max = function (comparer) {
    var max;
    if (is_function(comparer)) {
        max = this.reduce(
            function (a, b) {
                if (comparer.call(this, a, b) >= 0) {
                    return a;
                }
                return b;
            }
        );
    } else {
        max = this.reduce(
            function (a, b) {
                if (a > b) {
                    max = a;
                    return max;
                }
                return b;
            },
            max
        );
    }
    return max;
};

Array.prototype.min = function (comparer) {
    var min;
    if (is_function(comparer)) {
        min = this.reduce(
            function (a, b) {
                if (comparer.call(this, a, b) <= 0) {
                    return a;
                }
                return b;
            }
        );
    } else {
        min = this.reduce(
            function (a, b) {
                if (a > b) {
                    min = a;
                    return min;
                }
                return b;
            },
            min
        );
    }
    return min;
};

Array.prototype.flatten = function () {
    var buffer = [];
    buffer = this.reduce(function (a, b) {
        if (is_array(b)) {
            b = b.flatten();
        }
        return a.concat(b);
    }, buffer);
    return buffer;
};

Array.prototype.reduce = function (callback, opt_initialValue) {
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
};