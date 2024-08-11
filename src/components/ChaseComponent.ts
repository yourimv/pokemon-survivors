import Component from "./Component";

export class ChaseComponent implements Component {
    private scene: Phaser.Scene;
    private self: Phaser.Physics.Arcade.Sprite;
    private target: Phaser.Physics.Arcade.Sprite;
    private speed: number;

    constructor(scene: Phaser.Scene, self: Phaser.Physics.Arcade.Sprite, target: Phaser.Physics.Arcade.Sprite, speed: number) {
        this.scene = scene;
        this.self = self;
        this.target = target;
        this.speed = speed;
    }

    update(dt: number): void {
        this.scene.physics.moveToObject(this.self, this.target, this.speed);
    }
}
