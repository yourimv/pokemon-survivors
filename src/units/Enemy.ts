import Phaser from 'phaser';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    private player?: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Phaser.Physics.Arcade.Sprite) {
        super(scene, x, y, 'enemy');
        this.player = player;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }

    static preload(scene: Phaser.Scene) {
        scene.load.image('enemy', '/assets/enemy.png');
    }

    update() {
        this.scene.physics.moveToObject(this, this.player!, 100);
    }
}