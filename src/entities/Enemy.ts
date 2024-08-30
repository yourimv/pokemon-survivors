import SpriteComponent from '../components/SpriteComponent';
import Phaser from 'phaser';
import Entity from './Entity';
import { ChaseComponent } from '../components/ChaseComponent';
import { Player } from './Player';
import { HealthComponent } from '../components/HealthComponent';
import CollisionComponent from '../components/CollisionComponent';
import { AbstractArena } from '../scenes/AbstractArena';
import VelocityComponent from '../components/VelocityComponent';
import { SpriteSheetConfig } from '../config/SpriteSheetConfig';
import { ActivityState } from '../states/ActivityState';

export class Enemy extends Entity {

    constructor(scene: AbstractArena, x: number, y: number, texture: string, player: Player) {
        super();
        const idleConfig: SpriteSheetConfig = {
            activity: ActivityState.IDLE,
            texture: texture,
            frames: 1
        };
        const walkConfig: SpriteSheetConfig = {
            activity: ActivityState.WALK,
            texture: texture,
            frames: 6
        };
        const sprite = new SpriteComponent(scene, x, y, texture, [idleConfig, walkConfig]);
        const input = new VelocityComponent(sprite.getSprite(), 200);
        const chase = new ChaseComponent(scene, sprite.getSprite(), player.getComponent(SpriteComponent).getSprite(), 100);
        const health = new HealthComponent(100);
        const collision = new CollisionComponent(scene, sprite.getSprite(), scene.getFriendlyPhysicsGroup());
        this.addComponent(sprite);
        this.addComponent(input);
        this.addComponent(chase);
        this.addComponent(health);
        this.addComponent(collision);
    }

    getGameObject(): Phaser.GameObjects.GameObject {
        return this.getComponent(SpriteComponent).getSprite();
    }
}
