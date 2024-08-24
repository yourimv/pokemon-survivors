import DamageComponent from "../../components/DamageComponent";
import DamageCollisionEvent from "../../events/DamageCollisionEvent";
import { AbstractArena } from "../../scenes/AbstractArena";
import AbstractHitbox from "./Hitbox";

export default class DamageHitbox extends AbstractHitbox {
    constructor(scene: AbstractArena, x: number, y: number, size: number, collidesWith: Phaser.Physics.Arcade.Group, damage: number) {
        super(scene, x, y, size, collidesWith, new DamageCollisionEvent);
        this.addComponent(new DamageComponent(damage));
    }
}