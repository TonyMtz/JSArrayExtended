'use strict';

describe('JSArrayExtended', function() {

  var o = require('../src/JSArrayExtended'),
    simpleArray,
    numericArray,
    objectArray,
    buffer,
    check;

  beforeEach(function() {
    simpleArray = ['a', 'b', 'c'];
    numericArray = [1, 2, 3];
    objectArray = [
      { name: 'tony', age: 24 },
      { name: 'clau', age: 21 },
      { name: 'pepe', age: 17 }
    ];
    buffer = '';
    check = false;
  });

  describe('#each', function() {
    describe('with valid data', function() {
      it('strings', function() {
        o.each(simpleArray, function(x) { buffer += x; });
        expect(buffer).toEqual('abc');

        buffer = '';
        simpleArray = ['hello', ' world', '!'];
        o.each(simpleArray, function(x) { buffer += x; });
        expect(buffer).toEqual('hello world!');
      });

      it('numbers', function() {
        o.each(numericArray, function(x) { buffer += x; });
        expect(buffer).toEqual('123');
      });

      it('objects', function() {
        o.each(objectArray, function(x) { buffer += x; });
        expect(buffer).toEqual('[object Object][object Object][object Object]');

        buffer = '';
        o.each(objectArray, function(x) { buffer += x.name; });
        expect(buffer).toEqual('tonyclaupepe');
      });
    });

    describe('with invalid data', function() {
      it('a null', function() {
        simpleArray = [null];
        o.each(simpleArray, function(x) { buffer += x; });
        expect(buffer).toEqual('null');
      });

      it('a undefined', function() {
        simpleArray = [undefined];
        o.each(simpleArray, function(x) { buffer += x; });
        expect(buffer).toEqual('undefined');
      });
    });

    it('with valid data and null', function() {
      simpleArray = ['a', 'b', null, 'c'];
      o.each(simpleArray, function(x) { buffer += x; });
      expect(buffer).toEqual('abnullc');
    });

    it('with empty array', function() {
      simpleArray = [];
      o.each(simpleArray, function(x) { buffer += x; });
      expect(buffer).toEqual('');
    });
  });

  describe('#where', function() {
    describe('with valid data', function() {
      it('strings', function() {
        buffer = o.where(simpleArray, function(x){ return x === 'b'; });
        expect(buffer).toContain('b');
        expect(buffer).not.toContain('a');
        expect(buffer).not.toContain('c');
      });

      it('numbers take 1', function() {
        simpleArray = [1, 2, 3];
        buffer = o.where(simpleArray, function(x){ return x === 2; });
        expect(buffer).toContain(2);
        expect(buffer).not.toContain(1);
        expect(buffer).not.toContain(3);
      });

      it('numbers take 2', function() {
        simpleArray = [1, 2, 3];
        buffer = o.where(simpleArray, function(x){ return x > 1; });
        expect(buffer).toContain(2);
        expect(buffer).toContain(3);
        expect(buffer).not.toContain(1);
      });

      it('objects', function() {
        simpleArray = [
          { name: 'tony' },
          { name: 'clau' },
          { name: 'pepe' }
        ];
        buffer = o.where(simpleArray, function(x){ return x.name === 'tony'; });
        expect(buffer).toContain({ name: 'tony' });
        expect(buffer).not.toContain({ name: 'clau' });
        expect(buffer).not.toContain({ name: 'pepe' });
      });
    });

    describe('with invalid data', function() {
      it('a null', function() {
        simpleArray = [null];
        buffer = o.where(simpleArray, function(x) { return x; });
        expect(buffer.length).toEqual(0);
      });

      it('a undefined', function() {
        simpleArray = [undefined];
        buffer = o.where(simpleArray, function(x) { return x; });
        expect(buffer.length).toEqual(0);
      });

      it('with valid data and null take 1', function() {
        simpleArray = ['a', 'b', null, 'c'];
        buffer = o.where(simpleArray, function(x) { return x; });
        expect(buffer.length).toEqual(3);
        expect(buffer).toContain('a');
        expect(buffer).toContain('b');
        expect(buffer).toContain('c');
        expect(buffer).not.toContain(null);
      });
    });
  });

  describe('#any', function() {
    describe('with valid data', function() {
      it('strings', function() {
        check = o.any(simpleArray, 'a');
        expect(check).toBe(true);

        check = o.any(simpleArray, 'b');
        expect(check).toBe(true);

        check = o.any(simpleArray, 'd');
        expect(check).toBe(false);

        check = o.any(simpleArray, function(x) { return x === 'a'; });
        expect(check).toBe(true);

        check = o.any(simpleArray, function(x) { return x === 'd'; });
        expect(check).toBe(false);
      });

      it('numbers take 1', function() {
        check = o.any(numericArray, 1);
        expect(check).toBe(true);

        check = o.any(numericArray, 2);
        expect(check).toBe(true);

        check = o.any(numericArray, 4);
        expect(check).toBe(false);

        check = o.any(numericArray, function(x) { return x === 1; });
        expect(check).toBe(true);

        check = o.any(numericArray, function(x) { return x === 5; });
        expect(check).toBe(false);

        check = o.any(numericArray, function(x) { return x > 2; });
        expect(check).toBe(true);

        check = o.any(numericArray, function(x) { return x < 1; });
        expect(check).toBe(false);
      });

      it('objects', function() {
        check = o.any(objectArray, function(x){ return x.name === 'tony'; });
        expect(check).toBe(true);

        check = o.any(objectArray, function(x){ return x.name === 'john'; });
        expect(check).toBe(false);

        check = o.any(objectArray, function(x){ return x.age < 18; });
        expect(check).toBe(true);

        check = o.any(objectArray, function(x){ return x.age > 40; });
        expect(check).toBe(false);
      });
    });

    describe('with invalid data', function() {
      it('a null', function() {
        simpleArray = ['a', 'b', null, 'c'];
        check = o.any(simpleArray, function(x) { return x === null; });
        expect(check).toBe(true);

        check = o.any(simpleArray, function(x) { return x === undefined; });
        expect(check).toBe(false);
      });

      it('a undefined', function() {
        simpleArray = [undefined];
        check = o.any(simpleArray, function(x) { return x === undefined; });
        expect(check).toBe(true);

        check = o.any(simpleArray, function(x) { return x === null; });
        expect(check).toBe(false);
      });

      it('with valid data and null', function() {
        simpleArray = ['a', null, null, 'c'];
        check = o.any(simpleArray, 'c');
        expect(check).toBe(true);

        check = o.any(simpleArray, function(x) { return x === 'c'; });
        expect(check).toBe(true);

        check = o.any(simpleArray, function(x) { return x === undefined; });
        expect(check).toBe(false);
      });
    });
  });

  describe('#select', function() {
    describe('with valid data', function() {
      it('objects', function() {
        buffer = o.select(objectArray, function(x) { return x.name; });
        expect(buffer).toContain('tony');
        expect(buffer).toContain('clau');
        expect(buffer).toContain('pepe');
        expect(buffer).not.toContain('age');

        buffer = o.select(objectArray, function(x) { return x.age; });
        expect(buffer).toContain(24);
        expect(buffer).toContain(21);
        expect(buffer).toContain(17);
        expect(buffer).not.toContain('tony');
        expect(buffer).not.toContain(0);
        expect(buffer).not.toContain(null);
        expect(buffer).not.toContain(undefined);
      });
    });

    describe('with invalid data', function() {
      it('a null', function() {
        simpleArray = [
          { name: 'tony', age: 24 },
          { name: null, age: 21 },
          { name: 'pepe', age: 17 }
        ];
        buffer = o.select(simpleArray, function(x) { return x.name; });
        expect(buffer).toContain('tony');
        expect(buffer).toContain(null);
        expect(buffer).toContain('pepe');
        expect(buffer).not.toContain('null');
        expect(buffer).not.toContain('age');
      });
    });

    it('with empty array', function() {
      simpleArray = [];
      buffer = o.select(simpleArray, function(x) { return x.name; });
      expect(buffer.length).toEqual(0);
    });
  });

  describe('#take', function() {
    describe('with valid data', function() {
      it('only numbers as arguments', function() {
        buffer = o.take(objectArray, 0);
        expect(buffer.length).toBe(0);

        buffer = o.take(objectArray, 1);
        expect(buffer.length).toBe(1);

        buffer = o.take(objectArray, 2);
        expect(buffer.length).toBe(2);

        buffer = o.take(objectArray, 3);
        expect(buffer.length).toBe(3);

        buffer = o.take(objectArray, 4);
        expect(buffer.length).toBe(3);
      });

      it('numbers and function as arguments', function() {
        var gt20 = function (x) {
            return 20 <= x.age;
          },
          lt20 = function (x) {
            return 20 >= x.age;
          };

        buffer = o.take(objectArray, 0, gt20);
        expect(buffer.length).toBe(0);
        buffer = o.take(objectArray, 0, lt20);
        expect(buffer.length).toBe(0);

        buffer = o.take(objectArray, 1, gt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(objectArray[0]);
        buffer = o.take(objectArray, 1, lt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(objectArray[2]);

        buffer = o.take(objectArray, 2, gt20);
        expect(buffer.length).toBe(2);
        expect(buffer).toContain(objectArray[0]);
        expect(buffer).toContain(objectArray[1]);
        buffer = o.take(objectArray, 2, lt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(objectArray[2]);

        buffer = o.take(objectArray, 3, gt20);
        expect(buffer.length).toBe(2);
        expect(buffer).toContain(objectArray[0]);
        expect(buffer).toContain(objectArray[1]);
        buffer = o.take(objectArray, 3, lt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(objectArray[2]);

        buffer = o.take(objectArray, 4, gt20);
        expect(buffer.length).toBe(2);
        expect(buffer).toContain(objectArray[0]);
        expect(buffer).toContain(objectArray[1]);
        buffer = o.take(objectArray, 4, lt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(objectArray[2]);
      });
    });

    describe('with invalid data', function() {
      it('a null', function() {
        var gt20 = function (x) {
            return 20 < x.age;
          },
          lt20 = function (x) {
            return 20 > x.age;
          },
          isNull = function (x) {
            return null === x.age;
          };

        var customArray = [
          { name: 'tony', age: 24 },
          { name: 'clau', age: null },
          { name: 'pepe', age: 17 }
        ];

        buffer = o.take(customArray, 3, gt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(customArray[0]);
        buffer = o.take(customArray, 3, lt20);
        expect(buffer.length).toBe(2);
        expect(buffer).toContain(customArray[1]);
        expect(buffer).toContain(customArray[2]);

        buffer = o.take(customArray, 2, isNull);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(customArray[1]);
      });
    });

    it('with empty array', function() {
      simpleArray = [];
      buffer = o.take(simpleArray, 0);
      expect(buffer.length).toEqual(0);

      buffer = o.take(simpleArray, 1);
      expect(buffer.length).toEqual(0);
    });
  });

  describe('#skip', function() {
    it('with valid data', function() {
      buffer = o.skip(objectArray, 0);
      expect(buffer.length).toBe(3);

      buffer = o.skip(objectArray, 1);
      expect(buffer.length).toBe(2);

      buffer = o.skip(objectArray, 2);
      expect(buffer.length).toBe(1);

      buffer = o.skip(objectArray, 3);
      expect(buffer.length).toBe(0);

      buffer = o.skip(objectArray, 4);
      expect(buffer.length).toBe(0);
    });

    it('with invalid data', function() {
      var customArray = [
        { name: 'tony', age: 24 },
        null,
        undefined,
        { name: 'clau', age: 21 }
      ];
      buffer = o.skip(customArray, 0);
      expect(buffer.length).toBe(4);

      buffer = o.skip(customArray, 1);
      expect(buffer.length).toBe(3);

      buffer = o.skip(customArray, 2);
      expect(buffer.length).toBe(2);

      buffer = o.skip(customArray, 3);
      expect(buffer.length).toBe(1);

      buffer = o.skip(customArray, 4);
      expect(buffer.length).toBe(0);

      buffer = o.skip(customArray, 5);
      expect(buffer.length).toBe(0);

      buffer = o.skip(customArray, 'a');
      expect(buffer.length).toBe(4);

      buffer = o.skip(customArray, true);
      expect(buffer.length).toBe(4);
    });
  });

  describe('#first', function() {
    it('with valid data no argument', function() {
      buffer = o.first(simpleArray);
      expect(buffer).toBe('a');

      buffer = o.first(numericArray);
      expect(buffer).toBe(1);

      buffer = o.first(objectArray);
      expect(buffer).toBe(objectArray[0]);
      expect(buffer.name).toBe('tony');
    });

    it('with valid data and argument', function() {
      buffer = o.first(simpleArray, function(x) { return x === 'b'; });
      expect(buffer).toBe('b');
      buffer = o.first(simpleArray, function(x) { return x === 'c'; });
      expect(buffer).toBe('c');
      buffer = o.first(simpleArray, function(x) { return x === 'd'; });
      expect(buffer).toBe(null);

      buffer = o.first(numericArray, function(x) { return x > 2; });
      expect(buffer).toBe(3);
      buffer = o.first(numericArray, function(x) { return x > 10; });
      expect(buffer).toBe(null);

      objectArray.push({ name: 'clau', age: 29 });
      buffer = o.first(objectArray, function(x) { return x.name === 'clau'; });
      expect(buffer.name).toBe('clau');
      expect(buffer).toBe(objectArray[1]);
      buffer = o.first(objectArray, function(x) { return x.age >= 18; });
      expect(buffer.age).toBe(24);
      expect(buffer).toBe(objectArray[0]);
      buffer = o.first(objectArray.reverse(), function(x) { return x.age >= 18; });
      expect(buffer.age).toBe(29);
      expect(buffer).toBe(objectArray[0]);

      buffer = o.first([]);
      expect(buffer).toBe(null);

      buffer = o.first([42, 666]);
      expect(buffer).toBe(42);
    });
  });

  describe('#last', function() {
    it('with valid data no argument', function() {
      buffer = o.last(simpleArray);
      expect(buffer).toBe('c');

      buffer = o.last(numericArray);
      expect(buffer).toBe(3);

      buffer = o.last(objectArray);
      expect(buffer).toBe(objectArray[2]);
      expect(buffer.name).toBe('pepe');
    });

    it('with valid data and argument', function() {
      buffer = o.last(simpleArray, function(x) { return x === 'b'; });
      expect(buffer).toBe('b');
      buffer = o.last(simpleArray, function(x) { return x === 'c'; });
      expect(buffer).toBe('c');
      buffer = o.last(simpleArray, function(x) { return x === 'd'; });
      expect(buffer).toBe(null);

      buffer = o.last(numericArray, function(x) { return x > 0; });
      expect(buffer).toBe(3);
      buffer = o.last(numericArray.reverse(), function(x) { return x > 0; });
      expect(buffer).toBe(1);
      buffer = o.last(numericArray, function(x) { return x > 2; });
      expect(buffer).toBe(3);
      buffer = o.last(numericArray, function(x) { return x > 10; });
      expect(buffer).toBe(null);

      objectArray.push({ name: 'clau', age: 29 });
      buffer = o.last(objectArray, function(x) { return x.name === 'clau'; });
      expect(buffer.name).toBe('clau');
      expect(buffer.age).toBe(29);
      expect(buffer).toBe(objectArray[3]);
      buffer = o.last(objectArray, function(x) { return x.age >= 18; });
      expect(buffer.age).toBe(29);
      expect(buffer).toBe(objectArray[3]);

      buffer = o.last(objectArray.reverse(), function(x) { return x.age >= 18; });
      expect(buffer.age).toBe(24);
      expect(buffer).toBe(objectArray[3]);

      buffer = o.last([]);
      expect(buffer).toBe(null);

      buffer = o.last([42, 666]);
      expect(buffer).toBe(666);
    });
  });

  describe('#count', function() {
    describe('with valid data', function() {
      it('strings', function() {
        buffer = o.count(simpleArray);
        expect(buffer).toBe(3);

        buffer = o.count(simpleArray, function(x){ return x === 'b'; });
        expect(buffer).toBe(1);

        buffer = o.count(simpleArray, function(x){ return x === 'b' || x === 'a'; });
        expect(buffer).toBe(2);
      });

      it('numbers', function() {
        buffer = o.count(numericArray);
        expect(buffer).toBe(3);

        buffer = o.count(numericArray, function(x){ return x === 2; });
        expect(buffer).toBe(1);

        buffer = o.count(numericArray, function(x){ return x > 1; });
        expect(buffer).toBe(2);
      });

      it('objects', function() {
        buffer = o.count(objectArray);
        expect(buffer).toBe(3);

        buffer = o.count(objectArray, function(x){ return x.name === 'tony'; });
        expect(buffer).toBe(1);

        buffer = o.count(objectArray, function(x){ return x.age > 18; });
        expect(buffer).toBe(2);
      });
    });

    describe('with invalid data', function() {
      it('a null', function() {
        buffer = o.count([null]);
        expect(buffer).toEqual(1);
      });

      it('a undefined', function() {
        buffer = o.count([undefined]);
        expect(buffer).toEqual(1);
      });

      it('with valid data and null take 1', function() {
        buffer = o.count(['a', 'b', null, 'c']);
        expect(buffer).toEqual(4);
      });
    });
  });

  describe('#index', function() {
    describe('with valid data', function() {
      it('numbers', function() {
        buffer = o.index(numericArray, 1);
        expect(buffer).toBe(0);

        buffer = o.index([9, 4, 6], 4);
        expect(buffer).toBe(1);

        buffer = o.index(numericArray, function(x){ return x === 2; });
        expect(buffer).toBe(1);

        buffer = o.index(numericArray, function(x){ return x > 1; });
        expect(buffer).toBe(1);
      });
    });
  });

  describe('#pluck', function() {
    it('with valid data and argument', function() {
      buffer = o.pluck(objectArray, ['name']);
      expect(buffer.length).toBe(3);
      expect(buffer).toContain('tony');
      expect(buffer).toContain('clau');
      expect(buffer).toContain('pepe');

      buffer = o.pluck(objectArray, ['age']);
      expect(buffer.length).toBe(3);
      expect(buffer).toContain(24);
      expect(buffer).toContain(21);
      expect(buffer).toContain(17);

      buffer = o.pluck([]);
      expect(buffer.length).toBe(0);

      buffer = o.pluck([42, 666]);
      expect(buffer.length).toBe(0);
    });
  });

  describe('#sum', function() {
    describe('with valid data', function() {
      it('numbers', function() {
        buffer = o.sum(numericArray);
        expect(buffer).toBe(6);

        buffer = o.sum([1, null, 3, null, 5, 6]);
        expect(buffer).toBe(15);
      });

      it('objects', function() {
        buffer = o.sum(numericArray, function(x){ return x * 2; });
        expect(buffer).toBe(12);

        buffer = o.sum(numericArray, function(x){ return x * 3; });
        expect(buffer).toBe(18);

        buffer = o.sum(objectArray, function(x){ return x.age; });
        expect(buffer).toBe(62);
      });
    });
  });

  describe('#max', function() {
    describe('with valid data', function() {
      it('numbers', function() {
        buffer = o.max(numericArray);
        expect(buffer).toBe(3);

        buffer = o.max([1, null, 6, undefined, 7, 4]);
        expect(buffer).toBe(7);

        buffer = o.max([null, 3, null, 6, undefined, 7, 4]);
        expect(buffer).toBe(7);

        buffer = o.max([1, 3, 6, 6, 7, 4]);
        expect(buffer).toBe(7);

        buffer = o.max([-1, -3, -5, -4, -2]);
        expect(buffer).toBe(-1);

        buffer = o.max([]);
        expect(buffer).toBe(null);
      });

      it('objects', function() {
        buffer = o.max(objectArray, function(a, b) { return a.age - b.age; });
        expect(buffer.age).toBe(24);

        buffer = o.max(objectArray, function(a, b){ return a.name.length - b.name.length; });
        expect(buffer.name).toBe('tony');
      });
    });
  });

  describe('#min', function() {
    describe('with valid data', function() {
      it('numbers', function() {
        buffer = o.min(numericArray);
        expect(buffer).toBe(1);

        buffer = o.min([3, null, 6, undefined, 7, 4]);
        expect(buffer).toBe(3);

        buffer = o.min([null, 3, null, 6, undefined, 7, 4]);
        expect(buffer).toBe(3);

        buffer = o.min([3, 6, 7, 4]);
        expect(buffer).toBe(3);

        buffer = o.min([10, 3, 6, 6, 7, 4]);
        expect(buffer).toBe(3);

        buffer = o.min([-1, -3, -5, -4, -2]);
        expect(buffer).toBe(-5);

        buffer = o.min([]);
        expect(buffer).toBe(null);
      });

      it('objects', function() {
        buffer = o.min(objectArray, function(a, b) { return a.age - b.age; });
        expect(buffer.age).toBe(17);

        buffer = o.min(objectArray, function(a, b){ return a.name.length - b.name.length; });
        expect(buffer.name).toBe('tony');
      });
    });
  });

  describe('#flatten', function() {
    describe('with valid data', function() {
      it('numbers', function() {
        buffer = o.flatten(numericArray);
        expect(buffer).toEqual([1, 2, 3]);

        buffer = o.flatten([1, 2, [3, [4, [5]]], 6]);
        expect(buffer).toEqual([ 1, 2, 3, 4, 5, 6 ]);

        buffer = o.flatten([1, 2, [3, [[null], [5]]], 6]);
        expect(buffer).toEqual([ 1, 2, 3, null, 5, 6 ]);

        var fn = function () {};

        buffer = o.flatten([1, undefined, 2, [3, [[null], [5]]], [fn, [[fn]]]]);
        expect(buffer).toEqual([ 1, undefined, 2, 3, null, 5, fn, fn ]);
      });
    });
  });
});
