import Phaser from 'phaser'
import Component from './Component';

export default class InputComponent implements Component {

    private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene) {
        this.cursors = scene.input.keyboard!.createCursorKeys();
    }

    isLeftPressed(): boolean {
        return this.cursors.left.isDown;
    }

    isRightPressed(): boolean {
        return this.cursors.right.isDown;
    }

    isUpPressed(): boolean {
        return this.cursors.up.isDown;
    }

    isDownPressed(): boolean {
        return this.cursors.down.isDown;
    }

    update(dt: number): void {

    }
}