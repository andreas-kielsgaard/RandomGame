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

Iteration 7 has playable loops for all 5 planned prototype levels. Each level includes generated placeholder art, platforming, camera follow, checkpoint respawn, psychedelic hazards, one collectible ingredient, an NPC quest giver, dialogue interaction, an exit portal gated by the quest item, procedural audio, and animated placeholder presentation. Completing Level 5 assembles **The Cosmic Fax Machine That Sends God a Bug Report** and shows the current prototype ending.

## Current Playable Levels

- Level 1: Nebula Noodle Grove
- Level 2: Prism Pancake Belt
- Level 3: Lunar Licorice Rift
- Level 4: Velvet Supernova Market
- Level 5: The Final Soup Singularity

## Gameplay Loop

Talk to the local cosmic weirdo, collect their impossible ingredient, avoid hazards, activate checkpoints, and enter the exit portal after the ingredient has been collected. Reaching a portal early shows what is still missing. Collected ingredients and installed fax-machine components persist across level transitions during the run. The finale records the last component, sends a divine support ticket, and lets you press `R` to restart from Level 1.

Level 3 introduces Gravity Parole Fields, translucent zones that reduce gravity and increase air control while you are inside them. It also adds bounce pads that launch the player upward automatically.

Level 4 adds passive market stalls/signs. Stand near them to read spiritually questionable vendor copy while platforming through the supernova market.

Level 5 reuses Gravity Parole Fields and bounce pads in a final support-queue ascent. It also adds passive support terminals with cosmic backend warnings and a generated fax-machine ending visual.

## Audio and Animation

The prototype uses Web Audio to generate sound effects, soft looping cosmic ambience, and short NPC voice barks in code. Audio unlocks after the first key or pointer press to respect browser autoplay rules. Press `M` to mute or unmute the cosmic backend.

The player now swaps between idle, run, jump, and fall generated frames. NPCs bob and pulse, ingredients shimmer, portals rotate and sparkle, and the ending fax machine prints a tiny support ticket while making procedural office-divinity noises.

## Controls

- Move: `A` / `D` or Left / Right Arrow
- Jump: `W`, Up Arrow, or Space
- Talk / advance dialogue: `E`
- Advance dialogue: Space
- Show or hide inventory and fax crafting progress: `I` or `C`
- Respawn from checkpoint / restart from ending: `R`
- Mute or unmute audio: `M`
- Pause: `P`
- Show or hide help: `H` or `?`
