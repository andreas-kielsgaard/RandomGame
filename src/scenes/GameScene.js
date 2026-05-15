import Phaser from 'phaser';
import { getLevelById, getNextLevel } from '../data/levels.js';
import { loadLevel } from '../game/levelLoader.js';
import { createPlayer, resetPlayerController, updatePlayerController } from '../game/player.js';
import { createGameUi } from '../game/ui.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create(data = {}) {
    this.level = getLevelById(data.levelId ?? 1);
    if (this.level.status !== 'playable') {
      this.scene.start('ComingSoonScene', { level: this.level, previousLevelId: 1 });
      return;
    }

    this.collectedIngredients = 0;
    this.collectedIngredientIds = new Set();
    this.totalIngredients = (this.level.ingredients ?? []).length;
    this.respawnPosition = { ...this.level.playerStart };
    this.messageExpiresAt = 0;
    this.isHelpVisible = false;
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
      this.levelObjects.npc.sprite,
      this.showNpcLine,
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
    this.createActionKeys();
  }

  update(time, delta) {
    this.handleActionKeys();

    if (this.isPaused || this.isRespawning || this.isLevelComplete) {
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

    if (this.ui.messageText.visible && time > this.messageExpiresAt) {
      this.ui.hideMessage();
    }
  }

  createActionKeys() {
    this.actionKeys = this.input.keyboard.addKeys({
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
    if (Phaser.Input.Keyboard.JustDown(this.actionKeys.pause)) {
      this.togglePause();
    }

    if (Phaser.Input.Keyboard.JustDown(this.actionKeys.respawn)) {
      this.respawnPlayer('Respawned at the latest checkpoint.');
    }
  }

  collectIngredient(playerSprite, ingredient) {
    ingredient.disableBody(true, true);
    this.collectedIngredients += 1;
    this.collectedIngredientIds.add(ingredient.getData('id'));
    this.ui.updateIngredients(this.collectedIngredients);

    const ingredientName = ingredient.getData('name');
    this.showWorldPop(ingredient.x, ingredient.y - 30, `Collected ${ingredientName}!`, '#fff19f');
    this.ui.showMessage('Chef Zynth beams from across the grove. The portal is listening now.', 3200);
    this.activatePortalIfReady();
  }

  showNpcLine() {
    const { name, line } = this.level.npc;
    this.ui.showMessage(`${name}: ${line}`, 3600);
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
      this.ui.showMessage(this.level.exit.lockedMessage, 3000);
      this.pulseLockedPortal();
      return;
    }

    this.isLevelComplete = true;
    this.playerController.sprite.setVelocity(0, 0);
    this.playerController.sprite.setAcceleration(0);
    this.ui.showMessage('Portal satisfied. Launching toward the next cosmic errand...', 1500);
    this.cameras.main.flash(350, 152, 255, 242);

    const nextLevel = getNextLevel(this.level.id);
    this.time.delayedCall(800, () => {
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
    return (this.level.exit.requiresIngredientIds ?? []).every((id) => this.collectedIngredientIds.has(id));
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
