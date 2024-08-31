import Entity from "../entity/Entity";
import { AbstractCollisionEvent } from "./AbstractCollisionEvent";

export default class SimpleCollisionEvent extends AbstractCollisionEvent {
    handle(object1: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, object2: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile): void {
        const entity1 = (object1 as any).entity as Entity;
        const entity2 = (object2 as any).entity as Entity;
    }
}