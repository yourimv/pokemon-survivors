import { HealthComponent } from "../component/HealthComponent";
import { AbstractArena } from "../scene/AbstractArena";
import System from "./System";

export default class HealthSystem implements System {
    private scene: AbstractArena;

    constructor(scene: AbstractArena) {
        this.scene = scene;
    }

    update(dt: number): void {
        const entities = this.scene.getEntities();
        entities.forEach(entity => {
            const healthComponent = entity.getComponent(HealthComponent);
            if (healthComponent && !healthComponent.isAlive()) {
                this.scene.removeEntity(entity);
            }
        });
    }
}