import Phaser from 'phaser';
import './styles.css';
import BootScene from './scenes/BootScene.js';
import ComingSoonScene from './scenes/ComingSoonScene.js';
import EndingScene from './scenes/EndingScene.js';
import GameScene from './scenes/GameScene.js';
import TitleScene from './scenes/TitleScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#05040f',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 540,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1150 },
      debug: false,
    },
  },
  scene: [BootScene, TitleScene, GameScene, ComingSoonScene, EndingScene],
};

new Phaser.Game(config);
