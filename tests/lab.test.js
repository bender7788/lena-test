import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateReaction,
  clamp,
  describeReaction,
  normalizeMix,
} from "../src/lab.js";

test("clamp keeps values inside the experiment range", () => {
  assert.equal(clamp(-4), 0);
  assert.equal(clamp(42), 42);
  assert.equal(clamp(140), 100);
});

test("normalizeMix supplies defaults and clamps every input", () => {
  assert.deepEqual(normalizeMix({ energy: 120, curiosity: -3 }), {
    energy: 100,
    curiosity: 0,
    calm: 46,
  });
});

test("a calm mixture produces a still reaction", () => {
  const reaction = calculateReaction({ energy: 10, curiosity: 20, calm: 90 });

  assert.equal(reaction.intensity, 14);
  assert.equal(reaction.phase, "Still");
  assert.match(describeReaction(reaction), /Ruhe/);
});

test("a balanced mixture produces a pulse", () => {
  const reaction = calculateReaction({ energy: 55, curiosity: 60, calm: 55 });

  assert.equal(reaction.intensity, 55);
  assert.equal(reaction.stability, 100);
  assert.equal(reaction.signature, "Pulse · 55%");
});

test("a highly energetic mixture produces a nova", () => {
  const reaction = calculateReaction({ energy: 95, curiosity: 90, calm: 15 });

  assert.equal(reaction.intensity, 92);
  assert.equal(reaction.phase, "Nova");
  assert.ok(reaction.glow > 70);
});
