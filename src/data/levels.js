export const levels = [
  {
    id: 1,
    name: 'Level 1: Nebula Noodle Grove',
    status: 'playable',
    world: { width: 2400, height: 720 },
    playerStart: { x: 130, y: 560 },
    objective: 'Stabilize Chef Zynth\'s soup by fetching the Quantum Pickle Shard.',
    story: {
      summary:
        'The universe is trapped in a fetch quest economy, so Chef Zynth is helping build The Cosmic Fax Machine That Sends God a Bug Report.',
      teaser:
        'Chef Zynth insists soup is the original cloud infrastructure. He is not completely wrong, which is upsetting.',
    },
    quest: {
      id: 'orbital-soup-integrity',
      title: 'Orbital Soup Integrity Incident',
      giverId: 'chef-zynth',
      requiredIngredientIds: ['quantum-pickle-shard'],
      completionText:
        'Chef Zynth installs the Quantum Pickle Shard as a complaint antenna. The soup stops rotating like a haunted loading spinner.',
      missingRequirementText:
        'The portal sniffs the air and refuses service. Chef Zynth still needs the Quantum Pickle Shard, preferably before the soup becomes a lifestyle brand.',
      component: {
        id: 'pickle-complaint-antenna',
        name: 'Pickle Complaint Antenna',
        description: 'Receives bug-report pings from dimensions that still use forums.',
      },
    },
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
        tint: 0xffe66d,
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
    },
    npcs: [
      {
        id: 'chef-zynth',
        name: 'Chef Zynth',
        title: 'Soup Physicist / Ex-Forum Oracle',
        x: 420,
        y: 616,
        tint: 0xff78dc,
        dialogue: {
          intro: [
            'My nebula broth has lost orbital integrity. The noodles are posting through it.',
            'Bring me the Quantum Pickle Shard. It is stupid, yes, but stupid is just sacred wearing cargo shorts.',
            'Do not let the Normie Field smooth your edges. It hates ingredients with lore.',
          ],
          ready: [
            'You have the Pickle Shard. Excellent. The soup now understands grievance as a vector.',
            'Enter the portal and tell brunch I said breakfast prophecy is just astrology with a waffle iron.',
          ],
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Level 2: Prism Pancake Belt',
    status: 'playable',
    world: { width: 2800, height: 820 },
    playerStart: { x: 130, y: 690 },
    objective: 'Recover the Luminous Batter Comet for brunch-based prophecy calibration.',
    story: {
      summary:
        'A brunch occultist needs cosmic batter to prove pancakes can detect spiritually suspicious scheduling conflicts.',
      teaser:
        'The Prism Pancake Belt is where every brunch plan becomes a prophecy, then gets postponed by one emotionally avoidant group chat.',
    },
    quest: {
      id: 'breakfast-prophecy-calibration',
      title: 'Breakfast Prophecy Calibration',
      giverId: 'madame-griddle-voss',
      requiredIngredientIds: ['luminous-batter-comet'],
      completionText:
        'Madame Griddle Voss bolts the Luminous Batter Comet into the fax machine. It immediately predicts a maple-flavored support ticket.',
      missingRequirementText:
        'The portal says the brunch prophecy is under-seasoned. Find the Luminous Batter Comet before the syrup starts networking.',
      component: {
        id: 'batter-prophecy-modem',
        name: 'Batter Prophecy Modem',
        description: 'Converts pancake omens into bug-report-compatible fax tones.',
      },
    },
    platforms: [
      { x: 390, y: 784, width: 780, height: 72 },
      { x: 830, y: 650, width: 210, height: 34 },
      { x: 1075, y: 558, width: 170, height: 34 },
      { x: 1325, y: 462, width: 230, height: 34 },
      { x: 1600, y: 555, width: 260, height: 34 },
      { x: 1855, y: 668, width: 210, height: 34 },
      { x: 2140, y: 610, width: 240, height: 34 },
      { x: 2470, y: 764, width: 620, height: 72 },
    ],
    ingredients: [
      {
        id: 'luminous-batter-comet',
        name: 'Luminous Batter Comet',
        x: 1325,
        y: 405,
        tint: 0xfff2a8,
        scale: 1.12,
      },
    ],
    checkpoints: [
      {
        id: 'brunch-oracle-beacon',
        x: 1075,
        y: 502,
        respawn: { x: 1075, y: 492 },
      },
    ],
    hazards: [
      {
        id: 'mimosa-static',
        name: 'Mimosa Static',
        x: 690,
        y: 746,
        width: 170,
        height: 34,
      },
      {
        id: 'small-talk-thorns',
        name: 'Small-Talk Thorns',
        x: 1740,
        y: 704,
        width: 150,
        height: 36,
      },
    ],
    exit: {
      id: 'brunch-event-horizon',
      x: 2520,
      y: 670,
    },
    npcs: [
      {
        id: 'madame-griddle-voss',
        name: 'Madame Griddle Voss',
        title: 'Brunch Occultist / Adjunct Prophet',
        x: 380,
        y: 716,
        tint: 0xffe66d,
        dialogue: {
          intro: [
            'The pancakes are reading as emotionally JPEG-compressed.',
            'I require the Luminous Batter Comet to calibrate breakfast-based prophecy.',
            'Normie physics says brunch is a meal. Cowards. It is a scheduling wound with maple on it.',
          ],
          ready: [
            'The comet hums. The griddle sees all. Mostly unpaid internships and avoidant texts.',
            'Take the portal. The fax machine needs this modem before God can pretend the ticket is a duplicate.',
          ],
        },
      },
    ],
  },
  {
    id: 3,
    name: 'Level 3: Lunar Licorice Rift',
    status: 'stub',
    world: { width: 2900, height: 820 },
    objective: 'Recover the Black Licorice Root Access Token and unban gravity.',
    story: {
      summary:
        'A burned-out moderation goblin has accidentally banned gravity for tone violations and needs a licorice relic to reverse the decision.',
      teaser:
        'Next: appeal gravity moderation with Mossbyte, who has seen every bad-faith moon argument twice and still owns a tiny gavel.',
    },
    quest: {
      id: 'gravity-ban-appeal',
      title: 'Gravity Ban Appeal',
      giverId: 'mossbyte',
      requiredIngredientIds: ['black-licorice-root-token'],
      completionText:
        'The Black Licorice Root Access Token restores gravity with a passive-aggressive changelog entry.',
      missingRequirementText:
        'The rift rejects you. Gravity remains banned pending licorice-based authentication.',
      component: {
        id: 'licorice-authentication-spool',
        name: 'Licorice Authentication Spool',
        description: 'Lets the fax machine log in without accepting cookies from the moon.',
      },
    },
    ingredients: [
      {
        id: 'black-licorice-root-token',
        name: 'Black Licorice Root Access Token',
      },
    ],
    npcs: [
      {
        id: 'mossbyte',
        name: 'Mossbyte',
        title: 'Burned-Out Moderation Goblin',
        concept:
          'A tiny moon bureaucrat who believes every metaphysical problem is one locked thread away from healing.',
      },
    ],
  },
  {
    id: 4,
    name: 'Level 4: Velvet Supernova Market',
    status: 'stub',
    world: { width: 3100, height: 840 },
    objective: 'Barter for Starlight Saffron in the market where every price is emotional.',
    story: {
      summary:
        'A suspiciously enlightened vendor-DJ sells enlightenment adjacent products and insists the fax machine needs seasoning.',
      teaser:
        'Next: haggle with DJ Saffron Dad, who charges three unresolved memories and a tasteful jacket compliment.',
    },
    quest: {
      id: 'market-of-emotional-pricing',
      title: 'Market of Emotional Pricing',
      giverId: 'dj-saffron-dad',
      requiredIngredientIds: ['starlight-saffron'],
      completionText:
        'Starlight Saffron is installed. The fax machine now smells expensive and spiritually non-refundable.',
      missingRequirementText:
        'The market portal wants Starlight Saffron and one feeling you have not processed in public.',
      component: {
        id: 'saffron-receipt-printer',
        name: 'Saffron Receipt Printer',
        description: 'Prints emotional itemized receipts for divine customer support.',
      },
    },
    ingredients: [
      {
        id: 'starlight-saffron',
        name: 'Starlight Saffron',
      },
    ],
    npcs: [
      {
        id: 'dj-saffron-dad',
        name: 'DJ Saffron Dad',
        title: 'Suspiciously Enlightened Vendor-DJ',
        concept:
          'A market mystic who speaks exclusively in set times, price tiers, and gentle accusations about your aura.',
      },
    ],
  },
  {
    id: 5,
    name: 'Level 5: The Final Soup Singularity',
    status: 'stub',
    world: { width: 3300, height: 860 },
    objective: 'Assemble The Cosmic Fax Machine That Sends God a Bug Report.',
    story: {
      summary:
        'The ingredients converge into a complaint device powerful enough to tell the cosmic backend that fetch quests are eating the universe.',
      teaser:
        'Finale later: assemble the fax, attach logs, and ask existence why every enlightenment arc has five errands and no dental.',
    },
    quest: {
      id: 'divine-bug-report',
      title: 'File the Divine Bug Report',
      giverId: 'the-hold-music-seraph',
      requiredIngredientIds: ['singularity-soup-stock'],
      completionText:
        'The fax connects. Somewhere beyond causality, a ticket is created and immediately marked low priority.',
      missingRequirementText:
        'The singularity needs soup stock, paperwork, and the courage to click Submit anyway.',
      component: {
        id: 'final-fax-chassis',
        name: 'Final Fax Chassis',
        description: 'The actual machine body, humming with procedural dread and neon warranty stickers.',
      },
    },
    ingredients: [
      {
        id: 'singularity-soup-stock',
        name: 'Singularity Soup Stock',
      },
    ],
    npcs: [
      {
        id: 'the-hold-music-seraph',
        name: 'The Hold-Music Seraph',
        title: 'Cosmic Backend Intake Specialist',
        concept:
          'A radiant support agent who apologizes for the delay while the universe plays one flute note forever.',
      },
    ],
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

export function getLevelNpcs(level) {
  if (Array.isArray(level.npcs)) {
    return level.npcs;
  }

  if (level.npc) {
    return [
      {
        id: level.npc.id ?? 'legacy-npc',
        name: level.npc.name,
        title: level.npc.title ?? 'Quest Giver',
        x: level.npc.x,
        y: level.npc.y,
        dialogue: {
          intro: [level.npc.line].filter(Boolean),
        },
      },
    ];
  }

  return [];
}
