import { HealthComponent } from "../components/HealthComponent";
import SpriteComponent from "../components/SpriteComponent";
import Entity from "../entities/Entity";
import { AbstractArena } from "../scenes/AbstractArena";
import System from "./System";

export default class HealthbarRenderSystem implements System {
    private scene: AbstractArena;
    private healthbars: Map<Function, Phaser.GameObjects.Graphics> = new Map();

    constructor(scene: AbstractArena) {
        this.scene = scene;
    }

    update(dt: number): void {
        this.scene.getEntities().forEach(entity => {
            const health = entity.getComponent(HealthComponent);
            if (health) {
                this.render(entity);
            } else {
                this.removeHealthbar(entity.constructor);
            }
        });
        this.healthbars.forEach((value, key) => {
            if (!this.scene.getEntities().some(e => e instanceof key)) {
                value.clear();
                value.destroy();
                this.healthbars.delete(key);
            }
        });
    }

    render(entity: Entity): void {
        const health = entity.getComponent(HealthComponent);
        const sprite = entity.getComponent(SpriteComponent);

        if (health && sprite) {
            const spriteObj = sprite.getSprite();
            let healthbar = this.healthbars.get(entity.constructor);

            if (!healthbar) {
                healthbar = this.scene.add.graphics();
                this.healthbars.set(entity.constructor, healthbar);
            }

            healthbar.clear();

            const healthWidth = (health.getHealth() / health.getMaxHealth()) * 40;
            if (healthWidth > 0) {
                // Draw the red background bar
                healthbar.fillStyle(0xff0000);
                healthbar.fillRect(0, 0, 40, 10);

                // Draw the green foreground bar
                healthbar.fillStyle(0x00ff00);
                healthbar.fillRect(0, 0, healthWidth, 10);
            }

            healthbar.x = spriteObj.x - spriteObj.width / 2;
            healthbar.y = spriteObj.y - spriteObj.height;
        }
    }

    removeHealthbar(gameObject: Function): void {
        const healthbar = this.healthbars.get(gameObject);
        if (healthbar) {
            healthbar.clear();
            healthbar.destroy();
            this.healthbars.delete(gameObject);
        }
    }

}