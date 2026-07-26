# Lena Lab

Lena Lab is a small, dependency-free interactive experiment that demonstrates a complete GitHub workflow: issue, feature branch, automated checks, pull request, review, and an optional deployment.

## What is inside

- A responsive laboratory-inspired interface
- Three live experiment controls and reusable presets
- Pure calculation logic covered by Node's built-in test runner
- A GitHub Actions workflow for syntax checks and tests
- An intentional first-run CI sentinel for the debugging part of the demo

## Run locally

Serve the repository with any static file server and open `index.html`.

```sh
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Validate

```sh
npm run check
npm test
```

No package installation is required.

## GitHub workflow

The work is tracked in [issue #1](https://github.com/bender7788/lena-test/issues/1). The feature remains in a draft pull request until it is explicitly approved.
