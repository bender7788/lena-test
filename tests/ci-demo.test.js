import assert from "node:assert/strict";
import test from "node:test";

test("the Lena Lab CI demo gate is open", () => {
  assert.notEqual(
    process.env.LENA_LAB_CI_DEMO,
    "fail",
    "Intentional Lena Lab CI demo failure: inspect the log, then open the workflow gate.",
  );
});
