import Phaser from 'phaser';
import { getLevelById, getLevelNpcs, levels } from '../data/levels.js';
import { ARTIFACT_NAME, getRunState } from '../game/runState.js';

export default class ComingSoonScene extends Phaser.Scene {
  constructor() {
    super('ComingSoonScene');
  }

  create(data = {}) {
    const level = data.level ?? getLevelById(data.levelId ?? 2);
    const previousLevelId = data.previousLevelId ?? 1;
    const previousLevel = getLevelById(previousLevelId);
    const runState = getRunState(this);
    const ingredientName = level.ingredients?.[0]?.name;
    const npc = getLevelNpcs(level)[0];
    const progressCount = Object.keys(runState.components).length;

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
        260,
        [
          'Coming soon',
          '',
          level.story?.teaser ?? level.objective ?? 'This level is waiting for a future prototype pass.',
          ingredientName ? `Planned ingredient: ${ingredientName}` : null,
          npc ? `NPC concept: ${npc.name}, ${npc.title ?? npc.concept}` : null,
          '',
          `${ARTIFACT_NAME}: ${progressCount}/${levels.length} components installed`,
        ]
          .filter(Boolean)
          .join('\n'),
        {
          fontFamily: 'Verdana, Arial, sans-serif',
          fontSize: '16px',
          color: '#98fff2',
          align: 'center',
          backgroundColor: 'rgba(12, 6, 28, 0.82)',
          padding: { x: 24, y: 18 },
          wordWrap: { width: 640 },
        },
      )
      .setOrigin(0.5);

    this.add
      .text(480, 438, `Press R to replay ${previousLevel.name}`, {
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
