import Component from "./Component";

export default class SpriteComponent implements Component {

    private sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        this.sprite = scene.physics.add.sprite(x, y, texture);
    }

    setTexture(texture: string): void {
        this.sprite.setTexture(texture);
    }

    getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite;
    }

    update(dt: number): void {
        // In case sprite related updates are required
    }
}