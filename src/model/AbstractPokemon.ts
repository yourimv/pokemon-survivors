import { PokemonConfig } from "./config/PokemonConfig";
import { Pokemon } from "./enum/Pokemon";
import { ActivityState } from "../state/ActivityState";
import { PokemonConfigBuilder } from "../util/builder/PokemonConfigBuilder";
import { SpriteSheetConfigBuilder } from "../util/builder/SpriteSheetConfigBuilder";

export default abstract class AbstractPokemon {
    config: PokemonConfig;
    constructor(config: PokemonConfig) {
        this.config = config;
    }
}

export class Pikachu extends AbstractPokemon {
    constructor() {
        super(PokemonConfigBuilder.builder(Pokemon.PIKACHU)
            .withHp(35).withAttack(55).withSpeed(90).withSpriteSheet([
                SpriteSheetConfigBuilder.builder(Pokemon.PIKACHU)
                    .withActivity(ActivityState.IDLE).withFrames(5).withWidth(40).withHeight(56).build(),
                SpriteSheetConfigBuilder.builder(Pokemon.PIKACHU)
                    .withActivity(ActivityState.WALK).withFrames(3).withWidth(32).withHeight(40).build()
            ])
            .build());
    }
}

export class Eevee extends AbstractPokemon {
    constructor() {
        super(PokemonConfigBuilder.builder(Pokemon.EEVEE)
            .withHp(55).withAttack(55).withSpeed(55).withSpriteSheet([
                SpriteSheetConfigBuilder.builder(Pokemon.EEVEE)
                    .withActivity(ActivityState.IDLE).withFrames(1).withWidth(24).withHeight(32).build(),
                SpriteSheetConfigBuilder.builder(Pokemon.EEVEE)
                    .withActivity(ActivityState.WALK).withFrames(6).withWidth(40).withHeight(48).build()
            ])
            .build());
    }
}

export class Duskull extends AbstractPokemon {
    constructor() {
        super(PokemonConfigBuilder.builder(Pokemon.DUSKULL)
            .withHp(20).withAttack(40).withSpeed(25).withSpriteSheet([
                SpriteSheetConfigBuilder.builder(Pokemon.DUSKULL)
                    .withActivity(ActivityState.IDLE).withFrames(5).withWidth(32).withHeight(56).build(),
                SpriteSheetConfigBuilder.builder(Pokemon.DUSKULL)
                    .withActivity(ActivityState.WALK).withFrames(7).withWidth(24).withHeight(48).build()
            ])
            .build());
    }
}