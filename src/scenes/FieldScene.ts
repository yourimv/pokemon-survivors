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
        this.load.image('player', '/assets/player.png');
        this.load.image('enemy', '/assets/enemy.png');
    }

    create(): void {
        this.player = new Player(this, 100, 100, 'player');
        this.enemies.push(new Enemy(this, 300, 300, 'enemy', this.player));
    }

    update(t: number, dt: number): void {
        this.player.update(dt);
        this.enemies.forEach(e => e.update(dt));
    }
}