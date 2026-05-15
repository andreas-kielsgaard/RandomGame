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
    status: 'playable',
    world: { width: 3000, height: 960 },
    playerStart: { x: 130, y: 820 },
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
        'Mossbyte slots the Black Licorice Root Access Token into the fax machine. It can now authenticate with the cosmic backend, which is tragic but useful.',
      missingRequirementText:
        'The rift rejects you. Gravity remains banned pending licorice-based authentication and one extremely tired moderator sigh.',
      component: {
        id: 'licorice-authentication-spool',
        name: 'Licorice Authentication Spool',
        description: 'Lets the fax machine log in without accepting cookies from the moon.',
      },
    },
    platforms: [
      { x: 370, y: 924, width: 740, height: 72 },
      { x: 760, y: 780, width: 180, height: 34 },
      { x: 1030, y: 650, width: 190, height: 34 },
      { x: 1285, y: 520, width: 180, height: 34 },
      { x: 1535, y: 390, width: 230, height: 34 },
      { x: 1800, y: 520, width: 220, height: 34 },
      { x: 2075, y: 665, width: 185, height: 34 },
      { x: 2360, y: 780, width: 250, height: 34 },
      { x: 2740, y: 900, width: 520, height: 72 },
    ],
    ingredients: [
      {
        id: 'black-licorice-root-token',
        name: 'Black Licorice Root Access Token',
        x: 1535,
        y: 330,
        tint: 0x2c133f,
        scale: 1.18,
      },
    ],
    checkpoints: [
      {
        id: 'appeal-queue-checkpoint',
        x: 1030,
        y: 594,
        respawn: { x: 1030, y: 584 },
      },
    ],
    hazards: [
      {
        id: 'locked-thread-pit',
        name: 'Locked Thread Pit',
        x: 910,
        y: 890,
        width: 250,
        height: 38,
      },
      {
        id: 'tone-violation-static',
        name: 'Tone Violation Static',
        x: 1685,
        y: 922,
        width: 220,
        height: 38,
      },
      {
        id: 'appeal-denied-spikes',
        name: 'Appeal Denied Spikes',
        x: 2220,
        y: 822,
        width: 150,
        height: 36,
      },
    ],
    gravityFields: [
      {
        id: 'parole-field-alpha',
        name: 'Gravity Parole Field',
        x: 1045,
        y: 610,
        width: 520,
        height: 430,
        gravityScale: 0.36,
        airControlMultiplier: 1.42,
        tint: 0x98fff2,
      },
      {
        id: 'parole-field-beta',
        name: 'Probationary Updraft Clause',
        x: 1630,
        y: 455,
        width: 470,
        height: 360,
        gravityScale: 0.42,
        airControlMultiplier: 1.32,
        tint: 0xff78dc,
      },
    ],
    bouncePads: [
      {
        id: 'appeal-launch-pad',
        name: 'Appeal Launch Pad',
        x: 610,
        y: 870,
        width: 96,
        height: 28,
        velocityY: -780,
      },
      {
        id: 'procedural-hop-pad',
        name: 'Procedural Hop Pad',
        x: 1285,
        y: 487,
        width: 86,
        height: 24,
        velocityY: -700,
      },
    ],
    exit: {
      id: 'rift-appeal-portal',
      x: 2740,
      y: 806,
    },
    npcs: [
      {
        id: 'mossbyte',
        name: 'Mossbyte',
        title: 'Burned-Out Moderation Goblin',
        x: 350,
        y: 856,
        tint: 0x98fff2,
        dialogue: {
          intro: [
            'I banned gravity for tone violations. It kept dragging every discussion downward and then acting like physics was policy.',
            'To reverse it, I need the Black Licorice Root Access Token. It is both a sacred relic and the worst password anyone has ever defended in a meeting.',
            'Use the Gravity Parole Fields. They let gravity back into society under supervision. Please do not teach it irony.',
          ],
          ready: [
            'You found the token. Good. The appeal queue just stopped making that wet spreadsheet noise.',
            'This Licorice Authentication Spool will let the Cosmic Fax Machine log in, file the bug report, and immediately get asked to reset its password.',
          ],
        },
      },
    ],
  },
  {
    id: 4,
    name: 'Level 4: Velvet Supernova Market',
    status: 'playable',
    world: { width: 3200, height: 900 },
    playerStart: { x: 130, y: 760 },
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
        'DJ Saffron Dad installs the Saffron Receipt Printer. The fax machine can now itemize grief, ambience, and premium support seasoning.',
      missingRequirementText:
        'The market portal wants Starlight Saffron. The cosmic backend will reject an under-seasoned complaint as aesthetically non-actionable.',
      component: {
        id: 'saffron-receipt-printer',
        name: 'Saffron Receipt Printer',
        description: 'Prints emotional itemized receipts for divine customer support.',
      },
    },
    platforms: [
      { x: 360, y: 864, width: 720, height: 72 },
      { x: 790, y: 730, width: 260, height: 34 },
      { x: 1095, y: 610, width: 240, height: 34 },
      { x: 1395, y: 500, width: 260, height: 34 },
      { x: 1705, y: 390, width: 220, height: 34 },
      { x: 1975, y: 515, width: 230, height: 34 },
      { x: 2265, y: 640, width: 260, height: 34 },
      { x: 2580, y: 760, width: 260, height: 34 },
      { x: 2950, y: 842, width: 520, height: 72 },
    ],
    ingredients: [
      {
        id: 'starlight-saffron',
        name: 'Starlight Saffron',
        x: 1705,
        y: 330,
        tint: 0xffa533,
        scale: 1.16,
      },
    ],
    checkpoints: [
      {
        id: 'receipt-printer-checkpoint',
        x: 1095,
        y: 554,
        respawn: { x: 1095, y: 544 },
      },
    ],
    hazards: [
      {
        id: 'emotional-price-surge',
        name: 'Emotional Price Surge',
        x: 620,
        y: 828,
        width: 180,
        height: 38,
      },
      {
        id: 'exposure-payment-pit',
        name: 'Exposure Payment Pit',
        x: 1555,
        y: 862,
        width: 250,
        height: 40,
      },
      {
        id: 'boutique-ego-static',
        name: 'Boutique Ego Static',
        x: 2140,
        y: 814,
        width: 170,
        height: 38,
      },
    ],
    gravityFields: [
      {
        id: 'velvet-awning-drift',
        name: 'Velvet Awning Drift',
        x: 1835,
        y: 455,
        width: 430,
        height: 300,
        gravityScale: 0.58,
        airControlMultiplier: 1.18,
        tint: 0xffa533,
        hint: 'The awning is doing premium float. Please respect its pricing model.',
      },
    ],
    bouncePads: [
      {
        id: 'vendor-island-launcher',
        name: 'Vendor Island Launcher',
        x: 835,
        y: 694,
        width: 92,
        height: 26,
        velocityY: -690,
      },
    ],
    marketStalls: [
      {
        id: 'aura-discount-stall',
        name: 'Aura Discount',
        x: 790,
        y: 680,
        line: 'Aura Discount: 0% off because your vibe already paid in exposure.',
        tint: 0xff78dc,
      },
      {
        id: 'micro-enlightenment-stall',
        name: 'Micro-Enlightenment',
        x: 1395,
        y: 450,
        line: 'Freshly harvested micro-enlightenment. Contains traces of LinkedIn.',
        tint: 0x98fff2,
      },
      {
        id: 'ego-death-no-refunds',
        name: 'No Refunds',
        x: 2265,
        y: 590,
        line: 'No refunds after ego death. Store credit reincarnates as a tote bag.',
        tint: 0xffe66d,
      },
      {
        id: 'aesthetic-seasoning-kiosk',
        name: 'Aesthetic Seasoning',
        x: 2580,
        y: 710,
        line: 'Support tickets without proper aesthetic seasoning will be returned as vibes.',
        tint: 0xffa533,
      },
    ],
    exit: {
      id: 'market-afterhours-portal',
      x: 2960,
      y: 748,
    },
    npcs: [
      {
        id: 'dj-saffron-dad',
        name: 'DJ Saffron Dad',
        title: 'Suspiciously Enlightened Vendor-DJ',
        x: 365,
        y: 796,
        tint: 0xffa533,
        dialogue: {
          intro: [
            'Welcome to the Velvet Supernova Market. Set time is now, price is emotional, and your aura is wearing indoor sunglasses.',
            'You need Starlight Saffron. It is a mystical ingredient, a wellness add-on, and somehow a tax category.',
            'Bring it back so I can season the Cosmic Fax Machine. The backend rejects bland complaints as low-vibration duplicates.',
          ],
          ready: [
            'You secured the Saffron. Respect. Your vibe has stopped paying in exposure and started itemizing.',
            'The Saffron Receipt Printer will print every divine support charge: ambience fee, ego corkage, and complaint garnish.',
          ],
        },
      },
    ],
  },
  {
    id: 5,
    name: 'Level 5: The Final Soup Singularity',
    status: 'playable',
    world: { width: 3400, height: 980 },
    playerStart: { x: 130, y: 850 },
    objective: 'Assemble The Cosmic Fax Machine That Sends God a Bug Report.',
    story: {
      summary:
        'The ingredients converge into a complaint device powerful enough to tell the cosmic backend that fetch quests are eating the universe.',
      teaser:
        'Assemble the fax, attach logs, and ask existence why every enlightenment arc has five errands and no dental.',
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
        x: 1670,
        y: 385,
        tint: 0xff78dc,
        scale: 1.18,
      },
    ],
    platforms: [
      { x: 370, y: 924, width: 740, height: 72 },
      { x: 760, y: 790, width: 220, height: 34 },
      { x: 1060, y: 675, width: 220, height: 34 },
      { x: 1360, y: 560, width: 240, height: 34 },
      { x: 1670, y: 445, width: 220, height: 34 },
      { x: 1970, y: 560, width: 220, height: 34 },
      { x: 2260, y: 690, width: 250, height: 34 },
      { x: 2590, y: 570, width: 220, height: 34 },
      { x: 2900, y: 720, width: 240, height: 34 },
      { x: 3230, y: 900, width: 520, height: 72 },
    ],
    checkpoints: [
      {
        id: 'support-queue-checkpoint',
        x: 1060,
        y: 619,
        respawn: { x: 1060, y: 609 },
      },
      {
        id: 'attachment-upload-checkpoint',
        x: 2260,
        y: 634,
        respawn: { x: 2260, y: 624 },
      },
    ],
    hazards: [
      {
        id: 'low-priority-abyss',
        name: 'Low Priority Abyss',
        x: 520,
        y: 890,
        width: 120,
        height: 38,
      },
      {
        id: 'cannot-reproduce-static',
        name: 'Cannot Reproduce Static',
        x: 1520,
        y: 922,
        width: 240,
        height: 38,
      },
      {
        id: 'duplicate-ticket-syrup',
        name: 'Duplicate Ticket Syrup',
        x: 2150,
        y: 922,
        width: 180,
        height: 38,
      },
      {
        id: 'attachment-too-large-pit',
        name: 'Attachment Too Large Pit',
        x: 2750,
        y: 792,
        width: 160,
        height: 36,
      },
      {
        id: 'infinite-hold-spikes',
        name: 'Infinite Hold Spikes',
        x: 3100,
        y: 864,
        width: 140,
        height: 36,
      },
    ],
    gravityFields: [
      {
        id: 'support-queue-parole-field',
        name: 'Support Queue Parole Field',
        x: 1500,
        y: 520,
        width: 500,
        height: 360,
        gravityScale: 0.42,
        airControlMultiplier: 1.35,
        tint: 0x98fff2,
        hint: 'Support gravity is temporarily waived. Please keep your ticket number visible.',
      },
      {
        id: 'hold-music-drift-field',
        name: 'Hold Music Drift Field',
        x: 2440,
        y: 655,
        width: 430,
        height: 300,
        gravityScale: 0.55,
        airControlMultiplier: 1.2,
        tint: 0xff78dc,
        hint: 'One flute note is lifting your ankles. This is not covered by warranty.',
      },
    ],
    bouncePads: [
      {
        id: 'triage-escalator-pad',
        name: 'Triage Escalator Pad',
        x: 690,
        y: 880,
        width: 92,
        height: 26,
        velocityY: -740,
      },
      {
        id: 'hold-music-launch-pad',
        name: 'Hold Music Launch Pad',
        x: 2260,
        y: 655,
        width: 88,
        height: 24,
        velocityY: -660,
      },
    ],
    supportTerminals: [
      {
        id: 'known-issue-terminal',
        name: 'Known Issue',
        x: 760,
        y: 740,
        line: 'Known issue: existence occasionally asks for five ingredients before accepting feedback.',
        tint: 0x98fff2,
      },
      {
        id: 'logs-terminal',
        name: 'Attach Logs',
        x: 1360,
        y: 510,
        line: 'Please attach logs. Feelings are not logs, unless exported as CSV.',
        tint: 0xffe66d,
      },
      {
        id: 'hold-time-terminal',
        name: 'Wait Time',
        x: 2590,
        y: 520,
        line: 'Current wait time: one flute note.',
        tint: 0xff78dc,
      },
      {
        id: 'cannot-reproduce-terminal',
        name: 'Triage Desk',
        x: 3230,
        y: 850,
        line: 'Cannot reproduce? Try being less mortal and include browser version.',
        tint: 0xffa533,
      },
    ],
    exit: {
      id: 'divine-support-uplink',
      x: 3230,
      y: 806,
    },
    npcs: [
      {
        id: 'the-hold-music-seraph',
        name: 'The Hold-Music Seraph',
        title: 'Cosmic Backend Intake Specialist',
        x: 360,
        y: 856,
        tint: 0xfff2a8,
        dialogue: {
          intro: [
            'Thank you for contacting the cosmic backend. Your consciousness is important to us, and a single flute note will assist you shortly.',
            'Before I can assemble the fax chassis, I need Singularity Soup Stock. The ticketing system recognizes broth as evidence if it spirals clockwise.',
            'Please do not refresh existence during submission. It creates duplicate tickets and a small theology problem.',
          ],
          ready: [
            'You brought the Singularity Soup Stock. Wonderful. I apologize for the delay caused by eternity having only one intern.',
            'The Final Fax Chassis can now accept the Pickle Antenna, Batter Modem, Licorice Auth Spool, and Saffron Receipt Printer without screaming.',
            'Proceed to the uplink. We will file the bug report, then watch the backend assign it to Self with perfect confidence.',
          ],
        },
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
