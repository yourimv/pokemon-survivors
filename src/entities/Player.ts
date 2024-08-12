import SpriteComponent from '../components/SpriteComponent';
import Phaser from 'phaser';
import Entity from './Entity';
import InputComponent from '../components/InputComponent';
import { AnimationComponent } from '../components/AnimationComponent';

export class Player extends Entity {

    private readonly fps: number = 5;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super();
        const sprite = new SpriteComponent(scene, x, y, texture);
        // Add animations to the sprite
        sprite.addAnimation('down', scene.anims.generateFrameNumbers(texture, { start: 0, end: 3 }), this.fps);

        sprite.addAnimation('right', scene.anims.generateFrameNumbers(texture, { start: 8, end: 11 }), this.fps);

        sprite.addAnimation('up', scene.anims.generateFrameNumbers(texture, { start: 16, end: 19 }), this.fps);

        sprite.addAnimation('left', scene.anims.generateFrameNumbers(texture, { start: 24, end: 27 }), this.fps);

        const input = new InputComponent(scene, sprite.getSprite(), 200);
        const animation = new AnimationComponent(sprite);
        this.addComponent(sprite);
        this.addComponent(input);
        this.addComponent(animation);
    }

    getSpriteComponent(): SpriteComponent {
        // hacky af
        return this.components[0] as SpriteComponent;
    }
}
