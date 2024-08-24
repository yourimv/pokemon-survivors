import SpriteComponent from '../components/SpriteComponent';
import Phaser from 'phaser';
import Entity from './Entity';
import InputComponent from '../components/InputComponent';
import { ChaseComponent } from '../components/ChaseComponent';
import { Player } from './Player';
import { HealthComponent } from '../components/HealthComponent';
import CollisionComponent from '../components/CollisionComponent';
import { AbstractArena } from '../scenes/AbstractArena';

export class Enemy extends Entity {

    constructor(scene: AbstractArena, x: number, y: number, texture: string, player: Player) {
        super();
        const sprite = new SpriteComponent(scene, x, y, texture);
        const input = new InputComponent(scene, sprite.getSprite(), 200);
        const chase = new ChaseComponent(scene, sprite.getSprite(), player.getComponent(SpriteComponent).getSprite(), 100);
        const health = new HealthComponent(this, scene, 1);
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
