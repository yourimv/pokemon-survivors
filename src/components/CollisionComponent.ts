import Phaser from 'phaser';
import Component from './Component';
import { AbstractArena } from '../scenes/AbstractArena';

export default class CollisionComponent implements Component {

    constructor(scene: AbstractArena, sprite: Phaser.GameObjects.Sprite, otherGroup: Phaser.Physics.Arcade.Group) {
        scene.physics.add.overlap(sprite, otherGroup, this.handleCollision);
    }

    update(dt: number): void {
        // do nothing
    }

    private handleCollision(object1: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, object2: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile): void {
        console.log('Collision detected');
    }

}