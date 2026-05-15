const TALK_DISTANCE = 96;

export function createDialogueSystem(scene, playerSprite, npcGroup) {
  const promptText = scene.add
    .text(0, 0, '', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '13px',
      color: '#fff7db',
      backgroundColor: 'rgba(8, 5, 20, 0.78)',
      padding: { x: 8, y: 5 },
    })
    .setOrigin(0.5)
    .setDepth(75)
    .setVisible(false);

  const panel = scene.add
    .rectangle(480, 414, 780, 178, 0x0c061c, 0.92)
    .setStrokeStyle(2, 0x98fff2, 0.9)
    .setScrollFactor(0)
    .setDepth(90)
    .setVisible(false);

  const nameText = scene.add
    .text(112, 338, '', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '18px',
      color: '#ffe66d',
    })
    .setScrollFactor(0)
    .setDepth(91)
    .setVisible(false);

  const titleText = scene.add
    .text(112, 363, '', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '13px',
      color: '#98fff2',
    })
    .setScrollFactor(0)
    .setDepth(91)
    .setVisible(false);

  const bodyText = scene.add
    .text(112, 392, '', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '16px',
      color: '#fff7db',
      lineSpacing: 4,
      wordWrap: { width: 720 },
    })
    .setScrollFactor(0)
    .setDepth(91)
    .setVisible(false);

  const hintText = scene.add
    .text(838, 478, '', {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '12px',
      color: '#e7dcff',
    })
    .setOrigin(1, 0)
    .setScrollFactor(0)
    .setDepth(91)
    .setVisible(false);

  const state = {
    nearestNpc: null,
    activeNpc: null,
    lines: [],
    lineIndex: 0,
  };

  return {
    update() {
      if (state.activeNpc) {
        promptText.setVisible(false);
        return;
      }

      state.nearestNpc = findNearestNpc(playerSprite, npcGroup);
      if (!state.nearestNpc) {
        promptText.setVisible(false);
        return;
      }

      const npcData = state.nearestNpc.getData('npc');
      promptText
        .setText(`Press E to talk to ${npcData.name}`)
        .setPosition(state.nearestNpc.x, state.nearestNpc.y - 86)
        .setVisible(true);
    },
    handleInput(advancePressed) {
      if (!advancePressed) {
        return false;
      }

      if (state.activeNpc) {
        advanceDialogue(state, {
          panel,
          nameText,
          titleText,
          bodyText,
          hintText,
        });
        return true;
      }

      if (state.nearestNpc) {
        openDialogue(scene, state, state.nearestNpc, {
          panel,
          nameText,
          titleText,
          bodyText,
          hintText,
        });
        return true;
      }

      return false;
    },
    isOpen() {
      return Boolean(state.activeNpc);
    },
  };
}

function findNearestNpc(playerSprite, npcGroup) {
  let nearest = null;
  let nearestDistance = TALK_DISTANCE;

  npcGroup.getChildren().forEach((npcSprite) => {
    if (!npcSprite.active) {
      return;
    }

    const distance = Math.hypot(playerSprite.x - npcSprite.x, playerSprite.y - npcSprite.y);
    if (distance < nearestDistance) {
      nearest = npcSprite;
      nearestDistance = distance;
    }
  });

  return nearest;
}

function openDialogue(scene, state, npcSprite, ui) {
  const npcData = npcSprite.getData('npc');

  state.activeNpc = npcSprite;
  state.lineIndex = 0;
  state.lines = getDialogueLines(scene, npcData);

  ui.nameText.setText(npcData.name);
  ui.titleText.setText(npcData.title ?? 'Cosmic Bystander');

  setVisible(ui, true);
  renderLine(state, ui);
}

function advanceDialogue(state, ui) {
  state.lineIndex += 1;

  if (state.lineIndex >= state.lines.length) {
    state.activeNpc = null;
    state.lines = [];
    state.lineIndex = 0;
    setVisible(ui, false);
    return;
  }

  renderLine(state, ui);
}

function renderLine(state, ui) {
  const progress = `${state.lineIndex + 1}/${state.lines.length}`;
  ui.bodyText.setText(state.lines[state.lineIndex]);
  ui.hintText.setText(`E / Space ${progress}`);
}

function setVisible(ui, isVisible) {
  ui.panel.setVisible(isVisible);
  ui.nameText.setVisible(isVisible);
  ui.titleText.setVisible(isVisible);
  ui.bodyText.setVisible(isVisible);
  ui.hintText.setVisible(isVisible);
}

function getDialogueLines(scene, npcData) {
  const isQuestGiver = npcData.id === scene.level.quest?.giverId;
  const hasQuestItems = isQuestGiver && scene.hasRequiredIngredients();

  if (hasQuestItems && npcData.dialogue?.ready?.length) {
    return npcData.dialogue.ready;
  }

  if (npcData.dialogue?.intro?.length) {
    return npcData.dialogue.intro;
  }

  return [npcData.concept ?? 'They stare into the cosmic middle distance with suspicious sincerity.'];
}
