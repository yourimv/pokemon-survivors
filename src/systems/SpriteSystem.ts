import SpriteComponent from "../components/SpriteComponent";
import Entity from "../entities/Entity";
import { AbstractArena } from "../scenes/AbstractArena";
import { ActivityState } from "../states/ActivityState";
import { DirectionState } from "../states/DirectionState";
import System from "./System";

export default class SpriteSystem implements System {
    private scene: AbstractArena;
    private readonly fps: number = 8;

    constructor(scene: AbstractArena) {
        this.scene = scene;
    }

    update(dt: number): void {
        const entities = this.scene.getEntities().filter(entity => entity.getComponent(SpriteComponent));
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
            activity = ActivityState.Walk;
        }
        else {
            activity = ActivityState.Idle;
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
        sprite.playAnimation(activity + '-' + sprite.getPreviousDirection());
    }

    // TODO: this is currently defined in entities, should likely be done here
    private createAnimations(sprite: SpriteComponent, scene: Phaser.Scene, activity: ActivityState, texture: string, interval: number): void {
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
            const endFrame = startFrame + interval;
            this.addAnimation(`${sprite.getTexture()}-${activity}-${direction}`,
                scene.anims.generateFrameNumbers(`${texture}-${activity}`, { start: startFrame, end: endFrame }),
                this.fps
            );
            startFrame = endFrame + 1; // Update startFrame for next direction
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

}