import { AbstractArena } from '../../scene/AbstractArena';
import { WeaponConfig } from '../../model/config/WeaponConfig';
import { AbstractWeaponComponent } from "./AbstractWeaponComponent";
import SpriteComponent from '../SpriteComponent';
import DamageHitbox from '../../entity/hitbox/DamageHitbox';
import CollisionComponent from '../CollisionComponent';

export class Thunderbolt extends AbstractWeaponComponent {

    private hitbox: DamageHitbox;
    private hitboxCreationTime: number;

    constructor(scene: AbstractArena, sprite: Phaser.Physics.Arcade.Sprite) {
        const weaponConfig: WeaponConfig = {
            damage: 100,
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
            this.hitbox.getComponent(SpriteComponent).setPosition(this.sprite.x, this.sprite.y);
            if (currentTime - this.hitboxCreationTime >= this.config.duration) {
                this.hitbox.getComponent(SpriteComponent).destroy();
                this.hitbox.getComponent(CollisionComponent).reset(); // Reset the event to make it eligible to apply again
            }
        }
    }

    attack(): void {
        this.hitboxCreationTime = this.scene.time.now;
        this.hitbox = new DamageHitbox(this.scene, this.sprite.x, this.sprite.y, this.config.size, this.scene.getEnemyPhysicsGroup(), this.config.damage);
        this.scene.addEntity(this.hitbox);
    }

}