# Cosmic Fetch Quest: The Game

A browser-playable Phaser prototype about fetching impossible ingredients across a glowing psychedelic cosmos. The current story follows a universe trapped in an endless fetch quest economy; the player is assembling **The Cosmic Fax Machine That Sends God a Bug Report** so existence can finally file a support ticket.

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

Iteration 4 has playable loops for Levels 1 through 3. Each playable level includes generated placeholder art, platforming, camera follow, checkpoint respawn, psychedelic hazards, one collectible ingredient, an NPC quest giver, dialogue interaction, and an exit portal gated by the quest item. Levels 4 and 5 have story, NPC, quest, ingredient, and artifact-component metadata in `src/data/levels.js`, but remain coming-soon screens for now.

## Current Playable Levels

- Level 1: Nebula Noodle Grove
- Level 2: Prism Pancake Belt
- Level 3: Lunar Licorice Rift

## Gameplay Loop

Talk to the local cosmic weirdo, collect their impossible ingredient, avoid hazards, activate checkpoints, and enter the exit portal after the ingredient has been collected. Reaching a portal early shows what is still missing. Collected ingredients and installed fax-machine components persist across level transitions during the run.

Level 3 introduces Gravity Parole Fields, translucent zones that reduce gravity and increase air control while you are inside them. It also adds bounce pads that launch the player upward automatically.

## Controls

- Move: `A` / `D` or Left / Right Arrow
- Jump: `W`, Up Arrow, or Space
- Talk / advance dialogue: `E`
- Advance dialogue: Space
- Show or hide inventory and fax crafting progress: `I` or `C`
- Respawn from checkpoint: `R`
- Pause: `P`
- Show or hide help: `H` or `?`
