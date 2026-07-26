import { calculateReaction, describeReaction, PRESETS } from "./lab.js";

const inputs = {
  energy: document.querySelector("#energy"),
  curiosity: document.querySelector("#curiosity"),
  calm: document.querySelector("#calm"),
};

const outputs = {
  energy: document.querySelector("#energy-value"),
  curiosity: document.querySelector("#curiosity-value"),
  calm: document.querySelector("#calm-value"),
};

const reactionStage = document.querySelector(".reaction-stage");
const reactionName = document.querySelector("#reaction-name");
const observationText = document.querySelector("#observation-text");
const intensityValue = document.querySelector("#intensity-value");
const stabilityValue = document.querySelector("#stability-value");
const runCount = document.querySelector("#run-count");
const liveStatus = document.querySelector("#live-status");
const runButton = document.querySelector("#run-experiment");
const resetButton = document.querySelector("#reset-experiment");
const presetButtons = [...document.querySelectorAll("[data-preset]")];

let experiments = 0;

function getMix() {
  return Object.fromEntries(
    Object.entries(inputs).map(([name, input]) => [name, Number(input.value)]),
  );
}

function updateControl(input, output) {
  output.value = input.value;
  input.style.setProperty("--range-progress", `${input.value}%`);
}

function renderReaction() {
  Object.keys(inputs).forEach((name) => updateControl(inputs[name], outputs[name]));

  const reaction = calculateReaction(getMix());
  document.documentElement.style.setProperty("--reaction-hue", reaction.hue);
  document.documentElement.style.setProperty("--reaction-glow", `${reaction.glow}%`);
  reactionName.textContent = reaction.signature;
  observationText.textContent = describeReaction(reaction);
  intensityValue.textContent = reaction.intensity;
  stabilityValue.textContent = reaction.stability;

  return reaction;
}

function selectPreset(name) {
  const preset = PRESETS[name];
  if (!preset) return;

  Object.entries(preset).forEach(([key, value]) => {
    inputs[key].value = value;
  });
  presetButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.preset === name);
  });
  const reaction = renderReaction();
  liveStatus.textContent = `${name} geladen: ${reaction.signature}.`;
}

Object.values(inputs).forEach((input) => {
  input.addEventListener("input", () => {
    presetButtons.forEach((button) => button.classList.remove("is-active"));
    renderReaction();
  });
});

presetButtons.forEach((button) => {
  button.addEventListener("click", () => selectPreset(button.dataset.preset));
});

runButton.addEventListener("click", () => {
  const reaction = renderReaction();
  experiments += 1;
  runCount.textContent = String(experiments).padStart(2, "0");
  reactionStage.classList.remove("is-running");
  requestAnimationFrame(() => reactionStage.classList.add("is-running"));
  liveStatus.textContent = `Durchlauf ${experiments}: ${reaction.signature}, Stabilität ${reaction.stability}%.`;
  window.setTimeout(() => reactionStage.classList.remove("is-running"), 850);
});

resetButton.addEventListener("click", () => {
  inputs.energy.value = 68;
  inputs.curiosity.value = 84;
  inputs.calm.value = 46;
  experiments = 0;
  runCount.textContent = "00";
  presetButtons.forEach((button) => button.classList.remove("is-active"));
  renderReaction();
  liveStatus.textContent = "Experiment zurückgesetzt.";
});

renderReaction();
