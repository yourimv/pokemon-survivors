import { ActivityState } from './../states/ActivityState';
import SpriteComponent from '../components/SpriteComponent';
import Phaser from 'phaser';
import Entity from './Entity';
import InputComponent from '../components/InputComponent';
import { AnimationComponent } from '../components/AnimationComponent';
import { DirectionState } from '../states/DirectionState';
import { Thunderbolt } from '../components/weapons/Thunderbolt';
import { HealthComponent } from '../components/HealthComponent';
import { AbstractArena } from '../scenes/AbstractArena';

export class Player extends Entity {

    private readonly fps: number = 8;

    constructor(scene: AbstractArena, x: number, y: number, texture: string) {
        super();
        const sprite = new SpriteComponent(scene, x, y, texture);
        sprite.setScale(1);
        this.createAnimations(sprite, scene, ActivityState.Idle, texture, 5);
        this.createAnimations(sprite, scene, ActivityState.Walk, texture, 3);
        const input = new InputComponent(scene, sprite.getSprite(), 200);
        const animation = new AnimationComponent(sprite);
        const weapon = new Thunderbolt(scene, sprite.getSprite());
        const health = new HealthComponent(100);
        this.addComponent(sprite);
        this.addComponent(input);
        this.addComponent(animation);
        this.addComponent(weapon);
        this.addComponent(health);
    }

    getSpriteComponent(): SpriteComponent {
        // hacky af
        return this.components[0] as SpriteComponent;
    }

    private createAnimations(sprite: SpriteComponent, scene: Phaser.Scene, activity: ActivityState, texture: string, interval: number): void {
        const directions = [
            DirectionState.Down,
            DirectionState.DownRight,
            DirectionState.Right,
            DirectionState.UpRight,
            DirectionState.Up,
            DirectionState.UpLeft,
            DirectionState.Left,
            DirectionState.DownLeft
        ];
        let startFrame = 0;
        directions.forEach((direction) => {
            const endFrame = startFrame + interval;
            sprite.addAnimation(`${activity}-${direction}`,
                scene.anims.generateFrameNumbers(`${texture}-${activity}`, { start: startFrame, end: endFrame }),
                this.fps
            );
            startFrame = endFrame + 1; // Update startFrame for next direction
        });
    }
}
