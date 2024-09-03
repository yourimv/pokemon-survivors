import SpriteComponent from '../component/SpriteComponent';
import Phaser from 'phaser';
import Entity from './Entity';
import { ChaseComponent } from '../component/ChaseComponent';
import { HealthComponent } from '../component/HealthComponent';
import CollisionComponent from '../component/CollisionComponent';
import { AbstractArena } from '../scene/AbstractArena';
import VelocityComponent from '../component/VelocityComponent';
import AbstractPokemon from '../model/AbstractPokemon';

export class Enemy extends Entity {

    constructor(scene: AbstractArena, x: number, y: number, pkmn: AbstractPokemon, target: Entity) {
        super();
        const sprite = new SpriteComponent(scene, x, y, pkmn.config.pokemon, pkmn.config.spriteSheets);
        console.log(pkmn.config.speed)
        const velocity = new VelocityComponent(sprite.getSprite(), pkmn.config.speed);
        const chase = new ChaseComponent(scene, sprite.getSprite(), target.getComponent(SpriteComponent).getSprite(), pkmn.config.speed);
        const health = new HealthComponent(100);
        const collision = new CollisionComponent(scene, sprite.getSprite(), scene.getFriendlyPhysicsGroup());
        this.addComponent(sprite);
        this.addComponent(velocity);
        this.addComponent(chase);
        this.addComponent(health);
        this.addComponent(collision);
    }

    getGameObject(): Phaser.GameObjects.GameObject {
        return this.getComponent(SpriteComponent).getSprite();
    }
}
