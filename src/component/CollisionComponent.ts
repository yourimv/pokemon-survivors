import Phaser from 'phaser';
import Component from './Component';
import { AbstractArena } from '../scene/AbstractArena';
import { AbstractCollisionEvent } from '../event/AbstractCollisionEvent';
import SimpleCollisionEvent from '../event/SimpleCollisionEvent';

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