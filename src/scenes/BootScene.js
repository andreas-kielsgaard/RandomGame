import Phaser from 'phaser';
import { createGeneratedTextures } from '../game/createGeneratedTextures.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    createGeneratedTextures(this);
    this.scene.start('GameScene', { levelId: 1 });
  }
}
