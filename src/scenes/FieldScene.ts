import Phaser from 'phaser';

import { Enemy } from "../entities/Enemy";
import { Player } from "../entities/Player";

export class FieldScene extends Phaser.Scene {
    private player: Player;
    private enemies: Enemy[] = [];

    constructor() {
        super({ key: 'FieldScene' });
    }

    preload(): void {
        this.load.spritesheet('player-walk', '/assets/spritesheets/pikachu-walk.png', { frameWidth: 32, frameHeight: 40 });
        this.load.spritesheet('player-idle', '/assets/spritesheets/pikachu-idle.png', { frameWidth: 40, frameHeight: 55 });
        this.load.image('enemy', '/assets/enemy.png');
    }

    create(): void {
        this.player = new Player(this, 100, 100, 'player');
        // this.enemies.push(new Enemy(this, 300, 300, 'enemy', this.player));
    }

    update(t: number, dt: number): void {
        this.player.update(dt);
        this.enemies.forEach(e => e.update(dt));
    }
}