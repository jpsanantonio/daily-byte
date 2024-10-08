import findIndex from "./find-index";
import { describe, test, expect } from "vitest";

describe("findIndex", () => {
  test("empty array", () => {
    expect(findIndex([], (num) => num % 2 === 0)).toBe(-1);
  });

  test("finds index of first even number", () => {
    expect(findIndex([4, 12, 8, 130, 44], (num) => num % 2 === 0)).toBe(0);
    expect(findIndex([5, 12, 8, 130, 44], (num) => num % 2 === 0)).toBe(1);
  });

  test("no element passes test", () => {
    expect(findIndex([5, 12, 8, 130, 44], (num) => num > 200)).toBe(-1);
  });

  test("searches from given start index", () => {
    expect(findIndex([5, 12, 8, 130, 44], (num) => num % 2 === 0, 1)).toBe(1);
    expect(findIndex([5, 12, 8, 130, 44], (num) => num % 10 === 0, 2)).toBe(3);
    expect(findIndex([5, 12, 8, 130, 44], (num) => num % 2 === 0, 3)).toBe(3);
  });

  test("handles negative start index", () => {
    expect(findIndex([5, 12, 8, 130, 44], (num) => num > 3, -2)).toBe(3);
    expect(findIndex([5, 12, 8, 130, 44], (num) => num < 100, -2)).toBe(4);
  });

  test("handles out of bound index", () => {
    expect(findIndex([5, 12, 8, 130, 44], (value) => value >= 12, 5)).toBe(-1);
    expect(findIndex([5, 12, 8, 130, 44], (value) => value >= 12, 10)).toBe(-1);
    expect(findIndex([5, 12, 8, 130, 44], (value) => value >= 12, -10)).toBe(1);
  });
});
