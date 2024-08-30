import { SpriteSheetConfig } from './../config/SpriteSheetConfig';
import { ActivityState } from './../states/ActivityState';
import SpriteComponent from '../components/SpriteComponent';
import Phaser from 'phaser';
import Entity from './Entity';
import InputComponent from '../components/InputComponent';
import { Thunderbolt } from '../components/weapons/Thunderbolt';
import { HealthComponent } from '../components/HealthComponent';
import { AbstractArena } from '../scenes/AbstractArena';
import CollisionComponent from '../components/CollisionComponent';
import VelocityComponent from '../components/VelocityComponent';

export class Player extends Entity {

    constructor(scene: AbstractArena, x: number, y: number, texture: string) {
        super();
        const idleConfig: SpriteSheetConfig = {
            activity: ActivityState.IDLE,
            texture: texture,
            frames: 5
        };
        const walkConfig: SpriteSheetConfig = {
            activity: ActivityState.WALK,
            texture: texture,
            frames: 3
        };
        const sprite = new SpriteComponent(scene, x, y, texture, [idleConfig, walkConfig]);
        sprite.setScale(1);
        const input = new InputComponent(scene);
        const velocity = new VelocityComponent(sprite.getSprite(), 200);
        const weapon = new Thunderbolt(scene, sprite.getSprite());
        const health = new HealthComponent(100);
        const collision = new CollisionComponent(scene, sprite.getSprite(), scene.getEnemyPhysicsGroup());
        this.addComponent(sprite);
        this.addComponent(velocity);
        this.addComponent(input);
        this.addComponent(weapon);
        this.addComponent(health);
        this.addComponent(collision);
    }

    getGameObject(): Phaser.GameObjects.GameObject {
        return this.getComponent(SpriteComponent).getSprite();
    }

}
