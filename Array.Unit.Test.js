require('./Array.js');

exports.Array_Each_ConcatAllItems = function(test) {
    var array = ['a','b','c'],
        buffer = '';

    test.expect(2);
    array.each(function(x){ buffer += x; });
    test.equal(buffer, 'abc');

    buffer = '';
    array = ['a','b', null, 'c'];
    array.each(function(x){ buffer += x; });
    test.equal(buffer, 'abnullc');

    test.done();
};

exports.Array_Where_ReturnSecondItem = function(test) {
    var array = ['a','b','c'],
        buffer;
    test.expect(1);
    buffer = array.where(function(x){ return x === 'b'; });
    test.equal(buffer, 'b');
    test.done();
};

exports.Array_Any_ReturnTrueOrFalseInEachCase = function(test) {
    var array = ['a',null,'b','c'],
        check;
    test.expect(4);
    check = array.any('b');
    test.equal(check, true);
    check = array.any('d');
    test.equal(check, false);
    check = array.any(function (x) { return x === null; });
    test.equal(check, true);
    check = array.any(function (x) { return x === 'd'; });
    test.equal(check, false);
    test.done();
};

exports.Array_Select_ConcatOnlyNames = function(test) {
    var people = [ 
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        testString = 'clautonypepe',
        buffer = '';

    test.expect(1);
    people.select(function(x) {return x.name;}).each(function(x){ buffer += x; });
    test.equal(buffer, testString);
    test.done();
};

exports.Array_Take_ConcatFirstTwoNames = function(test) {
    var people = [ 
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        testString = 'clautony',
        buffer = '';

    test.expect(2);
    people
        .take(2)
        .select(function(x) { return x.name; })
        .each(function(x){ buffer += x; });
    test.equal(buffer, testString);
    buffer = '';
    people
        .take(2, function(x) { return x.age >= 20; })
        .select(function(x) { return x.name; })
        .each(function(x){ buffer += x; });
    test.equal(buffer, testString);
    test.done();
};

exports.Array_Skip_ConcatLastTwoNames = function(test) {
    var people = [ 
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        testString = 'tonypepe',
        buffer = '';

    test.expect(1);
    people
        .skip(1)
        .select(function(x) { return x.name; })
        .each(function(x){ buffer += x; });
    test.equal(buffer, testString);
    test.done();
};

exports.Array_First_ReturnFirstCoincidence = function(test) {
    var people = [
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        buffer;

    test.expect(5);

    buffer = [].first();
    test.equal(buffer, null);
    buffer = people.first().name;
    test.equal(buffer, 'clau');
    buffer = people.first(function(x) { return x.age === 22; }).name;
    test.equal(buffer, 'tony');

    people = [
        3,
        1,
        2,
    ]

    buffer = people.first();
    test.equal(buffer, 3);
    buffer = people.first(function(x) { return x === 2; });
    test.equal(buffer, 2);

    test.done();
};

exports.Array_Last_ReturnLastCoincidence = function(test) {
    var people = [
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        buffer;

    test.expect(5);

    buffer = [].last();
    test.equal(buffer, null);
    buffer = people.last().name;
    test.equal(buffer, 'pepe');
    buffer = people.last(function(x) { return x.age === 22; }).name;
    test.equal(buffer, 'tony');

    people = [
        null,
        1,
        2,
    ]

    buffer = people.last();
    test.equal(buffer, 2);
    buffer = people.last(function(x) { return x === 1; });
    test.equal(buffer, 1);

    test.done();
};

exports.Array_Count_ReturnElementsCount = function(test) {
    var people = [
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        buffer;

    test.expect(4);
    buffer = people.count();
    test.equal(buffer, 3);
    buffer = people.count(function(x) { return x.age > 20; });
    test.equal(buffer, 2);

    people = [
        null,
        null,
        3,
        4,
        null,
        6
    ];
    buffer = people.count();
    test.equal(buffer, 6);
    buffer = people.count(function(x) { return x != null; });
    test.equal(buffer, 3);

    test.done();
};

exports.Array_Index_ReturnIndexOfTheElement = function(test) {
    var people = [ 
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        buffer;

    test.expect(6);
    buffer = people.index(function(x) { return x.age === 22; });
    test.equal(buffer, 1);
    buffer = people.index(function(x) { return x.age === 23; });
    test.equal(buffer, -1);
    buffer = [1, 3, 5, 7, 9, 11].index(7);
    test.equal(buffer, 3);

    people = [
        null,
        null,
        3,
        4,
        null,
        6
    ];
    buffer = people.index(function(x) { return x == null; });
    test.equal(buffer, 0);
    buffer = people.index(function(x) { return x != null; });
    test.equal(buffer, 2);
    buffer = [1, 3, 5, 7, 9, 11].index(null);
    test.equal(buffer, -1);

    test.done();
};

exports.Array_Pluck_ConcatOnlyNames = function(test) {
    var people = [ 
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        testString = 'clautonypepe',
        buffer = '';

    test.expect(1);
    people
        .pluck('name')
        .each(function (x) { buffer += x });
    test.equal(buffer, testString);
    test.done();
};

exports.Array_Sum_ReturnTotal = function(test) {
    var people = [
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        buffer;

    test.expect(2);
    buffer = people.sum(function (x) { return x.age; });
    test.equal(buffer, 63);

    buffer = [1, null, 3, null, 5, 6].sum();
    test.equal(buffer, 15);

    test.done();
};

exports.Array_Max_ReturnMaxAge = function(test) {
    var people = [ 
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        buffer;

    test.expect(5);
    buffer = people.max(function(a, b){ return a.age - b.age; }).age;
    test.equal(buffer, 22);

    buffer = people.max(function(a, b){ return a.name.length - b.name.length; }).name;
    test.equal(buffer, 'clau');

    buffer = [].max();
    test.equal(buffer, null);

    buffer = [2, 4, 5, 1, 6, 3].max();
    test.equal(buffer, 6);

    buffer = [2, null, 5, 1, null, 3].max();
    test.equal(buffer, 5);

    test.done();
};

exports.Array_Min_ReturnMinAge = function(test) {
    var people = [ 
            {name: 'clau', age: 20 },
            {name: 'tony', age: 22 },
            {name: 'pepe', age: 21 },
        ],
        buffer;

    test.expect(5);
    buffer = people.min(function(a, b){ return a.age - b.age; }).age;
    test.equal(buffer, 20);

    buffer = people.min(function(a, b){ return a.name.length - b.name.length; }).name;
    test.equal(buffer, 'clau');

    buffer = [].min();
    test.equal(buffer, null);

    buffer = [7, 4, 5, 2, 6, 3].min();
    test.equal(buffer, 2);

    buffer = [2, null, 5, 1, null, 3].min();
    test.equal(buffer, null);

    test.done();
};

exports.Array_Flatten_ReturnAOneLevelArray = function(test) {
    var buffer,
        len,
        value,
        i;
        is_array = function (value) {
            return Object.prototype.toString.apply(value) === '[object Array]';
        };

    buffer = [1, 2, [3, [4, [5]]], 6].flatten();
    len = buffer.length;
    for(i = 0; i < len; i+=1) {
        value = buffer[i];
        test.ok(!is_array(value));
        test.equal(value, i + 1);
    }
    test.done();
};