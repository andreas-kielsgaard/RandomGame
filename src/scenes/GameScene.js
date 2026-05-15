import Phaser from 'phaser';
import { getLevelById } from '../data/levels.js';
import { loadLevel } from '../game/levelLoader.js';
import { createPlayer, updatePlayerController } from '../game/player.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create(data = {}) {
    this.level = getLevelById(data.levelId ?? 1);
    this.collectedIngredients = 0;
    this.totalIngredients = this.level.ingredients.length;
    this.npcLineExpiresAt = 0;

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

    this.cameras.main.startFollow(this.playerController.sprite, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(140, 90);

    this.createUi();
  }

  update(time, delta) {
    updatePlayerController(this, this.playerController, delta);

    if (this.dialogueText.visible && time > this.npcLineExpiresAt) {
      this.dialogueText.setVisible(false);
    }
  }

  createUi() {
    const titleStyle = {
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '22px',
      color: '#f9f4ff',
      stroke: '#241442',
      strokeThickness: 5,
    };

    this.add
      .text(24, 18, 'Cosmic Fetch Quest: The Game', titleStyle)
      .setScrollFactor(0)
      .setDepth(50);

    this.add
      .text(24, 52, this.level.name, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '16px',
        color: '#98fff2',
      })
      .setScrollFactor(0)
      .setDepth(50);

    this.controlsText = this.add
      .text(24, 496, 'Move: A/D or Arrow Keys    Jump: W, Up, or Space', {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '14px',
        color: '#e7dcff',
        backgroundColor: 'rgba(8, 5, 20, 0.68)',
        padding: { x: 10, y: 6 },
      })
      .setScrollFactor(0)
      .setDepth(50);

    this.ingredientText = this.add
      .text(740, 22, this.getIngredientLabel(), {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '16px',
        color: '#ffe66d',
        backgroundColor: 'rgba(8, 5, 20, 0.62)',
        padding: { x: 10, y: 6 },
      })
      .setScrollFactor(0)
      .setDepth(50);

    this.dialogueText = this.add
      .text(24, 430, '', {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '16px',
        color: '#fff7db',
        backgroundColor: 'rgba(15, 7, 32, 0.86)',
        padding: { x: 12, y: 10 },
        wordWrap: { width: 580 },
      })
      .setScrollFactor(0)
      .setDepth(60)
      .setVisible(false);
  }

  collectIngredient(playerSprite, ingredient) {
    ingredient.disableBody(true, true);
    this.collectedIngredients += 1;
    this.ingredientText.setText(this.getIngredientLabel());

    const ingredientName = ingredient.getData('name');
    const pop = this.add
      .text(ingredient.x, ingredient.y - 30, `Collected ${ingredientName}!`, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '15px',
        color: '#fff19f',
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

  showNpcLine() {
    const { name, line } = this.level.npc;
    this.dialogueText.setText(`${name}: ${line}`);
    this.dialogueText.setVisible(true);
    this.npcLineExpiresAt = this.time.now + 2600;
  }

  getIngredientLabel() {
    return `Ingredients: ${this.collectedIngredients}/${this.totalIngredients}`;
  }
}
