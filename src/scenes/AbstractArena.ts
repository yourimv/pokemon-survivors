import Phaser from 'phaser';

import Entity from '../entities/Entity';
import { Enemy } from '../entities/Enemy';
import System from '../systems/System';
import HealthbarRenderSystem from '../systems/HealthbarRenderSystem';

export class AbstractArena extends Phaser.Scene {

    private entities: Entity[] = [];
    private systems: System[] = [];
    private friendlyPhysics: Phaser.Physics.Arcade.Group;
    private enemyPhysics: Phaser.Physics.Arcade.Group;

    constructor(key: string) {
        super({ key: key });
    }

    create(): void {
        this.friendlyPhysics = this.physics.add.group();
        this.enemyPhysics = this.physics.add.group();
        this.systems.push(new HealthbarRenderSystem(this));
    }

    addEntity(entity: Entity): void {
        this.entities.push(entity);
        const gameObject = entity.getGameObject();
        (gameObject as any).entity = entity; // Associate the entity with the game object, so we can access it in the components
        if (entity instanceof Enemy) {
            this.enemyPhysics.add(entity.getGameObject());
        }
        else {
            this.friendlyPhysics.add(entity.getGameObject())
        }
    }

    removeEntity(entity: Entity): void {
        entity.getGameObject().destroy();
        this.entities = this.entities.filter(e => e !== entity);
        if (entity instanceof Enemy) {
            this.enemyPhysics.remove(entity.getGameObject());
        }
        else {
            this.friendlyPhysics.remove(entity.getGameObject());
        }
    }

    getEntities(): Entity[] {
        return this.entities;
    }

    getFriendlyPhysicsGroup(): Phaser.Physics.Arcade.Group {
        return this.friendlyPhysics;
    }

    getEnemyPhysicsGroup(): Phaser.Physics.Arcade.Group {
        return this.enemyPhysics;
    }

    update(t: number, dt: number): void {
        this.entities.forEach(e => e.update(dt));
        this.systems.forEach(system => system.update(dt));
    }
}