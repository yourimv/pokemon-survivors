import Phaser from 'phaser';

import { Enemy } from "../entities/Enemy";
import { Player } from "../entities/Player";

export class AbstractArena extends Phaser.Scene {

    protected player: Player;
    protected enemies: Enemy[] = [];

    constructor(key: string) {
        super({ key: key });
    }

    getEnemies(): Enemy[] {
        return this.enemies;
    }
}