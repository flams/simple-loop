/**
* @license simple-loop https://github.com/flams/simple-loop
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
var sut = require("../index");

describe("Loop", function () {

	var object = {
			a: 2,
			e: 15,
			b: 0,
			c: 1,
			d: 2
		},
		array = [2,0,1,2];

	it("should throw an error when no object or array is given", function () {
		expect(function () {
			sut("", function noop() {});
		}).toThrow("simple-loop: iterated must be an array/object");
	});

	it("should throw an error when the callback is not a function", function () {
		expect(function () {
			sut({});
		}).toThrow("simple-loop: callback must be a function");
	});

	it("should iterate through arrays", function () {
		var spy = jasmine.createSpy();
		sut(array, spy);

		expect(spy.calls[0].args[0]).toBe(2);
		expect(spy.calls[0].args[1]).toBe(0);

		expect(spy.calls[1].args[0]).toBe(0);
		expect(spy.calls[1].args[1]).toBe(1);

		expect(spy.calls[2].args[0]).toBe(1);
		expect(spy.calls[2].args[1]).toBe(2);

		expect(spy.calls[3].args[0]).toBe(2);
		expect(spy.calls[3].args[1]).toBe(3);

		expect(spy.mostRecentCall.args[2]).toBe(array);
	});

	it("should iterate through arrays in scope", function () {
		var spy = jasmine.createSpy(),
			thisObj = {};

		sut(array, spy, thisObj);
		expect(spy.mostRecentCall.object).toBe(thisObj);
	});

	it("should iterate through all elements when the length varies", function () {
		var array = [0],
			callCount = 0;

		sut(array, function () {
			if (callCount < 10) {
				array.push(0);
				callCount++;
			}
		});

		expect(callCount).toBe(10);
		expect(array.length).toBe(11);
	});

	it("should iterate through objects", function () {
		var spy = jasmine.createSpy();
		sut(object, spy);

		expect(spy.callCount).toBe(5);
		spy.calls.forEach(function (value, idx, call) {
			expect(object[call[idx].args[1]]).toBe(call[idx].args[0]);
		});
		expect(spy.mostRecentCall.args[2]).toBe(object);
	});

	it("should iterate through objects in scope", function () {
		var spy = jasmine.createSpy(),
			thisObj = {};

		sut(object, spy, thisObj);
		expect(spy.mostRecentCall.object).toBe(thisObj);
	});

	it("shouldn't loop on values that are deleted on the fly", function () {
		sut(array, function (val, key) {
			if (key === 0) {
				array.splice(key, 1);
			}
			expect(typeof val != "undefined" && key != 3).toBe(true);
		});
	});
});
