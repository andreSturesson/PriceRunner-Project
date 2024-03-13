import { test, expect } from "@jest/globals";
import addTwoNumbers from "./example.js";
//This test only illustrates how testing can be done using Jest
test("An example test to see that everything works!", () => {
  expect(1 + 1).toBe(2);
});

// This test is a simple example of how to properly test a function
test("addTwoNumbers adds two positive numbers", () => {
  expect(addTwoNumbers(1, 2)).toBe(3);
});

test("addTwoNumbers adds a positive number and zero", () => {
  expect(addTwoNumbers(5, 0)).toBe(5);
});

test("addTwoNumbers adds a positive number and a negative number", () => {
  expect(addTwoNumbers(10, -5)).toBe(5);
});

test("addTwoNumbers adds two negative numbers", () => {
  expect(addTwoNumbers(-3, -7)).toBe(-10);
});

test("addTwoNumbers adds zero and zero", () => {
  expect(addTwoNumbers(0, 0)).toBe(0);
});
