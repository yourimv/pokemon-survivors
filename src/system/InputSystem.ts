import InputComponent from "../component/InputComponent";
import VelocityComponent from "../component/VelocityComponent";
import Entity from "../entity/Entity";
import { AbstractArena } from "../scene/AbstractArena";
import System from "./System";

export default class InputSystem implements System {

    private readonly entities: Entity[] = [];

    constructor(scene: AbstractArena) {
        this.entities = scene.getEntities();
    }

    update(dt: number): void {
        this.entities.forEach(entity => {
            const input = entity.getComponent(InputComponent);
            const velocity = entity.getComponent(VelocityComponent);

            if (input && velocity) {
                let vx = 0;
                let vy = 0;
                const speed = velocity.getSpeed();

                if (input.isLeftPressed()) {
                    vx = -speed;
                } else if (input.isRightPressed()) {
                    vx = speed;
                }

                if (input.isUpPressed()) {
                    vy = -speed;
                } else if (input.isDownPressed()) {
                    vy = speed;
                }

                velocity.setVelocity(vx, vy);

                // Diagonal movement normalization
                if (velocity.getVelocity().length() > speed) {
                    velocity.getVelocity().normalize().scale(speed);
                }
            }
        });
    }
}