import Component from "./Component";

export class ChaseComponent implements Component {
    private scene: Phaser.Scene;
    private self: Phaser.GameObjects.GameObject;
    private target: Phaser.GameObjects.GameObject;
    private speed: number;

    constructor(scene: Phaser.Scene, self: Phaser.GameObjects.GameObject, target: Phaser.GameObjects.GameObject, speed: number) {
        this.scene = scene;
        this.self = self;
        this.target = target;
        this.speed = speed;
    }

    update(dt: number): void {
        this.scene.physics.moveToObject(this.self, this.target, this.speed);
    }
}
