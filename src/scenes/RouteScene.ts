import { Scene } from 'phaser';

export class RouteScene extends Scene {
    private player: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload(): void {
        // Load your assets here
        this.load.image('player', '../../assets/player-img.png');
    }

    create(): void {
        // Add player sprite and enable physics
        this.player = this.physics.add.sprite(200, 200, 'player');
        this.player.setCollideWorldBounds(true);

        // Create cursor keys for movement
        this.cursors = this.input.keyboard!.createCursorKeys();
    }

    update(): void {
        const speed = 200;

        // Reset the player's velocity
        this.player.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
        }

        // Diagonal movement normalization
        if (this.player.body!.velocity.length() > speed) {
            this.player.body!.velocity.normalize().scale(speed);
        }
    }
}
