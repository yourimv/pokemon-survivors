import Component from "./Component";
import SpriteComponent from "./SpriteComponent";

export class AnimationComponent implements Component {
    private spriteComponent: SpriteComponent;

    constructor(spriteComponent: SpriteComponent) {
        this.spriteComponent = spriteComponent;
    }

    update(dt: number): void {
        const sprite = this.spriteComponent.getSprite();
        const velocityX = sprite.body!.velocity.x;
        const velocityY = sprite.body!.velocity.y;

        if (velocityX < 0) {
            this.spriteComponent.playAnimation('left');
        } else if (velocityX > 0) {
            this.spriteComponent.playAnimation('right');
        } else if (velocityY < 0) {
            this.spriteComponent.playAnimation('up');
        } else if (velocityY > 0) {
            this.spriteComponent.playAnimation('down');
        } else {
            sprite.anims.stop(); // Stop animation when not moving
        }
    }
}
