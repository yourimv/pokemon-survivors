import SpriteComponent from "../component/SpriteComponent";
import Entity from "../entity/Entity";
import { AbstractArena } from "../scene/AbstractArena";
import { ActivityState } from "../state/ActivityState";
import { DirectionState } from "../state/DirectionState";
import System from "./System";

export default class SpriteSystem implements System {
    private scene: AbstractArena;
    private readonly fps: number = 8;

    constructor(scene: AbstractArena) {
        this.scene = scene;
        this.createAnimations();
    }

    update(dt: number): void {
        const entities = this.scene.getEntities();
        entities.forEach(entity => {
            this.updateSprite(entity);
        });
    }

    private updateSprite(entity: Entity): void {
        const sprite = entity.getComponent(SpriteComponent)
        const body = sprite.getSprite().body;
        if (!body) {
            return;
        }
        const { x: velocityX, y: velocityY } = body.velocity;
        let direction: DirectionState | null = null;
        let activity: ActivityState | null = null;

        // Determine activity state
        if (velocityX !== 0 || velocityY !== 0) {
            activity = ActivityState.WALK;
        }
        else {
            activity = ActivityState.IDLE;
        }
        // Determine direction state
        if (velocityX < 0) {
            direction = velocityY < 0 ? DirectionState.UpLeft
                : velocityY > 0 ? DirectionState.DownLeft
                    : DirectionState.Left;
        }
        else if (velocityX > 0) {
            direction = velocityY < 0 ? DirectionState.UpRight
                : velocityY > 0 ? DirectionState.DownRight
                    : DirectionState.Right;
        }
        else {
            direction = velocityY < 0 ? DirectionState.Up
                : velocityY > 0 ? DirectionState.Down
                    : null;
        }
        if (direction != null) {
            sprite.setPreviousDirection(direction);
        }
        this.playAnimation(sprite, activity + '-' + sprite.getPreviousDirection());
    }

    // TODO: this is currently defined in entities, should likely be done here
    private createAnimations(): void {
        const configs = this.scene.getSpriteSheetConfigs();
        configs.forEach(config => {
            const directions = [
                DirectionState.Down,
                DirectionState.DownRight,
                DirectionState.Right,
                DirectionState.UpRight,
                DirectionState.Up,
                DirectionState.UpLeft,
                DirectionState.Left,
                DirectionState.DownLeft
            ];
            let startFrame = 0;
            directions.forEach((direction) => {
                const endFrame = startFrame + config.frames;
                this.addAnimation(`${config.texture}-${config.activity}-${direction}`,
                    this.scene.anims.generateFrameNumbers(`${config.texture}-${config.activity}`, { start: startFrame, end: endFrame }),
                    this.fps
                );
                startFrame = endFrame + 1; // Update startFrame for next direction
            });
        });

    }

    // TODO: this is currently defined in entities, should likely be done here
    private addAnimation(key: string, frames: Phaser.Types.Animations.AnimationFrame[], frameRate: number): void {
        this.scene.anims.create({
            key: key,
            frames: frames,
            frameRate: frameRate,
            repeat: -1
        });
    }

    private playAnimation(spritec: SpriteComponent, key: string): void {
        // dont play the animation if it doesn't exist to not spam the console
        if (!this.scene.anims.exists(`${spritec.getTexture()}-${key}`)) {
            return;
        }
        spritec.getSprite().anims.play(`${spritec.getTexture()}-${key}`, true);
    }

}