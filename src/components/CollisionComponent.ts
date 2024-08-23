import Phaser from 'phaser';
import Component from './Component';
import { AbstractArena } from '../scenes/AbstractArena';
import Entity from '../entities/Entity';

export default class CollisionComponent implements Component {

    constructor(scene: AbstractArena, sprite: Phaser.GameObjects.Sprite, otherGroup: Phaser.Physics.Arcade.Group) {
        scene.physics.add.overlap(sprite, otherGroup, this.handleCollision);
    }

    update(dt: number): void {
        // do nothing
    }

    private handleCollision(object1: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, object2: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile): void {
        const entity1 = (object1 as any).entity as Entity;
        const entity2 = (object2 as any).entity as Entity;
        console.log('Collision detected between', entity1, 'and', entity2);
    }

}