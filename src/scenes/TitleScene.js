import Phaser from 'phaser';
import {
  getAudioStatus,
  initAudio,
  onAudioStatusChange,
  playSfx,
  startMusic,
  toggleMute,
} from '../game/audio.js';
import { ARTIFACT_NAME, resetRunState } from '../game/runState.js';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    this.hasStarted = false;

    initAudio(this);
    startMusic(this, { id: 0, name: 'Title: Complaint Intake Nebula' });

    this.add
      .image(480, 270, 'cosmic-background')
      .setDisplaySize(960, 540)
      .setDepth(-20);

    this.add
      .particles(0, 0, 'star-dot', {
        x: { min: 0, max: 960 },
        y: { min: 0, max: 540 },
        lifespan: 4200,
        speedX: { min: -10, max: 12 },
        speedY: { min: -6, max: 8 },
        scale: { start: 0.58, end: 0 },
        alpha: { start: 0.62, end: 0 },
        tint: [0x98fff2, 0xff78dc, 0xffe66d],
        frequency: 115,
        quantity: 1,
      })
      .setDepth(-8);

    this.add
      .text(480, 78, 'Cosmic Fetch Quest: The Game', {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '38px',
        color: '#fff7db',
        align: 'center',
        stroke: '#201047',
        strokeThickness: 7,
      })
      .setOrigin(0.5);

    this.add
      .text(480, 144, ARTIFACT_NAME, {
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '17px',
        color: '#98fff2',
        align: 'center',
        stroke: '#201047',
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    this.add
      .text(
        480,
        230,
        [
          'The universe is trapped in an endless fetch quest economy.',
          'Collect five impossible ingredients, assemble a cosmic office machine, and send God a bug report.',
          '',
          'Press Enter, Space, or click to begin with a fresh run.',
        ].join('\n'),
        {
          fontFamily: 'Verdana, Arial, sans-serif',
          fontSize: '17px',
          color: '#fff7db',
          align: 'center',
          backgroundColor: 'rgba(12, 6, 28, 0.82)',
          padding: { x: 24, y: 18 },
          wordWrap: { width: 700 },
          lineSpacing: 4,
        },
      )
      .setOrigin(0.5);

    const controlsText = this.add
      .text(
        480,
        389,
        [
          'Move: A/D or Arrows    Jump: W/Up/Space    Talk: E',
          'Inventory: I/C    Respawn: R    Pause: P    Help: H/?    M: mute the cosmic backend',
          'Audio unlocks on your first key or click. Procedural nonsense syllables included.',
        ].join('\n'),
        {
          fontFamily: 'Verdana, Arial, sans-serif',
          fontSize: '14px',
          color: '#e7dcff',
          align: 'center',
          backgroundColor: 'rgba(8, 5, 20, 0.72)',
          padding: { x: 18, y: 12 },
          lineSpacing: 4,
        },
      )
      .setOrigin(0.5);

    this.tweens.add({
      targets: controlsText,
      alpha: 0.68,
      duration: 900,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

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

    const keys = this.input.keyboard.addKeys({
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      mute: Phaser.Input.Keyboard.KeyCodes.M,
    });

    const muteHandler = () => {
      const status = toggleMute(this);
      audioStatus.setText(status.label);
      audioStatus.setColor(status.color);
    };

    keys.enter.once('down', () => this.startGame());
    keys.space.once('down', () => this.startGame());
    keys.mute.on('down', muteHandler);
    this.input.once('pointerdown', () => this.startGame());
    this.events.once('shutdown', () => keys.mute.off('down', muteHandler));
  }

  startGame() {
    if (this.hasStarted) {
      return;
    }

    this.hasStarted = true;
    resetRunState(this);
    playSfx(this, 'portalActive');
    this.cameras.main.flash(260, 152, 255, 242);
    this.time.delayedCall(180, () => {
      this.scene.start('GameScene', { levelId: 1 });
    });
  }
}
