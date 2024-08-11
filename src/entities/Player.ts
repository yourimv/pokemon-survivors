import SpriteComponent from '../components/SpriteComponent';
import Phaser from 'phaser';
import Entity from './Entity';
import InputComponent from '../components/InputComponent';

export class Player extends Entity {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super();
        const sprite = new SpriteComponent(scene, x, y, texture);
        const input = new InputComponent(scene, sprite.getSprite(), 200);
        this.addComponent(sprite);
        this.addComponent(input);
    }

    getSpriteComponent(): SpriteComponent {
        // hacky af
        return this.components[0] as SpriteComponent;
    }
}
