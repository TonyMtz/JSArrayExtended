'use strict';

describe('JSArrayExtended', function() {

  require('../src/JSArrayExtended')
  var simpleArray,
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
        simpleArray.each(function(x) { buffer += x; });
        expect(buffer).toEqual('abc');

        buffer = '';
        simpleArray = ['hello', ' world', '!'];
        simpleArray.each(function(x) { buffer += x; });
        expect(buffer).toEqual('hello world!');
      });

      it('numbers', function() {
        numericArray.each(function(x) { buffer += x; });
        expect(buffer).toEqual('123');
      });

      it('objects', function() {
        objectArray.each(function(x) { buffer += x; });
        expect(buffer).toEqual('[object Object][object Object][object Object]');

        buffer = '';
        objectArray.each(function(x) { buffer += x.name; });
        expect(buffer).toEqual('tonyclaupepe');
      });
    });

    describe('with invalid data', function() {
      it('a null', function() {
        simpleArray = [null];
        simpleArray.each(function(x) { buffer += x; });
        expect(buffer).toEqual('null');
      });

      it('a undefined', function() {
        simpleArray = [undefined];
        simpleArray.each(function(x) { buffer += x; });
        expect(buffer).toEqual('undefined');
      });
    });

    it('with valid data and null', function() {
      simpleArray = ['a', 'b', null, 'c'];
      simpleArray.each(function(x) { buffer += x; });
      expect(buffer).toEqual('abnullc');
    });

    it('with empty array', function() {
      simpleArray = [];
      simpleArray.each(function(x) { buffer += x; });
      expect(buffer).toEqual('');
    });
  });

  describe('#where', function() {
    describe('with valid data', function() {
      it('strings', function() {
        buffer = simpleArray.where(function(x){ return x === 'b'; });
        expect(buffer).toContain('b');
        expect(buffer).not.toContain('a');
        expect(buffer).not.toContain('c');
      });

      it('numbers take 1', function() {
        simpleArray = [1, 2, 3];
        buffer = simpleArray.where(function(x){ return x === 2; });
        expect(buffer).toContain(2);
        expect(buffer).not.toContain(1);
        expect(buffer).not.toContain(3);
      });

      it('numbers take 2', function() {
        simpleArray = [1, 2, 3];
        buffer = simpleArray.where(function(x){ return x > 1; });
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
        buffer = simpleArray.where(function(x){ return x.name === 'tony'; });
        expect(buffer).toContain({ name: 'tony' });
        expect(buffer).not.toContain({ name: 'clau' });
        expect(buffer).not.toContain({ name: 'pepe' });
      });
    });

    describe('with invalid data', function() {
      it('a null', function() {
        simpleArray = [null];
        buffer = simpleArray.where(function(x) { return x; });
        expect(buffer.length).toEqual(0);
      });

      it('a undefined', function() {
        simpleArray = [undefined];
        buffer = simpleArray.where(function(x) { return x; });
        expect(buffer.length).toEqual(0);
      });

      it('with valid data and null take 1', function() {
        simpleArray = ['a', 'b', null, 'c'];
        buffer = simpleArray.where(function(x) { return x; });
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
        check = simpleArray.any('a');
        expect(check).toBe(true);

        check = simpleArray.any('b');
        expect(check).toBe(true);

        check = simpleArray.any('d');
        expect(check).toBe(false);

        check = simpleArray.any(function(x) { return x === 'a'; });
        expect(check).toBe(true);

        check = simpleArray.any(function(x) { return x === 'd'; });
        expect(check).toBe(false);
      });

      it('numbers take 1', function() {
        check = numericArray.any(1);
        expect(check).toBe(true);

        check = numericArray.any(2);
        expect(check).toBe(true);

        check = numericArray.any(4);
        expect(check).toBe(false);

        check = numericArray.any(function(x) { return x === 1; });
        expect(check).toBe(true);

        check = numericArray.any(function(x) { return x === 5; });
        expect(check).toBe(false);

        check = numericArray.any(function(x) { return x > 2; });
        expect(check).toBe(true);

        check = numericArray.any(function(x) { return x < 1; });
        expect(check).toBe(false);
      });

      it('objects', function() {
        check = objectArray.any(function(x){ return x.name === 'tony'; });
        expect(check).toBe(true);

        check = objectArray.any(function(x){ return x.name === 'john'; });
        expect(check).toBe(false);

        check = objectArray.any(function(x){ return x.age < 18; });
        expect(check).toBe(true);

        check = objectArray.any(function(x){ return x.age > 40; });
        expect(check).toBe(false);
      });
    });

    describe('with invalid data', function() {
      it('a null', function() {
        simpleArray = ['a', 'b', null, 'c'];
        check = simpleArray.any(function(x) { return x === null; });
        expect(check).toBe(true);

        check = simpleArray.any(function(x) { return x === undefined; });
        expect(check).toBe(false);
      });

      it('a undefined', function() {
        simpleArray = [undefined];
        check = simpleArray.any(function(x) { return x === undefined; });
        expect(check).toBe(true);

        check = simpleArray.any(function(x) { return x === null; });
        expect(check).toBe(false);
      });

      it('with valid data and null', function() {
        simpleArray = ['a', null, null, 'c'];
        check = simpleArray.any('c');
        expect(check).toBe(true);

        check = simpleArray.any(function(x) { return x === 'c'; });
        expect(check).toBe(true);

        check = simpleArray.any(function(x) { return x === undefined; });
        expect(check).toBe(false);
      });
    });
  });

  describe('#select', function() {
    describe('with valid data', function() {
      it('objects', function() {
        buffer = objectArray.select(function(x) { return x.name; });
        expect(buffer).toContain('tony');
        expect(buffer).toContain('clau');
        expect(buffer).toContain('pepe');
        expect(buffer).not.toContain('age');

        buffer = objectArray.select(function(x) { return x.age; });
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
        buffer = simpleArray.select(function(x) { return x.name; });
        expect(buffer).toContain('tony');
        expect(buffer).toContain(null);
        expect(buffer).toContain('pepe');
        expect(buffer).not.toContain('null');
        expect(buffer).not.toContain('age');
      });
    });

    it('with empty array', function() {
      simpleArray = [];
      buffer = simpleArray.select(function(x) { return x.name; });
      expect(buffer.length).toEqual(0);
    });
  });

  describe('#take', function() {
    describe('with valid data', function() {
      it('only numbers as arguments', function() {
        buffer = objectArray.take(0);
        expect(buffer.length).toBe(0);

        buffer = objectArray.take(1);
        expect(buffer.length).toBe(1);

        buffer = objectArray.take(2);
        expect(buffer.length).toBe(2);

        buffer = objectArray.take(3);
        expect(buffer.length).toBe(3);

        buffer = objectArray.take(4);
        expect(buffer.length).toBe(3);
      });

      it('numbers and function as arguments', function() {
        var gt20 = function (x) {
            return 20 <= x.age;
          },
          lt20 = function (x) {
            return 20 >= x.age;
          };

        buffer = objectArray.take(0, gt20);
        expect(buffer.length).toBe(0);
        buffer = objectArray.take(0, lt20);
        expect(buffer.length).toBe(0);

        buffer = objectArray.take(1, gt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(objectArray[0]);
        buffer = objectArray.take(1, lt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(objectArray[2]);

        buffer = objectArray.take(2, gt20);
        expect(buffer.length).toBe(2);
        expect(buffer).toContain(objectArray[0]);
        expect(buffer).toContain(objectArray[1]);
        buffer = objectArray.take(2, lt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(objectArray[2]);

        buffer = objectArray.take(3, gt20);
        expect(buffer.length).toBe(2);
        expect(buffer).toContain(objectArray[0]);
        expect(buffer).toContain(objectArray[1]);
        buffer = objectArray.take(3, lt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(objectArray[2]);

        buffer = objectArray.take(4, gt20);
        expect(buffer.length).toBe(2);
        expect(buffer).toContain(objectArray[0]);
        expect(buffer).toContain(objectArray[1]);
        buffer = objectArray.take(4, lt20);
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

        buffer = customArray.take(3, gt20);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(customArray[0]);
        buffer = customArray.take(3, lt20);
        expect(buffer.length).toBe(2);
        expect(buffer).toContain(customArray[1]);
        expect(buffer).toContain(customArray[2]);

        buffer = customArray.take(2, isNull);
        expect(buffer.length).toBe(1);
        expect(buffer).toContain(customArray[1]);
      });
    });

    it('with empty array', function() {
      simpleArray = [];
      buffer = simpleArray.take(0);
      expect(buffer.length).toEqual(0);

      buffer = simpleArray.take(1);
      expect(buffer.length).toEqual(0);
    });
  });

  describe('#skip', function() {
    it('with valid data', function() {
      buffer = objectArray.skip(0);
      expect(buffer.length).toBe(3);

      buffer = objectArray.skip(1);
      expect(buffer.length).toBe(2);

      buffer = objectArray.skip(2);
      expect(buffer.length).toBe(1);

      buffer = objectArray.skip(3);
      expect(buffer.length).toBe(0);

      buffer = objectArray.skip(4);
      expect(buffer.length).toBe(0);
    });

    it('with invalid data', function() {
      var customArray = [
        { name: 'tony', age: 24 },
        null,
        undefined,
        { name: 'clau', age: 21 }
      ];
      buffer = customArray.skip(0);
      expect(buffer.length).toBe(4);

      buffer = customArray.skip(1);
      expect(buffer.length).toBe(3);

      buffer = customArray.skip(2);
      expect(buffer.length).toBe(2);

      buffer = customArray.skip(3);
      expect(buffer.length).toBe(1);

      buffer = customArray.skip(4);
      expect(buffer.length).toBe(0);

      buffer = customArray.skip(5);
      expect(buffer.length).toBe(0);

      buffer = customArray.skip('a');
      expect(buffer.length).toBe(4);

      buffer = customArray.skip(true);
      expect(buffer.length).toBe(4);
    });
  });

  describe('#first', function() {
    it('with valid data no argument', function() {
      buffer = simpleArray.first();
      expect(buffer).toBe('a');

      buffer = numericArray.first();
      expect(buffer).toBe(1);

      buffer = objectArray.first();
      expect(buffer).toBe(objectArray[0]);
      expect(buffer.name).toBe('tony');
    });

    it('with valid data and argument', function() {
      buffer = simpleArray.first(function(x) { return x === 'b'; });
      expect(buffer).toBe('b');
      buffer = simpleArray.first(function(x) { return x === 'c'; });
      expect(buffer).toBe('c');
      buffer = simpleArray.first(function(x) { return x === 'd'; });
      expect(buffer).toBe(null);

      buffer = numericArray.first(function(x) { return x > 2; });
      expect(buffer).toBe(3);
      buffer = numericArray.first(function(x) { return x > 10; });
      expect(buffer).toBe(null);

      objectArray.push({ name: 'clau', age: 29 });
      buffer = objectArray.first(function(x) { return x.name === 'clau'; });
      expect(buffer.name).toBe('clau');
      expect(buffer).toBe(objectArray[1]);
      buffer = objectArray.first(function(x) { return x.age >= 18; });
      expect(buffer.age).toBe(24);
      expect(buffer).toBe(objectArray[0]);
      buffer = objectArray.reverse().first(function(x) { return x.age >= 18; });
      expect(buffer.age).toBe(29);
      expect(buffer).toBe(objectArray[0]);

      buffer = [].first();
      expect(buffer).toBe(null);

      buffer = [42, 666].first();
      expect(buffer).toBe(42);
    });
  });

  describe('#last', function() {
    it('with valid data no argument', function() {
      buffer = simpleArray.last();
      expect(buffer).toBe('c');

      buffer = numericArray.last();
      expect(buffer).toBe(3);

      buffer = objectArray.last();
      expect(buffer).toBe(objectArray[2]);
      expect(buffer.name).toBe('pepe');
    });

    it('with valid data and argument', function() {
      buffer = simpleArray.last(function(x) { return x === 'b'; });
      expect(buffer).toBe('b');
      buffer = simpleArray.last(function(x) { return x === 'c'; });
      expect(buffer).toBe('c');
      buffer = simpleArray.last(function(x) { return x === 'd'; });
      expect(buffer).toBe(null);

      buffer = numericArray.last(function(x) { return x > 0; });
      expect(buffer).toBe(3);
      buffer = numericArray.reverse().last(function(x) { return x > 0; });
      expect(buffer).toBe(1);
      buffer = numericArray.last(function(x) { return x > 2; });
      expect(buffer).toBe(3);
      buffer = numericArray.last(function(x) { return x > 10; });
      expect(buffer).toBe(null);

      objectArray.push({ name: 'clau', age: 29 });
      buffer = objectArray.last(function(x) { return x.name === 'clau'; });
      expect(buffer.name).toBe('clau');
      expect(buffer.age).toBe(29);
      expect(buffer).toBe(objectArray[3]);
      buffer = objectArray.last(function(x) { return x.age >= 18; });
      expect(buffer.age).toBe(29);
      expect(buffer).toBe(objectArray[3]);

      buffer = objectArray.reverse().last(function(x) { return x.age >= 18; });
      expect(buffer.age).toBe(24);
      expect(buffer).toBe(objectArray[3]);

      buffer = [].last();
      expect(buffer).toBe(null);

      buffer = [42, 666].last();
      expect(buffer).toBe(666);
    });
  });

  describe('#count', function() {
    describe('with valid data', function() {
      it('strings', function() {
        buffer = simpleArray.count();
        expect(buffer).toBe(3);

        buffer = simpleArray.count(function(x){ return x === 'b'; });
        expect(buffer).toBe(1);

        buffer = simpleArray.count(function(x){ return x === 'b' || x === 'a'; });
        expect(buffer).toBe(2);
      });

      it('numbers', function() {
        buffer = numericArray.count();
        expect(buffer).toBe(3);

        buffer = numericArray.count(function(x){ return x === 2; });
        expect(buffer).toBe(1);

        buffer = numericArray.count(function(x){ return x > 1; });
        expect(buffer).toBe(2);
      });

      it('objects', function() {
        buffer = objectArray.count();
        expect(buffer).toBe(3);

        buffer = objectArray.count(function(x){ return x.name === 'tony'; });
        expect(buffer).toBe(1);

        buffer = objectArray.count(function(x){ return x.age > 18; });
        expect(buffer).toBe(2);
      });
    });

    describe('with invalid data', function() {
      it('a null', function() {
        buffer = [null].count();
        expect(buffer).toEqual(1);
      });

      it('a undefined', function() {
        buffer = [undefined].count();
        expect(buffer).toEqual(1);
      });

      it('with valid data and null take 1', function() {
        buffer = ['a', 'b', null, 'c'].count();
        expect(buffer).toEqual(4);
      });
    });
  });

  describe('#index', function() {
    describe('with valid data', function() {
      it('numbers', function() {
        buffer = numericArray.index(1);
        expect(buffer).toBe(0);

        buffer = [9, 4, 6].index(4);
        expect(buffer).toBe(1);

        buffer = numericArray.index(function(x){ return x === 2; });
        expect(buffer).toBe(1);

        buffer = numericArray.index(function(x){ return x > 1; });
        expect(buffer).toBe(1);
      });
    });
  });

  describe('#pluck', function() {
    it('with valid data and argument', function() {
      buffer = objectArray.pluck(['name']);
      expect(buffer.length).toBe(3);
      expect(buffer).toContain('tony');
      expect(buffer).toContain('clau');
      expect(buffer).toContain('pepe');

      buffer = objectArray.pluck(['age']);
      expect(buffer.length).toBe(3);
      expect(buffer).toContain(24);
      expect(buffer).toContain(21);
      expect(buffer).toContain(17);

      buffer = [].pluck();
      expect(buffer.length).toBe(0);

      buffer = [42, 666].pluck();
      expect(buffer.length).toBe(0);
    });
  });
});
