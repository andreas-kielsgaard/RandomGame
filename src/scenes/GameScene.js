import Phaser from 'phaser';
import { getLevelById, getNextLevel, levels } from '../data/levels.js';
import { createDialogueSystem } from '../game/dialogue.js';
import { loadLevel } from '../game/levelLoader.js';
import { createPlayer, resetPlayerController, updatePlayerController } from '../game/player.js';
import {
  formatInventoryText,
  getRunState,
  hasIngredient,
  recordIngredient,
  recordQuestContribution,
} from '../game/runState.js';
import { createGameUi } from '../game/ui.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create(data = {}) {
    this.level = getLevelById(data.levelId ?? 1);
    if (this.level.status !== 'playable') {
      this.scene.start('ComingSoonScene', { level: this.level, previousLevelId: data.previousLevelId ?? 1 });
      return;
    }

    this.runState = getRunState(this);
    this.totalIngredients = (this.level.ingredients ?? []).length;
    this.collectedIngredientIds = new Set(
      (this.level.ingredients ?? [])
        .filter((ingredient) => hasIngredient(this, ingredient.id))
        .map((ingredient) => ingredient.id),
    );
    this.collectedIngredients = this.collectedIngredientIds.size;
    this.respawnPosition = { ...this.level.playerStart };
    this.messageExpiresAt = 0;
    this.portalMessageCooldownUntil = 0;
    this.isHelpVisible = false;
    this.isInventoryVisible = false;
    this.isPaused = false;
    this.isRespawning = false;
    this.isLevelComplete = false;

    this.levelObjects = loadLevel(this, this.level);
    this.playerController = createPlayer(this, this.level.playerStart);

    this.physics.add.collider(this.playerController.sprite, this.levelObjects.platforms);
    this.physics.add.overlap(
      this.playerController.sprite,
      this.levelObjects.ingredients,
      this.collectIngredient,
      null,
      this,
    );
    this.physics.add.overlap(
      this.playerController.sprite,
      this.levelObjects.checkpoints,
      this.activateCheckpoint,
      null,
      this,
    );
    this.physics.add.overlap(
      this.playerController.sprite,
      this.levelObjects.hazards,
      this.hitHazard,
      null,
      this,
    );
    if (this.levelObjects.portal) {
      this.physics.add.overlap(
        this.playerController.sprite,
        this.levelObjects.portal.sprite,
        this.tryExitLevel,
        null,
        this,
      );
    }

    this.cameras.main.startFollow(this.playerController.sprite, true, 0.1, 0.1);
    this.cameras.main.setDeadzone(170, 105);

    this.ui = createGameUi(this, this.level, this.totalIngredients);
    this.ui.updateIngredients(this.collectedIngredients);
    this.hideAlreadyCollectedIngredients();
    this.updateInventoryPanel();
    this.activatePortalIfReady();
    this.dialogueSystem = createDialogueSystem(
      this,
      this.playerController.sprite,
      this.levelObjects.npcs.group,
    );
    this.createActionKeys();
  }

  update(time, delta) {
    this.dialogueSystem.update();
    const inputConsumed = this.handleActionKeys();

    if (this.ui.messageText.visible && time > this.messageExpiresAt) {
      this.ui.hideMessage();
    }

    if (inputConsumed) {
      return;
    }

    if (this.isPaused || this.isRespawning || this.isLevelComplete || this.dialogueSystem.isOpen()) {
      this.playerController.sprite.setAccelerationX(0);
      return;
    }

    const playerEvents = updatePlayerController(this, this.playerController, delta);
    if (playerEvents.jumped) {
      this.spawnPlayerBurst(this.playerController.sprite.x, this.playerController.sprite.y + 24, 0x98fff2, 8);
    }
    if (playerEvents.landed) {
      this.spawnPlayerBurst(this.playerController.sprite.x, this.playerController.sprite.y + 28, 0xffe66d, 6);
    }

    if (this.playerController.sprite.y > this.level.world.height + 130) {
      this.respawnPlayer('The void swallowed you. Back to the last checkpoint.');
    }
  }

  createActionKeys() {
    this.actionKeys = this.input.keyboard.addKeys({
      interact: Phaser.Input.Keyboard.KeyCodes.E,
      inventory: Phaser.Input.Keyboard.KeyCodes.I,
      craft: Phaser.Input.Keyboard.KeyCodes.C,
      respawn: Phaser.Input.Keyboard.KeyCodes.R,
      pause: Phaser.Input.Keyboard.KeyCodes.P,
    });

    this.input.keyboard.on('keydown', (event) => {
      if (event.repeat) {
        return;
      }

      if (event.key === '?' || event.key.toLowerCase() === 'h') {
        this.toggleHelp();
      }
    });
  }

  handleActionKeys() {
    const interactPressed = Phaser.Input.Keyboard.JustDown(this.actionKeys.interact);
    const spacePressed = Phaser.Input.Keyboard.JustDown(this.playerController.cursors.space);
    const dialogueAdvancePressed = interactPressed || (this.dialogueSystem.isOpen() && spacePressed);

    if (this.dialogueSystem.handleInput(dialogueAdvancePressed)) {
      this.playerController.sprite.setAccelerationX(0);
      this.playerController.sprite.setVelocityX(0);
      return true;
    }

    if (this.dialogueSystem.isOpen()) {
      return true;
    }

    if (Phaser.Input.Keyboard.JustDown(this.actionKeys.pause)) {
      this.togglePause();
      return true;
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.actionKeys.inventory) ||
      Phaser.Input.Keyboard.JustDown(this.actionKeys.craft)
    ) {
      this.toggleInventory();
      return true;
    }

    if (Phaser.Input.Keyboard.JustDown(this.actionKeys.respawn)) {
      this.respawnPlayer('Respawned at the latest checkpoint.');
      return true;
    }

    return false;
  }

  collectIngredient(playerSprite, ingredient) {
    const ingredientId = ingredient.getData('id');
    if (this.collectedIngredientIds.has(ingredientId)) {
      return;
    }

    const ingredientData = ingredient.getData('ingredient');
    ingredient.disableBody(true, true);
    this.collectedIngredientIds.add(ingredientId);
    this.collectedIngredients = this.collectedIngredientIds.size;
    this.ui.updateIngredients(this.collectedIngredients);
    this.runState = recordIngredient(this, this.level, ingredientData);
    this.updateInventoryPanel();

    this.showWorldPop(ingredient.x, ingredient.y - 30, `Collected ${ingredientData.name}!`, '#fff19f');
    this.ui.showMessage('Quest item acquired. The portal pretends it always believed in you.', 3000);
    this.activatePortalIfReady();
  }

  activateCheckpoint(playerSprite, checkpoint) {
    if (checkpoint.getData('active')) {
      return;
    }

    this.levelObjects.checkpoints.getChildren().forEach((candidate) => {
      candidate.setData('active', false);
      candidate.setTint(0x9c83ff);
    });

    checkpoint.setData('active', true);
    checkpoint.setTint(0x98fff2);
    this.respawnPosition = { ...checkpoint.getData('respawn') };
    this.showWorldPop(checkpoint.x, checkpoint.y - 50, 'Checkpoint tuned!', '#98fff2');
    this.ui.showMessage('Checkpoint tuned. Reality will snap back here if things get sticky.', 2400);
    this.tweens.add({
      targets: checkpoint,
      scale: 1.18,
      duration: 140,
      yoyo: true,
      ease: 'Sine.easeOut',
    });
  }

  hitHazard(playerSprite, hazard) {
    const hazardName = hazard.getData('name') ?? 'hazard';
    this.respawnPlayer(`${hazardName} scrambled your atoms. Respawning at the last checkpoint.`);
  }

  tryExitLevel() {
    if (this.isLevelComplete) {
      return;
    }

    if (!this.hasRequiredIngredients()) {
      if (this.time.now < this.portalMessageCooldownUntil) {
        return;
      }

      this.portalMessageCooldownUntil = this.time.now + 1100;
      this.ui.showMessage(this.level.quest?.missingRequirementText ?? this.level.exit.lockedMessage, 3200);
      this.pulseLockedPortal();
      return;
    }

    this.isLevelComplete = true;
    this.runState = recordQuestContribution(this, this.level);
    this.updateInventoryPanel();
    this.playerController.sprite.setVelocity(0, 0);
    this.playerController.sprite.setAcceleration(0);
    this.ui.showMessage(
      this.level.quest?.completionText ?? 'Portal satisfied. Launching toward the next cosmic errand...',
      2100,
    );
    this.cameras.main.flash(350, 152, 255, 242);

    const nextLevel = getNextLevel(this.level.id);
    this.time.delayedCall(1300, () => {
      if (!nextLevel) {
        this.scene.start('ComingSoonScene', {
          level: {
            name: 'Prototype Complete',
            objective: 'All available levels are complete for this sprint build.',
          },
          previousLevelId: this.level.id,
        });
        return;
      }

      if (nextLevel.status === 'playable') {
        this.scene.start('GameScene', { levelId: nextLevel.id });
        return;
      }

      this.scene.start('ComingSoonScene', {
        level: nextLevel,
        previousLevelId: this.level.id,
      });
    });
  }

  hasRequiredIngredients() {
    return (this.level.quest?.requiredIngredientIds ?? this.level.exit.requiresIngredientIds ?? []).every((id) =>
      this.collectedIngredientIds.has(id) || hasIngredient(this, id),
    );
  }

  activatePortalIfReady() {
    if (!this.levelObjects.portal || !this.hasRequiredIngredients()) {
      return;
    }

    const { sprite, label } = this.levelObjects.portal;
    sprite.setAlpha(1);
    sprite.setTint(0x98fff2);
    label.setColor('#98fff2');

    this.tweens.add({
      targets: sprite,
      scale: 1.12,
      duration: 320,
      yoyo: true,
      repeat: 1,
      ease: 'Sine.easeInOut',
    });
  }

  pulseLockedPortal() {
    if (!this.levelObjects.portal) {
      return;
    }

    this.tweens.add({
      targets: this.levelObjects.portal.sprite,
      alpha: 0.42,
      duration: 120,
      yoyo: true,
      repeat: 2,
    });
  }

  respawnPlayer(message) {
    if (this.isRespawning || this.isLevelComplete) {
      return;
    }

    const { sprite } = this.playerController;
    this.isRespawning = true;
    this.ui.showMessage(message, 2200);
    this.cameras.main.shake(130, 0.006);
    this.spawnPlayerBurst(sprite.x, sprite.y, 0xff4fd8, 14);

    sprite.body.enable = false;
    sprite.setAcceleration(0);
    sprite.setVelocity(0, 0);
    sprite.setTint(0xff78dc);
    sprite.setAlpha(0.35);

    this.time.delayedCall(280, () => {
      sprite.setPosition(this.respawnPosition.x, this.respawnPosition.y);
      sprite.setAlpha(1);
      sprite.clearTint();
      sprite.body.enable = true;
      resetPlayerController(this.playerController);
      this.spawnPlayerBurst(sprite.x, sprite.y, 0x98fff2, 12);
      this.isRespawning = false;
    });
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.ui.setPausedVisible(this.isPaused);

    if (this.isPaused) {
      this.physics.pause();
      return;
    }

    this.physics.resume();
  }

  toggleHelp() {
    this.isHelpVisible = !this.isHelpVisible;
    this.ui.setHelpVisible(this.isHelpVisible);
  }

  toggleInventory() {
    this.isInventoryVisible = !this.isInventoryVisible;
    this.updateInventoryPanel();
    this.ui.setInventoryVisible(this.isInventoryVisible);
  }

  updateInventoryPanel() {
    this.ui.updateInventory(formatInventoryText(getRunState(this), this.level, levels));
  }

  hideAlreadyCollectedIngredients() {
    this.levelObjects.ingredients.getChildren().forEach((ingredient) => {
      if (this.collectedIngredientIds.has(ingredient.getData('id'))) {
        ingredient.disableBody(true, true);
      }
    });
  }

  showWorldPop(x, y, text, color) {
    const pop = this.add
      .text(x, y, text, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '15px',
        color,
        stroke: '#2c1055',
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setDepth(30);

    this.tweens.add({
      targets: pop,
      y: pop.y - 46,
      alpha: 0,
      duration: 900,
      ease: 'Sine.easeOut',
      onComplete: () => pop.destroy(),
    });
  }

  spawnPlayerBurst(x, y, tint, count) {
    for (let index = 0; index < count; index += 1) {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const distance = Phaser.Math.Between(14, 42);
      const mote = this.add
        .image(x, y, 'star-dot')
        .setTint(tint)
        .setScale(Phaser.Math.FloatBetween(0.34, 0.75))
        .setDepth(18);

      this.tweens.add({
        targets: mote,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0,
        duration: Phaser.Math.Between(360, 620),
        ease: 'Sine.easeOut',
        onComplete: () => mote.destroy(),
      });
    }
  }
}
