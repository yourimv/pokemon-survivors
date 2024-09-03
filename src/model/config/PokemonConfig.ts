import { Pokemon } from "../enum/Pokemon";
import { SpriteSheetConfig } from "./SpriteSheetConfig";

export interface PokemonConfig {
    pokemon: Pokemon;
    hp: number;
    attack: number;
    speed: number;
    evolution?: Pokemon;
    spriteSheets: SpriteSheetConfig[];
}