'use strict';

const expect = require("chai").expect;
//const converter = require("../index");

describe("Calculate sum", function() {
  describe("2+1=3", function() {
    it("sum 1 and 2", function() {
      const one   = 1;
      const two = 2;
      const sum = one + two;
      expect(sum).to.equal(3);
    });
  });
});
