import { getLevelNpcs } from '../data/levels.js';
import { createBouncePads } from './bouncePads.js';
import { createGravityFields } from './gravityFields.js';

export function loadLevel(scene, level) {
  const { width, height } = level.world;

  scene.physics.world.setBounds(0, 0, width, height);
  scene.physics.world.checkCollision.left = true;
  scene.physics.world.checkCollision.right = true;
  scene.physics.world.checkCollision.up = true;
  scene.physics.world.checkCollision.down = false;
  scene.cameras.main.setBounds(0, 0, width, height);

  scene.add
    .image(480, 270, 'cosmic-background')
    .setDisplaySize(960, 540)
    .setScrollFactor(0)
    .setDepth(-30);

  addStarField(scene, width, height);

  const platforms = scene.physics.add.staticGroup();
  (level.platforms ?? []).forEach((platformData) => {
    const platform = platforms.create(platformData.x, platformData.y, 'platform');
    platform.setDisplaySize(platformData.width, platformData.height);
    platform.setDepth(2);
    platform.refreshBody();
  });

  const ingredients = scene.physics.add.group({ allowGravity: false, immovable: true });
  (level.ingredients ?? []).forEach((ingredientData) => {
    const ingredient = ingredients.create(ingredientData.x, ingredientData.y, 'ingredient');
    ingredient.setData('id', ingredientData.id);
    ingredient.setData('name', ingredientData.name);
    ingredient.setData('ingredient', ingredientData);
    ingredient.setDepth(8);
    ingredient.setCircle(15);
    ingredient.body.allowGravity = false;
    if (ingredientData.tint) {
      ingredient.setTint(ingredientData.tint);
    }
    if (ingredientData.scale) {
      ingredient.setScale(ingredientData.scale);
    }

    scene.tweens.add({
      targets: ingredient,
      y: ingredient.y - 12,
      duration: 900,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });
  });

  const checkpoints = scene.physics.add.staticGroup();
  (level.checkpoints ?? []).forEach((checkpointData) => {
    const checkpoint = checkpoints.create(checkpointData.x, checkpointData.y, 'checkpoint');
    checkpoint.setData('id', checkpointData.id);
    checkpoint.setData('respawn', checkpointData.respawn);
    checkpoint.setDepth(6);
    checkpoint.setTint(0x9c83ff);
    checkpoint.refreshBody();
  });

  const hazards = scene.physics.add.staticGroup();
  (level.hazards ?? []).forEach((hazardData) => {
    const hazard = hazards.create(hazardData.x, hazardData.y, 'hazard');
    hazard.setData('id', hazardData.id);
    hazard.setData('name', hazardData.name);
    hazard.setDisplaySize(hazardData.width, hazardData.height);
    hazard.setDepth(5);
    hazard.refreshBody();
  });

  const gravityFields = createGravityFields(scene, level.gravityFields ?? []);
  const bouncePads = createBouncePads(scene, level.bouncePads ?? []);

  let portal = null;
  if (level.exit) {
    const portalSprite = scene.physics.add.staticSprite(level.exit.x, level.exit.y, 'portal');
    portalSprite.setData('id', level.exit.id);
    portalSprite.setData('requiresIngredientIds', level.exit.requiresIngredientIds ?? []);
    portalSprite.setDepth(6);
    portalSprite.setAlpha(0.68);
    portalSprite.setTint(0x7c5bff);
    portalSprite.refreshBody();

    const label = scene.add
      .text(level.exit.x, level.exit.y - 70, 'Exit Portal', {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '15px',
        color: '#e7dcff',
        stroke: '#201047',
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setDepth(9);

    portal = { sprite: portalSprite, label };
  }

  const npcGroup = scene.physics.add.staticGroup();
  const npcLabels = [];
  getLevelNpcs(level).forEach((npcData) => {
    const npcSprite = npcGroup.create(npcData.x, npcData.y, 'npc');
    npcSprite.setDepth(7);
    npcSprite.setData('id', npcData.id);
    npcSprite.setData('name', npcData.name);
    npcSprite.setData('npc', npcData);
    if (npcData.tint) {
      npcSprite.setTint(npcData.tint);
    }
    npcSprite.refreshBody();

    const npcName = scene.add
      .text(npcData.x, npcData.y - 58, npcData.name, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '15px',
        color: '#fff7db',
        stroke: '#2c1055',
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setDepth(9);
    npcLabels.push(npcName);
  });

  const firstNpcSprite = npcGroup.getChildren()[0] ?? null;

  return {
    platforms,
    ingredients,
    checkpoints,
    hazards,
    gravityFields,
    bouncePads,
    portal,
    npcs: {
      group: npcGroup,
      labels: npcLabels,
    },
    npc: {
      sprite: firstNpcSprite,
      nameText: npcLabels[0] ?? null,
    },
  };
}

function addStarField(scene, width, height) {
  const random = seededRandom(101);
  const tints = [0xffffff, 0x98fff2, 0xffe66d, 0xff78dc];

  for (let index = 0; index < 95; index += 1) {
    const star = scene.add.image(random() * width, random() * height, 'star-dot');
    star.setDepth(-12);
    star.setScrollFactor(0.45 + random() * 0.35);
    star.setScale(0.25 + random() * 0.55);
    star.setAlpha(0.35 + random() * 0.55);
    star.setTint(tints[Math.floor(random() * tints.length)]);
  }

  scene.add
    .particles(0, 0, 'star-dot', {
      x: { min: 0, max: width },
      y: { min: 0, max: height },
      lifespan: 5200,
      speedX: { min: -8, max: 10 },
      speedY: { min: -4, max: 8 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 0.5, end: 0 },
      tint: [0x98fff2, 0xff78dc, 0xffe66d],
      frequency: 260,
      quantity: 1,
    })
    .setDepth(-9)
    .setScrollFactor(0.65);
}

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}
