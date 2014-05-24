'use strict';

describe('JSArrayExtended', function() {

  require('../src/JSArrayExtended')
  var simpleArray,
    buffer,
    check;

  beforeEach(function() {
    simpleArray = ['a', 'b', 'c'];
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
        simpleArray = [1, 2, 3];
        simpleArray.each(function(x) { buffer += x; });
        expect(buffer).toEqual('123');
      });

      it('objects', function() {
        simpleArray = [
          { name: 'tony' },
          { name: 'clau' },
          { name: 'pepe' }
        ];
        simpleArray.each(function(x) { buffer += x; });
        expect(buffer).toEqual('[object Object][object Object][object Object]');

        buffer = '';
        simpleArray.each(function(x) { buffer += x.name; });
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
        simpleArray = [1, 2, 3];
        check = simpleArray.any(1);
        expect(check).toBe(true);

        check = simpleArray.any(2);
        expect(check).toBe(true);

        check = simpleArray.any(4);
        expect(check).toBe(false);

        check = simpleArray.any(function(x) { return x === 1; });
        expect(check).toBe(true);

        check = simpleArray.any(function(x) { return x === 5; });
        expect(check).toBe(false);

        check = simpleArray.any(function(x) { return x > 2; });
        expect(check).toBe(true);

        check = simpleArray.any(function(x) { return x < 1; });
        expect(check).toBe(false);
      });

      it('objects', function() {
        simpleArray = [
          { name: 'tony', age: 24 },
          { name: 'clau', age: 21 },
          { name: 'pepe', age: 17 }
        ];
        check = simpleArray.any(function(x){ return x.name === 'tony'; });
        expect(check).toBe(true);

        check = simpleArray.any(function(x){ return x.name === 'john'; });
        expect(check).toBe(false);

        check = simpleArray.any(function(x){ return x.age < 18; });
        expect(check).toBe(true);

        check = simpleArray.any(function(x){ return x.age > 40; });
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
});
