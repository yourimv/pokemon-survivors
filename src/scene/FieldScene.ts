import { Enemy } from "../entity/Enemy";
import { Player } from "../entity/Player";
import { Pokemon } from "../enum/Pokemon";
import AbstractPokemon from "../model/AbstractPokemon";
import PokemonFactory from "../util/factory/PokemonFactory";
import { AbstractArena } from './AbstractArena';

export class FieldScene extends AbstractArena {

    private player: AbstractPokemon = PokemonFactory.createPokemon(Pokemon.PIKACHU);
    private enemies: AbstractPokemon[] = this.arenaEnemies();

    constructor() {
        super('FieldScene');
    }

    preload(): void {

        this.preloadPokemonSprites();
    }

    create(): void {
        super.create();
        const player = new Player(this, 100, 100, this.player)
        this.addEntity(player);
        this.addEntity(new Enemy(this, 300, 300, this.enemies[0], player));
        this.initSystems();
    }

    update(t: number, dt: number): void {
        super.update(t, dt);
    }

    private arenaEnemies(): AbstractPokemon[] {
        return [
            PokemonFactory.createPokemon(Pokemon.EEVEE)
        ];
    }

    private preloadPokemonSprites() {
        this.player.config.spriteSheets.forEach(spriteSheet => {
            const sheet = `${spriteSheet.texture}-${spriteSheet.activity}`;
            this.load.spritesheet(sheet, `/assets/spritesheets/${sheet}.png`, { frameWidth: spriteSheet.width!, frameHeight: spriteSheet.height });
        });
        this.enemies.forEach(enemy => {
            enemy.config.spriteSheets.forEach(spriteSheet => {
                const sheet = `${spriteSheet.texture}-${spriteSheet.activity}`;
                this.load.spritesheet(sheet, `/assets/spritesheets/${sheet}.png`, { frameWidth: spriteSheet.width!, frameHeight: spriteSheet.height });
            });
        });
    }
}