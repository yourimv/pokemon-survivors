import { Enemy } from "../entity/Enemy";
import { WaveSystemConfig } from "../model/config/system/SystemConfig";
import { Pokemon } from "../model/enum/Pokemon";
import { AbstractArena } from "../scene/AbstractArena";
import PokemonFactory from "../util/factory/PokemonFactory";
import System from "./System";

export default class WaveSystem implements System {

    private scene: AbstractArena;
    private currentWave: number = 0;
    private enemiesPerWave: number = 5;
    private waveInterval: number = 5000; // 10 seconds
    private waveTimer: number = 0;
    private systemConfig: WaveSystemConfig;

    constructor(scene: AbstractArena, systemConfig: WaveSystemConfig) {
        this.scene = scene;
        this.systemConfig = systemConfig;
    }

    update(dt: number): void {
        const currentTime = this.scene.time.now;
        if (currentTime - this.waveTimer > this.waveInterval) {
            this.spawnWave();
            this.waveTimer = currentTime;
        }
    }

    private spawnWave(): void {
        this.currentWave++;
        for (let i = 0; i < this.enemiesPerWave; i++) {
            const enemy = new Enemy(
                this.scene,
                Math.random() * this.scene.scale.width,
                Math.random() * this.scene.scale.height,
                PokemonFactory.createPokemon(this.randomPokemon()),
                this.scene.getPlayer()!
            );
            this.scene.addEntity(enemy);
        }
    }

    private randomPokemon(): Pokemon {
        const pkmn = this.systemConfig.pokemon;
        return pkmn[Math.floor(Math.random() * pkmn.length)];
    }
}