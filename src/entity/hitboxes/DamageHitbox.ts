import DamageComponent from "../../component/DamageComponent";
import DamageCollisionEvent from "../../event/DamageCollisionEvent";
import { AbstractArena } from "../../scene/AbstractArena";
import AbstractHitbox from "./Hitbox";

export default class DamageHitbox extends AbstractHitbox {

    constructor(scene: AbstractArena, x: number, y: number, size: number, collidesWith: Phaser.Physics.Arcade.Group, damage: number) {
        super(scene, x, y, size, collidesWith, new DamageCollisionEvent);
        this.addComponent(new DamageComponent(damage));
    }

    override getEvent(): DamageCollisionEvent {
        return super.getEvent() as DamageCollisionEvent;
    }

}