import { SpriteSheetConfig } from '../model/config/SpriteSheetConfig';
import { DirectionState } from "../state/DirectionState";
import Component from "./Component";

export default class SpriteComponent implements Component {

    private scene: Phaser.Scene;
    private sprite: Phaser.Physics.Arcade.Sprite;
    private texture: string;
    private spriteSheetConfigs: SpriteSheetConfig[] = [];
    private previousDirection: DirectionState = DirectionState.Down;
    private direction: DirectionState;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, spriteSheetConfigs: SpriteSheetConfig[]) {
        this.scene = scene;
        this.texture = texture;
        this.sprite = scene.physics.add.sprite(x, y, texture);
        this.spriteSheetConfigs = spriteSheetConfigs;
    }

    getSpriteSheetConfigs(): SpriteSheetConfig[] {
        return this.spriteSheetConfigs;
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

    update(dt: number): void {
        // In case sprite related updates are required
    }
}