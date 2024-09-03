import { HealthComponent } from "../component/HealthComponent";
import SpriteComponent from "../component/SpriteComponent";
import Entity from "../entity/Entity";
import { AbstractArena } from "../scene/AbstractArena";
import System from "./System";

export default class HealthbarRenderSystem implements System {
    private scene: AbstractArena;
    private healthbars: Map<string, Phaser.GameObjects.Graphics> = new Map();

    constructor(scene: AbstractArena) {
        this.scene = scene;
    }

    update(dt: number): void {
        this.scene.getEntities().forEach(entity => {
            const health = entity.getComponent(HealthComponent);
            if (health) {
                this.render(entity);
            } else {
                this.removeHealthbar(entity.getUUID());
            }
        });
    }

    render(entity: Entity): void {
        const health = entity.getComponent(HealthComponent);
        const sprite = entity.getComponent(SpriteComponent);

        if (health && sprite) {
            const spriteObj = sprite.getSprite();
            let healthbar = this.healthbars.get(entity.getUUID());

            if (!healthbar) {
                healthbar = this.scene.add.graphics();
                this.healthbars.set(entity.getUUID(), healthbar);
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

    removeHealthbar(uuid: string): void {
        const healthbar = this.healthbars.get(uuid);
        if (healthbar) {
            healthbar.clear();
            healthbar.destroy();
            this.healthbars.delete(uuid);
        }
    }

}