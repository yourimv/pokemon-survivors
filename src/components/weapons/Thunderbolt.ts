import { AbstractArena } from './../../scenes/AbstractArena';
import { WeaponConfig } from './../../config/WeaponConfig';
import { AbstractWeaponComponent } from "./AbstractWeaponComponent";
import { Enemy } from '../../entities/Enemy';

export class Thunderbolt extends AbstractWeaponComponent {

    // TODO - likely refactor this or attempt to move to super class
    private graphics: Phaser.GameObjects.Graphics;
    private circle: Phaser.Geom.Circle;

    constructor(scene: AbstractArena, sprite: Phaser.Physics.Arcade.Sprite) {
        const weaponConfig: WeaponConfig = {
            damage: 10,
            cooldown: 2000,
            size: 80
        };
        super(scene, sprite, weaponConfig);
    }

    update(dt: number): void {
        const currentTime = this.scene.time.now;
        if (currentTime - this.lastAttack >= this.config.cooldown) {
            this.attack();
            this.lastAttack = currentTime;
        }
        if (this.circle && this.graphics) {
            this.circle.setPosition(this.sprite.x, this.sprite.y);
            this.graphics.clear();
            this.graphics.fillStyle(0xffff00, 1);
            this.graphics.fillCircle(this.circle.x, this.circle.y, this.circle.radius);
            this.graphics.setDepth(this.sprite.depth - 1);
        }
    }
    attack(): void {
        console.log(`Thunderbolt with damage: ${this.config.damage} and cooldown: ${this.config.cooldown}`);

        // Create a circle around the player
        this.circle = new Phaser.Geom.Circle(this.sprite.x, this.sprite.y, this.config.size / 2);

        // Draw the circle
        this.graphics = this.scene.add.graphics();
        this.graphics.fillStyle(0xffff00, 1);
        this.graphics.fillCircle(this.circle.x, this.circle.y, this.circle.radius);
        this.graphics.setDepth(this.sprite.depth - 1);

        // All enemies that in or collides with the circle will take damage

        // Destroy the circle after a short delay
        this.scene.time.delayedCall((this.config.cooldown / 4), () => {
            this.graphics.destroy();
        });
    }

}