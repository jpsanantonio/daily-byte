import setCancellableInterval from "./cancellable-interval";
import { describe, test, expect } from "vitest";

describe("setCancellableInterval", () => {
  test("returns a function", () => {
    expect(typeof setCancellableInterval(() => {})).toBe("function");
  });

  describe("cancelled", () => {
    test(
      "immediately",
      new Promise((done) => {
        expect.assertions(2);
        let i = 0;

        setInterval(() => {
          // Ensure setInterval callback is never called.
          expect(i).toBe(0);
          done();
        });
        const cancel = setCancellableInterval(() => {
          i++;
        }, 10);
        cancel();
        expect(i).toBe(0);
      })
    );

    test(
      "after running once",
      new Promise((done) => {
        let i = 0;

        const cancel = setCancellableInterval(() => {
          i++;
        }, 10);

        setTimeout(() => {
          expect(i).toBe(1);
          cancel();
          done();
        }, 15);

        expect(i).toBe(0);
      })
    );

    test(
      "after running twice",
      new Promise((done) => {
        let i = 0;

        const cancel = setCancellableInterval(() => {
          i++;

          if (i === 2) {
            cancel();
            done();
          }
        }, 10);

        expect(i).toBe(0);
      })
    );
  });

  test(
    "uses parameters",
    new Promise((done) => {
      let i = 1;
      let count = 0;

      const cancel = setCancellableInterval(
        (foo, bar) => {
          count++;
          i += foo;
          i *= bar;

          if (count === 1) {
            expect(i).toBe(21);
          }

          if (count === 2) {
            expect(i).toBe(161);
            cancel();
            done();
          }
        },
        10,
        2,
        7
      );

      expect(i).toBe(1);
    })
  );
});
