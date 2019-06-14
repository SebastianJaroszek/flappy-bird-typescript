import 'phaser';

import FlappyBird from './game';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'content',
    physics: {
        default: 'arcade'
    },
    width: 400,
    height: 480,
    resolution: 1,
    backgroundColor: "#71c5cf",
    scene: FlappyBird
};

new Phaser.Game(config);
