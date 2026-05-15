const PANEL_BACKGROUND = 'rgba(8, 5, 20, 0.72)';

export function createGameUi(scene, level, totalIngredients) {
  const title = scene.add
    .text(24, 18, 'Cosmic Fetch Quest: The Game', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '22px',
      color: '#f9f4ff',
      stroke: '#241442',
      strokeThickness: 5,
    })
    .setScrollFactor(0)
    .setDepth(50);

  const levelName = scene.add
    .text(24, 52, level.name, {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '16px',
      color: '#98fff2',
    })
    .setScrollFactor(0)
    .setDepth(50);

  const objective = scene.add
    .text(24, 78, `${level.quest?.title ?? 'Current Quest'}: ${level.objective}`, {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '14px',
      color: '#fff7db',
      backgroundColor: 'rgba(8, 5, 20, 0.48)',
      padding: { x: 10, y: 6 },
      wordWrap: { width: 560 },
    })
    .setScrollFactor(0)
    .setDepth(50);

  const controls = scene.add
    .text(24, 496, 'Move: A/D or Arrows    Jump: W/Up/Space    E: Talk    I/C: Inventory    R: Respawn    P: Pause    H/?: Help', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '13px',
      color: '#e7dcff',
      backgroundColor: PANEL_BACKGROUND,
      padding: { x: 10, y: 6 },
    })
    .setScrollFactor(0)
    .setDepth(50);

  const ingredientText = scene.add
    .text(936, 22, getIngredientLabel(0, totalIngredients), {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '16px',
      color: '#ffe66d',
      backgroundColor: 'rgba(8, 5, 20, 0.62)',
      padding: { x: 10, y: 6 },
    })
    .setOrigin(1, 0)
    .setScrollFactor(0)
    .setDepth(50);

  const messageText = scene.add
    .text(24, 426, '', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '16px',
      color: '#fff7db',
      backgroundColor: 'rgba(15, 7, 32, 0.88)',
      padding: { x: 12, y: 10 },
      wordWrap: { width: 600 },
    })
    .setScrollFactor(0)
    .setDepth(60)
    .setVisible(false);

  const helpOverlay = scene.add
    .text(
      480,
      270,
      [
        'Controls',
        'Move: A/D or Arrow Keys',
        'Jump: W, Up Arrow, or Space',
        'Talk / advance dialogue: E',
        'Advance dialogue: Space',
        'Inventory / crafting: I or C',
        'Respawn: R',
        'Pause: P',
        'Hide help: H or ?',
        '',
        'Mechanics',
        'Gravity Parole Fields soften gravity and improve air control.',
        'Bounce pads launch you automatically.',
        'Market stalls and support terminals display questionable wisdom when you stand nearby.',
        '',
        'Quest',
        'Collect each impossible ingredient, then activate the portal.',
      ].join('\n'),
      {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '16px',
        color: '#fff7db',
        align: 'center',
        backgroundColor: 'rgba(12, 6, 28, 0.9)',
        padding: { x: 26, y: 22 },
        wordWrap: { width: 520 },
      },
    )
    .setOrigin(0.5)
    .setScrollFactor(0)
    .setDepth(80)
    .setVisible(false);

  const pauseText = scene.add
    .text(480, 190, 'Paused', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '36px',
      color: '#fff7db',
      stroke: '#201047',
      strokeThickness: 6,
    })
    .setOrigin(0.5)
    .setScrollFactor(0)
    .setDepth(85)
    .setVisible(false);

  const inventoryOverlay = scene.add
    .text(936, 72, '', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '13px',
      color: '#fff7db',
      backgroundColor: 'rgba(12, 6, 28, 0.9)',
      padding: { x: 14, y: 12 },
      wordWrap: { width: 360 },
      lineSpacing: 3,
    })
    .setOrigin(1, 0)
    .setScrollFactor(0)
    .setDepth(78)
    .setVisible(false);

  return {
    title,
    levelName,
    objective,
    controls,
    ingredientText,
    messageText,
    helpOverlay,
    pauseText,
    inventoryOverlay,
    updateIngredients(collected) {
      ingredientText.setText(getIngredientLabel(collected, totalIngredients));
    },
    showMessage(text, duration = 2600) {
      messageText.setText(text);
      messageText.setVisible(true);
      scene.messageExpiresAt = scene.time.now + duration;
    },
    hideMessage() {
      messageText.setVisible(false);
    },
    setHelpVisible(isVisible) {
      helpOverlay.setVisible(isVisible);
    },
    setPausedVisible(isVisible) {
      pauseText.setVisible(isVisible);
    },
    setInventoryVisible(isVisible) {
      inventoryOverlay.setVisible(isVisible);
    },
    updateInventory(text) {
      inventoryOverlay.setText(text);
    },
  };
}

function getIngredientLabel(collected, total) {
  return `Ingredients: ${collected}/${total}`;
}
