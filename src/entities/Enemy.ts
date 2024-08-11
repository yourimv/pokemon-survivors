import SpriteComponent from '../components/SpriteComponent';
import Phaser from 'phaser';
import Entity from './Entity';
import InputComponent from '../components/InputComponent';
import { ChaseComponent } from '../components/ChaseComponent';
import { Player } from './Player';

export class Enemy extends Entity {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, player: Player) {
        super();
        const sprite = new SpriteComponent(scene, x, y, texture);
        const input = new InputComponent(scene, sprite.getSprite(), 200);
        const chase = new ChaseComponent(scene, sprite.getSprite(), player.getSpriteComponent().getSprite(), 100);
        this.addComponent(input);
        this.addComponent(sprite);
        this.addComponent(chase);
    }
}
