import fromPairs from "./from-pairs";
import { describe, test, expect } from "vitest";

describe("fromPairs", () => {
  test("empty array", () => {
    expect(fromPairs([])).toEqual({});
  });

  test("single-element array", () => {
    expect(fromPairs([["a", 1]])).toEqual({ a: 1 });
  });

  test("two-element array", () => {
    expect(
      fromPairs([
        ["a", 1],
        ["b", 2],
      ])
    ).toEqual({ a: 1, b: 2 });
  });

  test("multiple-element array", () => {
    expect(
      fromPairs([
        ["a", 1],
        ["b", 2],
        ["c", 3],
      ])
    ).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("array as value", () => {
    expect(
      fromPairs([
        ["a", ["b", 2]],
        ["c", 3],
        ["d", 4],
      ])
    ).toEqual({ a: ["b", 2], c: 3, d: 4 });
  });
});
