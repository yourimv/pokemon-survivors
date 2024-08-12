import { DirectionState } from './../states/DirectionState';
import { ActivityState } from "../states/ActivityState";
import Component from "./Component";
import SpriteComponent from "./SpriteComponent";

export class AnimationComponent implements Component {
    private spriteComponent: SpriteComponent;
    private previousDirection: DirectionState = DirectionState.Down;

    constructor(spriteComponent: SpriteComponent) {
        this.spriteComponent = spriteComponent;
    }

    update(dt: number): void {
        const sprite = this.spriteComponent.getSprite();
        const body = sprite.body;
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
            this.previousDirection = direction;
        }
        this.spriteComponent.playAnimation(activity + '-' + this.previousDirection);
    }
}
