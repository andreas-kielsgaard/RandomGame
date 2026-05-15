import Phaser from 'phaser';
import { levels } from '../data/levels.js';
import {
  getAudioStatus,
  initAudio,
  onAudioStatusChange,
  playSfx,
  startMusic,
  toggleMute,
} from '../game/audio.js';
import { ARTIFACT_NAME, getRunState, resetRunState } from '../game/runState.js';

export default class EndingScene extends Phaser.Scene {
  constructor() {
    super('EndingScene');
  }

  create() {
    const runState = getRunState(this);
    const ingredients = Object.values(runState.ingredients);
    const components = Object.values(runState.components);
    initAudio(this);
    startMusic(this, { id: 6, name: 'Ending: Divine Support Receipt' });

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

    const initialAudioStatus = getAudioStatus(this);
    const audioStatus = this.add
      .text(936, 22, initialAudioStatus.label, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '12px',
        color: initialAudioStatus.color,
        backgroundColor: 'rgba(8, 5, 20, 0.62)',
        padding: { x: 8, y: 5 },
      })
      .setOrigin(1, 0)
      .setDepth(10);
    onAudioStatusChange(this, (status) => {
      audioStatus.setText(status.label);
      audioStatus.setColor(status.color);
    });

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
    this.tweens.add({
      targets: faxMachine,
      angle: 2,
      duration: 85,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: 8,
    });

    const printout = this.add
      .rectangle(480, 218, 132, 8, 0xfff7db, 0.92)
      .setOrigin(0.5, 0)
      .setDepth(3);
    const printoutText = this.add
      .text(480, 229, 'CFQ-0001\nLOW PRIORITY\nASSIGNED: SELF', {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '10px',
        color: '#201047',
        align: 'center',
      })
      .setOrigin(0.5, 0)
      .setAlpha(0)
      .setDepth(4);
    this.tweens.add({
      targets: printout,
      displayHeight: 58,
      duration: 1150,
      ease: 'Linear',
    });
    this.tweens.add({
      targets: printoutText,
      alpha: 1,
      delay: 420,
      duration: 260,
    });
    this.add
      .particles(480, 175, 'star-dot', {
        lifespan: 1200,
        speed: { min: 22, max: 96 },
        scale: { start: 0.62, end: 0 },
        alpha: { start: 0.8, end: 0 },
        tint: [0x98fff2, 0xff78dc, 0xffe66d],
        frequency: 70,
        quantity: 1,
      })
      .setDepth(2);
    playSfx(this, 'endingFax');

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
          'Press R to restart from Level 1. Press M to mute the cosmic backend.',
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

    const muteKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    const muteHandler = () => {
      const status = toggleMute(this);
      audioStatus.setText(status.label);
      audioStatus.setColor(status.color);
    };
    muteKey.on('down', muteHandler);
    this.events.once('shutdown', () => muteKey.off('down', muteHandler));

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
