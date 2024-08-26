import { DirectionState } from "../states/DirectionState";
import Component from "./Component";

export default class SpriteComponent implements Component {

    private scene: Phaser.Scene;
    private sprite: Phaser.Physics.Arcade.Sprite;
    private texture: string;
    private previousDirection: DirectionState = DirectionState.Down;
    private direction: DirectionState;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        this.scene = scene;
        this.texture = texture;
        this.sprite = scene.physics.add.sprite(x, y, texture);
    }

    setPosition(x: number, y: number): void {
        this.sprite.setPosition(x, y);
    }

    getTexture(): string {
        return this.texture;
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

    setDepth(depth: number): void {
        this.sprite.setDepth(depth);
    }

    getPreviousDirection(): DirectionState {
        return this.previousDirection;
    }

    setPreviousDirection(direction: DirectionState): void {
        this.previousDirection = direction
    }

    getDirection(): DirectionState {
        return this.direction;
    }

    setDirection(direction: DirectionState): void {
        this.direction = direction;
    }

    destroy(): void {
        this.sprite.destroy();
    }

    addAnimation(key: string, frames: Phaser.Types.Animations.AnimationFrame[], frameRate: number): void {
        this.scene.anims.create({
            key: `${this.texture}-${key}`,
            frames: frames,
            frameRate: frameRate,
            repeat: -1
        });
    }

    playAnimation(key: string): void {
        // dont play the animation if it doesn't exist to not spam the console
        if (!this.scene.anims.exists(`${this.texture}-${key}`)) {
            return;
        }
        this.sprite.anims.play(`${this.texture}-${key}`, true);
    }

    update(dt: number): void {
        // In case sprite related updates are required
    }
}