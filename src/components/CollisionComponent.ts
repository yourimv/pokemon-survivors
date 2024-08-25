import Phaser from 'phaser';
import Component from './Component';
import { AbstractArena } from '../scenes/AbstractArena';
import { AbstractCollisionEvent } from '../events/AbstractCollisionEvent';
import SimpleCollisionEvent from '../events/SimpleCollisionEvent';

export default class CollisionComponent implements Component {

    constructor(scene: AbstractArena, sprite: Phaser.GameObjects.Sprite, otherGroup: Phaser.Physics.Arcade.Group, collisionEvent?: AbstractCollisionEvent) {
        if (!collisionEvent) {
            collisionEvent = new SimpleCollisionEvent;
        }
        scene.physics.add.overlap(sprite, otherGroup, collisionEvent.handle.bind(collisionEvent));
    }

    update(dt: number): void {
        // do nothing
    }

}