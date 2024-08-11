import Phaser from 'phaser'
import Component from './Component';

export default class InputComponent implements Component {

    private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private readonly sprite: Phaser.Physics.Arcade.Sprite

    private speed: number;

    constructor(scene: Phaser.Scene, sprite: Phaser.Physics.Arcade.Sprite, speed: number) {
        this.cursors = scene.input.keyboard!.createCursorKeys();
        this.sprite = sprite
        this.speed = speed;
    }

    update(dt: number): void {

        // Reset the player's velocity
        this.sprite.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(this.speed);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.sprite.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.sprite.setVelocityY(this.speed);
        }

        // Diagonal movement normalization
        if (this.sprite.body!.velocity.length() > this.speed) {
            this.sprite.body!.velocity.normalize().scale(this.speed);
        }
    }
}