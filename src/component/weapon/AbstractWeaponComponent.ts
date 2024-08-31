import { WeaponConfig } from "../../model/config/WeaponConfig";
import { AbstractArena } from "../../scene/AbstractArena";
import Component from "../Component";

export abstract class AbstractWeaponComponent implements Component {

    protected scene: AbstractArena;
    protected sprite: Phaser.Physics.Arcade.Sprite;
    protected lastAttack: number = 0;
    protected config: WeaponConfig;

    constructor(scene: AbstractArena, sprite: Phaser.Physics.Arcade.Sprite, config: WeaponConfig) {
        this.scene = scene;
        this.sprite = sprite;
        this.config = config;
    }

    abstract update(dt: number): void;
    abstract attack(): void;

    setWeaponConfig(config: WeaponConfig): void {
        this.config = config;
    }

}