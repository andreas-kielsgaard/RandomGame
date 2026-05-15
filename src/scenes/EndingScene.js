import Phaser from 'phaser';
import { levels } from '../data/levels.js';
import { ARTIFACT_NAME, getRunState, resetRunState } from '../game/runState.js';

export default class EndingScene extends Phaser.Scene {
  constructor() {
    super('EndingScene');
  }

  create() {
    const runState = getRunState(this);
    const ingredients = Object.values(runState.ingredients);
    const components = Object.values(runState.components);

    this.add
      .image(480, 270, 'cosmic-background')
      .setDisplaySize(960, 540)
      .setDepth(-20);

    this.add
      .particles(0, 0, 'star-dot', {
        x: { min: 0, max: 960 },
        y: { min: 0, max: 540 },
        lifespan: 3800,
        speedX: { min: -12, max: 12 },
        speedY: { min: -10, max: 10 },
        scale: { start: 0.65, end: 0 },
        alpha: { start: 0.55, end: 0 },
        tint: [0x98fff2, 0xff78dc, 0xffe66d],
        frequency: 150,
        quantity: 1,
      })
      .setDepth(-8);

    this.add
      .text(480, 34, 'Bug Report Sent', {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '32px',
        color: '#fff7db',
        stroke: '#201047',
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.add
      .text(480, 74, ARTIFACT_NAME, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '17px',
        color: '#98fff2',
        align: 'center',
      })
      .setOrigin(0.5);

    const faxMachine = this.add
      .image(480, 173, 'cosmic-fax-machine')
      .setScale(1.25)
      .setDepth(4);

    this.tweens.add({
      targets: faxMachine,
      y: faxMachine.y - 8,
      duration: 950,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    this.add
      .text(
        480,
        272,
        'The machine eats the impossible ingredients, prints one glowing page, and files a support ticket with the cosmic backend.',
        {
          fontFamily: 'Verdana, Arial, sans-serif',
          fontSize: '14px',
          color: '#fff7db',
          align: 'center',
          backgroundColor: 'rgba(12, 6, 28, 0.78)',
          padding: { x: 14, y: 10 },
          wordWrap: { width: 650 },
        },
      )
      .setOrigin(0.5);

    this.add
      .text(42, 322, formatList('Ingredients Accepted', ingredients), {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '12px',
        color: '#fff7db',
        backgroundColor: 'rgba(12, 6, 28, 0.82)',
        padding: { x: 12, y: 10 },
        wordWrap: { width: 400 },
        lineSpacing: 2,
      })
      .setDepth(5);

    this.add
      .text(508, 322, formatList(`Fax Components ${components.length}/${levels.length}`, components), {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '12px',
        color: '#fff7db',
        backgroundColor: 'rgba(12, 6, 28, 0.82)',
        padding: { x: 12, y: 10 },
        wordWrap: { width: 400 },
        lineSpacing: 2,
      })
      .setDepth(5);

    this.add
      .text(
        480,
        488,
        [
          'Ticket CFQ-0001 created.',
          'Priority: low. Assigned to: Self. Resolution: cannot reproduce, but vibes acknowledged.',
          'Press R to restart the prototype from Level 1.',
        ].join('\n'),
        {
          fontFamily: 'Verdana, Arial, sans-serif',
          fontSize: '15px',
          color: '#ffe66d',
          align: 'center',
          stroke: '#201047',
          strokeThickness: 4,
          wordWrap: { width: 760 },
        },
      )
      .setOrigin(0.5);

    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R).once('down', () => {
      resetRunState(this);
      this.scene.start('GameScene', { levelId: 1 });
    });
  }
}

function formatList(title, items) {
  const lines = [title, ''];

  if (items.length === 0) {
    lines.push('- nothing installed; the backend is making eye contact');
  } else {
    lines.push(...items.map((item) => `- ${item.name}`));
  }

  return lines.join('\n');
}
