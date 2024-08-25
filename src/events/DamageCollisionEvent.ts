import DamageComponent from "../components/DamageComponent";
import { HealthComponent } from "../components/HealthComponent";
import Entity from "../entities/Entity";
import { AbstractCollisionEvent } from "./AbstractCollisionEvent";

export default class DamageCollisionEvent extends AbstractCollisionEvent {

    private applied: boolean = false;

    constructor() {
        super();
    }

    handle(object1: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, object2: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile): void {
        if (this.applied) {
            return;
        }
        const causer = (object1 as any).entity as Entity;
        const taker = (object2 as any).entity as Entity;
        taker.getComponent(HealthComponent).takeDamage(causer.getComponent(DamageComponent).getDamage());
        this.applied = true;
    }

    reset(): void {
        this.applied = false;
    }
}