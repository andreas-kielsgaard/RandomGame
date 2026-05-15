export const levels = [
  {
    id: 1,
    name: 'Level 1: Nebula Noodle Grove',
    status: 'playable',
    world: { width: 2400, height: 720 },
    playerStart: { x: 130, y: 560 },
    objective: 'Bring Chef Zynth the Quantum Pickle Shard, then dive through the portal.',
    platforms: [
      { x: 470, y: 684, width: 940, height: 72 },
      { x: 940, y: 548, width: 300, height: 34 },
      { x: 1215, y: 450, width: 280, height: 34 },
      { x: 1540, y: 570, width: 390, height: 34 },
      { x: 1960, y: 490, width: 340, height: 34 },
      { x: 2260, y: 665, width: 420, height: 72 },
    ],
    ingredients: [
      {
        id: 'quantum-pickle-shard',
        name: 'Quantum Pickle Shard',
        x: 1215,
        y: 394,
      },
    ],
    checkpoints: [
      {
        id: 'pickle-pulse-marker',
        x: 940,
        y: 492,
        respawn: { x: 940, y: 482 },
      },
    ],
    hazards: [
      {
        id: 'void-syrup-puddle',
        name: 'Void Syrup',
        x: 672,
        y: 628,
        width: 188,
        height: 38,
      },
    ],
    exit: {
      id: 'soup-singularity-gate',
      x: 2260,
      y: 572,
      requiresIngredientIds: ['quantum-pickle-shard'],
      lockedMessage: 'Chef Zynth still needs the Quantum Pickle Shard before this portal trusts you.',
    },
    npc: {
      name: 'Chef Zynth',
      x: 420,
      y: 616,
      line: 'My soup has lost its orbit. Fetch the Quantum Pickle Shard before dinner becomes a black hole.',
    },
  },
  {
    id: 2,
    name: 'Level 2: Prism Pancake Belt',
    status: 'stub',
    world: { width: 2600, height: 760 },
    objective: 'Find the Luminous Batter Comet.',
  },
  {
    id: 3,
    name: 'Level 3: Lunar Licorice Rift',
    status: 'stub',
    world: { width: 2800, height: 780 },
    objective: 'Cross the candy-gravity fractures.',
  },
  {
    id: 4,
    name: 'Level 4: Velvet Supernova Market',
    status: 'stub',
    world: { width: 3000, height: 800 },
    objective: 'Barter for a jar of Starlight Saffron.',
  },
  {
    id: 5,
    name: 'Level 5: The Final Soup Singularity',
    status: 'stub',
    world: { width: 3200, height: 820 },
    objective: 'Deliver the pantry of impossible flavors.',
  },
];

export function getLevelById(id) {
  const level = levels.find((candidate) => candidate.id === id);

  if (!level) {
    throw new Error(`Level ${id} does not exist.`);
  }

  return level;
}

export function getNextLevel(currentLevelId) {
  const currentIndex = levels.findIndex((candidate) => candidate.id === currentLevelId);

  if (currentIndex < 0 || currentIndex >= levels.length - 1) {
    return null;
  }

  return levels[currentIndex + 1];
}
