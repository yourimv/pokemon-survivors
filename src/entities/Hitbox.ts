import CollisionComponent from "../components/CollisionComponent";
import SpriteComponent from "../components/SpriteComponent";
import { AbstractArena } from "../scenes/AbstractArena";
import Entity from "./Entity";

export class Hitbox extends Entity {
    constructor(scene: AbstractArena, x: number, y: number, size: number, collidesWith: Phaser.Physics.Arcade.Group) {
        super();
        const sprite = new SpriteComponent(scene, x, y, 'hitbox');
        sprite.setScale(size / sprite.getSprite().width);
        sprite.setDepth(-1);
        const collision = new CollisionComponent(scene, sprite.getSprite(), collidesWith);
        this.addComponent(sprite);
        this.addComponent(collision);
    }

    getSpriteComponent(): SpriteComponent {
        // hacky af
        return this.components[0] as SpriteComponent;
    }

    getGameObject(): Phaser.GameObjects.GameObject {
        return this.getSpriteComponent().getSprite();
    }

}