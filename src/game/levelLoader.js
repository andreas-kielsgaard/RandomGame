export function loadLevel(scene, level) {
  const { width, height } = level.world;

  scene.physics.world.setBounds(0, 0, width, height);
  scene.cameras.main.setBounds(0, 0, width, height);

  scene.add
    .image(480, 270, 'cosmic-background')
    .setDisplaySize(960, 540)
    .setScrollFactor(0)
    .setDepth(-30);

  addStarField(scene, width, height);

  const platforms = scene.physics.add.staticGroup();
  level.platforms.forEach((platformData) => {
    const platform = platforms.create(platformData.x, platformData.y, 'platform');
    platform.setDisplaySize(platformData.width, platformData.height);
    platform.setDepth(2);
    platform.refreshBody();
  });

  const ingredients = scene.physics.add.group({ allowGravity: false, immovable: true });
  level.ingredients.forEach((ingredientData) => {
    const ingredient = ingredients.create(ingredientData.x, ingredientData.y, 'ingredient');
    ingredient.setData('id', ingredientData.id);
    ingredient.setData('name', ingredientData.name);
    ingredient.setDepth(8);
    ingredient.setCircle(15);
    ingredient.setAllowGravity(false);

    scene.tweens.add({
      targets: ingredient,
      y: ingredient.y - 12,
      duration: 900,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });
  });

  const npcSprite = scene.physics.add.staticSprite(level.npc.x, level.npc.y, 'npc');
  npcSprite.setDepth(7);
  npcSprite.setData('name', level.npc.name);
  npcSprite.refreshBody();

  const npcName = scene.add
    .text(level.npc.x, level.npc.y - 58, level.npc.name, {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '15px',
      color: '#fff7db',
      stroke: '#2c1055',
      strokeThickness: 4,
    })
    .setOrigin(0.5)
    .setDepth(9);

  return {
    platforms,
    ingredients,
    npc: {
      sprite: npcSprite,
      nameText: npcName,
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
