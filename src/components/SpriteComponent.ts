import Component from "./Component";

export default class SpriteComponent implements Component {

    private scene: Phaser.Scene;
    private sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, texture);
    }

    setTexture(texture: string): void {
        this.sprite.setTexture(texture);
    }

    setScale(x: number, y?: number): void {
        this.sprite.setScale(x, y);
    }

    setDisplaySize(width: number, height: number): void {
        this.sprite.setDisplaySize(width, height);
    }

    getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite;
    }

    addAnimation(key: string, frames: Phaser.Types.Animations.AnimationFrame[], frameRate: number): void {
        this.scene.anims.create({
            key: key,
            frames: frames,
            frameRate: frameRate,
            repeat: -1
        });
    }

    playAnimation(key: string): void {
        this.sprite.anims.play(key, true);
    }

    update(dt: number): void {
        // In case sprite related updates are required
    }
}