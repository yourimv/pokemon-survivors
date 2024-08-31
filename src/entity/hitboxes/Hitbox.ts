import CollisionComponent from "../../component/CollisionComponent";
import SpriteComponent from "../../component/SpriteComponent";
import { AbstractCollisionEvent } from "../../event/AbstractCollisionEvent";
import { AbstractArena } from "../../scene/AbstractArena";
import Entity from "../Entity";

export default class AbstractHitbox extends Entity {

    private collisionEvent: AbstractCollisionEvent;

    constructor(scene: AbstractArena, x: number, y: number, size: number, collidesWith: Phaser.Physics.Arcade.Group, collisionEvent: AbstractCollisionEvent) {
        super();
        this.collisionEvent = collisionEvent;
        const sprite = new SpriteComponent(scene, x, y, 'hitbox');
        sprite.setScale(size / sprite.getSprite().width);
        sprite.setDepth(-1);
        const collision = new CollisionComponent(scene, sprite.getSprite(), collidesWith, collisionEvent);
        this.addComponent(sprite);
        this.addComponent(collision);
    }

    getEvent(): AbstractCollisionEvent {
        return this.collisionEvent;
    }

    getGameObject(): Phaser.GameObjects.GameObject {
        return this.getComponent(SpriteComponent).getSprite();
    }

}