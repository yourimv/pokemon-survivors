import SpriteComponent from '../component/SpriteComponent';
import Phaser from 'phaser';
import Entity from './Entity';
import InputComponent from '../component/InputComponent';
import { Thunderbolt } from '../component/weapon/Thunderbolt';
import { HealthComponent } from '../component/HealthComponent';
import { AbstractArena } from '../scene/AbstractArena';
import CollisionComponent from '../component/CollisionComponent';
import VelocityComponent from '../component/VelocityComponent';
import AbstractPokemon from '../model/AbstractPokemon';

export class Player extends Entity {

    constructor(scene: AbstractArena, x: number, y: number, pkmn: AbstractPokemon) {
        super();
        const sprite = new SpriteComponent(scene, x, y, pkmn.config.pokemon, pkmn.config.spriteSheets);
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
