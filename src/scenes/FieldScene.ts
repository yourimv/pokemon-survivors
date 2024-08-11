import { Enemy } from "../units/Enemy";
import { Player } from "../units/Player";

export class FieldScene extends Phaser.Scene {
    private player?: Player;
    private enemies: Enemy[] = [];
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: 'FieldScene' });
    }

    preload() {
        Player.preload(this);
        Enemy.preload(this);
    }

    create() {
        this.player = new Player(this, 100, 100);
        this.enemies.push(new Enemy(this, 300, 300, this.player));
        this.cursors = this.input.keyboard?.createCursorKeys();
    }

    update() {
        this.player!.update(this.cursors!);
        this.enemies.forEach(e => e.update());
    }
}