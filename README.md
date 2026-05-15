# Cosmic Fetch Quest: The Game

A browser-playable Phaser prototype about fetching impossible ingredients across a glowing psychedelic cosmos.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

## Prototype Status

Iteration 2 has a playable Level 1 loop. Chef Zynth asks for the Quantum Pickle Shard, the player collects it, activates the exit portal, and reaches a temporary coming-soon screen for Level 2. Level 1 now includes generated placeholder art, platforming, camera follow, checkpoint respawn, a psychedelic hazard, one collectible ingredient, an NPC quest prompt, and an exit portal. Levels 2 through 5 are stubbed in `src/data/levels.js` for future expansion.

## Gameplay Loop

Talk to Chef Zynth, collect the Quantum Pickle Shard, avoid the Void Syrup, activate the checkpoint, and enter the exit portal after the ingredient has been collected. Reaching the portal early shows what is still missing.

## Controls

- Move: `A` / `D` or Left / Right Arrow
- Jump: `W`, Up Arrow, or Space
- Respawn from checkpoint: `R`
- Pause: `P`
- Show or hide help: `H` or `?`
