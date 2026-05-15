import Phaser from 'phaser';
import { getLevelById } from '../data/levels.js';

export default class ComingSoonScene extends Phaser.Scene {
  constructor() {
    super('ComingSoonScene');
  }

  create(data = {}) {
    const level = data.level ?? getLevelById(data.levelId ?? 2);
    const previousLevelId = data.previousLevelId ?? 1;

    this.add
      .image(480, 270, 'cosmic-background')
      .setDisplaySize(960, 540)
      .setDepth(-20);

    this.add
      .text(480, 168, level.name, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '30px',
        color: '#fff7db',
        stroke: '#201047',
        strokeThickness: 6,
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(
        480,
        252,
        `Coming soon\n\n${level.objective ?? 'This level is waiting for a future prototype pass.'}`,
        {
          fontFamily: 'Verdana, Arial, sans-serif',
          fontSize: '18px',
          color: '#98fff2',
          align: 'center',
          backgroundColor: 'rgba(12, 6, 28, 0.82)',
          padding: { x: 24, y: 18 },
          wordWrap: { width: 560 },
        },
      )
      .setOrigin(0.5);

    this.add
      .text(480, 410, 'Press R to replay Level 1', {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '16px',
        color: '#ffe66d',
      })
      .setOrigin(0.5);

    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R).once('down', () => {
      this.scene.start('GameScene', { levelId: previousLevelId });
    });
  }
}
