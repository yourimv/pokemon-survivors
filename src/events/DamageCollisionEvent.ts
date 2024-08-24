import DamageComponent from "../components/DamageComponent";
import { HealthComponent } from "../components/HealthComponent";
import Entity from "../entities/Entity";
import { AbstractCollisionEvent } from "./AbstractCollisionEvent";

export default class DamageCollisionEvent extends AbstractCollisionEvent {
    handle(object1: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, object2: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile): void {
        const causer = (object1 as any).entity as Entity;
        const taker = (object2 as any).entity as Entity;
        taker.getComponent(HealthComponent).takeDamage(causer.getComponent(DamageComponent).getDamage());
    }
}