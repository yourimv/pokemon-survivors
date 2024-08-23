import { Hitbox } from './../../entities/Hitbox';
import { AbstractArena } from './../../scenes/AbstractArena';
import { WeaponConfig } from './../../config/WeaponConfig';
import { AbstractWeaponComponent } from "./AbstractWeaponComponent";

export class Thunderbolt extends AbstractWeaponComponent {

    private hitbox: Hitbox;
    private hitboxCreationTime: number;

    constructor(scene: AbstractArena, sprite: Phaser.Physics.Arcade.Sprite) {
        const weaponConfig: WeaponConfig = {
            damage: 10,
            cooldown: 2000,
            size: 80,
            duration: 1000
        };
        super(scene, sprite, weaponConfig);
    }

    update(dt: number): void {
        const currentTime = this.scene.time.now;
        if (currentTime - this.lastAttack >= this.config.cooldown) {
            this.attack();
            this.lastAttack = currentTime;
        }
        if (this.hitbox) {
            this.hitbox.getSpriteComponent().setPosition(this.sprite.x, this.sprite.y);
            if (currentTime - this.hitboxCreationTime >= this.config.duration) {
                this.hitbox.getSpriteComponent().destroy();
            }
            // this.graphics.clear();
            // this.graphics.fillStyle(0xffff00, 1);
            // this.graphics.fillCircle(this.circle.x, this.circle.y, this.circle.radius);
            // this.graphics.setDepth(this.sprite.depth - 1);

        }
    }

    attack(): void {
        console.log(`Thunderbolt with damage: ${this.config.damage} and cooldown: ${this.config.cooldown}`);
        this.hitboxCreationTime = this.scene.time.now;

        this.hitbox = new Hitbox(this.scene, this.sprite.x, this.sprite.y, this.config.size, this.scene.getEnemyPhysicsGroup());
        this.scene.addEntity(this.hitbox);
    }

}