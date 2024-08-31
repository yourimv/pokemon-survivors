import { Pokemon } from "../../enum/Pokemon";
import { PokemonConfig } from "../../model/config/PokemonConfig";
import { SpriteSheetConfig } from "../../model/config/SpriteSheetConfig";

export class PokemonConfigBuilder {
    pkmn: Pokemon;
    hp: number;
    attack: number;
    speed: number;
    evolution?: Pokemon;
    spriteSheets: SpriteSheetConfig[];

    constructor(pkmn: Pokemon) {
        this.pkmn = pkmn;
    }

    static builder(pkmn: Pokemon) {
        return new PokemonConfigBuilder(pkmn);
    }

    withHp(hp: number) {
        this.hp = hp;
        return this;
    }

    withAttack(attack: number) {
        this.attack = attack;
        return this;
    }

    withSpeed(speed: number) {
        this.speed = speed;
        return this;
    }

    withEvolution(evolution: Pokemon) {
        this.evolution = evolution;
        return this;
    }

    withSpriteSheet(spriteSheet: SpriteSheetConfig[]) {
        this.spriteSheets = spriteSheet;
        return this;
    }

    build(): PokemonConfig {
        return {
            pokemon: this.pkmn,
            hp: this.hp,
            attack: this.attack,
            speed: this.speed,
            evolution: this.evolution,
            spriteSheets: this.spriteSheets
        };
    }

}