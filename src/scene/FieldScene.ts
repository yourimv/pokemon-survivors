import { Player } from "../entity/Player";
import { Pokemon } from "../enum/Pokemon";
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
        this.arenaEnemies().forEach(enemy => {
            this.spriteSheetConfigs = this.spriteSheetConfigs.concat(enemy.config.spriteSheets);
        });
        this.spriteSheetConfigs = this.spriteSheetConfigs.concat(this.player.config.spriteSheets);
    }

    create(): void {
        super.create();
        const player = new Player(this, 100, 100, this.player)
        this.addEntity(player);
        // this.addEntity(new Enemy(this, 300, 300, this.enemies[0], player));
        this.initSystems();

        // Set up the camera
        const camera = this.cameras.main;
        camera.startFollow(player.getGameObject());
        camera.setBounds(0, 0, this.scale.width, this.scale.height);
        camera.setZoom(1);
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
        this.arenaEnemies().forEach(enemy => {
            enemy.config.spriteSheets.forEach(spriteSheet => {
                const sheet = `${spriteSheet.texture}-${spriteSheet.activity}`;
                this.load.spritesheet(sheet, `/assets/spritesheets/${sheet}.png`, { frameWidth: spriteSheet.width!, frameHeight: spriteSheet.height });
            });
        });
    }
}