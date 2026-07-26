const DEFAULT_MIX = Object.freeze({
  energy: 68,
  curiosity: 84,
  calm: 46,
});

export const PRESETS = Object.freeze({
  aurora: Object.freeze({ energy: 72, curiosity: 88, calm: 44 }),
  focus: Object.freeze({ energy: 48, curiosity: 70, calm: 82 }),
  spark: Object.freeze({ energy: 94, curiosity: 76, calm: 24 }),
});

export function clamp(value, minimum = 0, maximum = 100) {
  return Math.min(maximum, Math.max(minimum, Number(value)));
}

export function normalizeMix(mix = DEFAULT_MIX) {
  return {
    energy: clamp(mix.energy ?? DEFAULT_MIX.energy),
    curiosity: clamp(mix.curiosity ?? DEFAULT_MIX.curiosity),
    calm: clamp(mix.calm ?? DEFAULT_MIX.calm),
  };
}

export function calculateReaction(mix) {
  const normalized = normalizeMix(mix);
  const intensity = Math.round(
    clamp(
      normalized.energy * 0.46 +
        normalized.curiosity * 0.39 +
        (100 - normalized.calm) * 0.15,
    ),
  );
  const stability = Math.round(
    clamp(
      100 -
        Math.abs(normalized.energy - normalized.calm) * 0.55 -
        Math.abs(normalized.curiosity - 60) * 0.12,
    ),
  );

  let phase = "Still";
  if (intensity >= 78) phase = "Nova";
  else if (intensity >= 52) phase = "Pulse";
  else if (intensity >= 28) phase = "Glow";

  const hue = Math.round(
    clamp(174 + normalized.curiosity * 0.95 - normalized.energy * 0.35, 150, 290),
  );
  const glow = Math.round(22 + intensity * 0.62);

  return {
    ...normalized,
    intensity,
    stability,
    phase,
    hue,
    glow,
    signature: `${phase} · ${intensity}%`,
  };
}

export function describeReaction(reaction) {
  if (reaction.phase === "Nova") {
    return "Hohe Aktivität erkannt. Die Mischung sprüht vor Möglichkeiten – jetzt lohnt sich ein mutiger Versuch.";
  }

  if (reaction.phase === "Pulse") {
    return "Die Mischung ist lebendig, aber kontrolliert. Kleine Impulse können jetzt große Ideen auslösen.";
  }

  if (reaction.phase === "Glow") {
    return "Ein ruhiges Leuchten baut sich auf. Gib der Idee noch etwas Energie oder mehr Neugier.";
  }

  return "Fast völlige Ruhe. Ein idealer Zustand zum Beobachten, Sortieren und neu Ansetzen.";
}
