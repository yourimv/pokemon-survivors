import CollisionComponent from "../component/CollisionComponent";
import DamageComponent from "../component/DamageComponent";
import { HealthComponent } from "../component/HealthComponent";
import Entity from "../entity/Entity";
import { AbstractCollisionEvent } from "./AbstractCollisionEvent";

export default class DamageCollisionEvent extends AbstractCollisionEvent {

    constructor() {
        super();
    }

    handle(object1: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, object2: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile): void {
        const causer = (object1 as any).entity as Entity;
        const taker = (object2 as any).entity as Entity;
        const takerCollision = taker.getComponent(CollisionComponent);
        if (takerCollision.isApplied()) {
            return;
        }
        taker.getComponent(HealthComponent).takeDamage(causer.getComponent(DamageComponent).getDamage());
        takerCollision.apply();
    }
}