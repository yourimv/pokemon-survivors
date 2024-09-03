import { WaveSystemConfig } from './../model/config/system/SystemConfig';
import { Player } from "../entity/Player";
import { Pokemon } from "../model/enum/Pokemon";
import AbstractPokemon from "../model/AbstractPokemon";
import PokemonFactory from "../util/factory/PokemonFactory";
import { AbstractArena } from './AbstractArena';

export class FieldScene extends AbstractArena {

    private player: AbstractPokemon = PokemonFactory.createPokemon(Pokemon.PIKACHU);

    constructor() {
        super('FieldScene');
    }

    preload(): void {
        this.preloadPokemonSprites();
        this.arenaPokemon().forEach(enemy => {
            this.spriteSheetConfigs = this.spriteSheetConfigs.concat(enemy.config.spriteSheets);
        });
    }

    create(): void {
        super.create();
        const player = new Player(this, 100, 100, this.player)
        this.addEntity(player);

        // Initialize the systems
        const waveSystemConfig: WaveSystemConfig = {
            pokemon: this.arenaPokemon().map(enemy => enemy.config.pokemon)
        };
        this.initArenaSystems(waveSystemConfig);

        // Set up the camera
        const camera = this.cameras.main;
        camera.startFollow(player.getGameObject());
        camera.setBounds(0, 0, this.scale.width, this.scale.height);
        camera.setZoom(1);
    }

    update(t: number, dt: number): void {
        super.update(t, dt);
    }

    private arenaPokemon(): AbstractPokemon[] {
        return [
            PokemonFactory.createPokemon(Pokemon.EEVEE),
            PokemonFactory.createPokemon(Pokemon.DUSKULL),
            PokemonFactory.createPokemon(Pokemon.PIKACHU)
        ];
    }

    private preloadPokemonSprites() {
        this.arenaPokemon().forEach(enemy => {
            enemy.config.spriteSheets.forEach(spriteSheet => {
                const sheet = `${spriteSheet.texture}-${spriteSheet.activity}`;
                this.load.spritesheet(sheet, `/assets/spritesheets/${sheet}.png`, { frameWidth: spriteSheet.width!, frameHeight: spriteSheet.height });
            });
        });
    }
}