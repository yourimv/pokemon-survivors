import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }

    static preload(scene: Phaser.Scene) {
        scene.load.image('player', '/assets/player.png');
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        const speed = 200;

        // Reset the player's velocity
        this.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            this.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
            this.setVelocityX(speed);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            this.setVelocityY(speed);
        }

        // Diagonal movement normalization
        if (this.body!.velocity.length() > speed) {
            this.body!.velocity.normalize().scale(speed);
        }
    }
}
