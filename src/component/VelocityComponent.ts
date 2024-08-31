import Component from "./Component";

export default class VelocityComponent implements Component {
    private readonly sprite: Phaser.Physics.Arcade.Sprite;
    private speed: number;

    constructor(sprite: Phaser.Physics.Arcade.Sprite, speed: number) {
        this.sprite = sprite;
        this.speed = speed;
    }

    update(dt: number): void {
        //
    }

    setVelocity(x: number, y: number): void {
        this.sprite.setVelocity(x, y);
    }

    getVelocity(): Phaser.Math.Vector2 {
        return this.sprite.body!.velocity;
    }

    setSpeed(speed: number): void {
        this.speed = speed;
    }

    getSpeed(): number {
        return this.speed;
    }
}