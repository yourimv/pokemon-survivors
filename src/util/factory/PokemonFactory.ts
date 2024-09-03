import { Pokemon } from "../../model/enum/Pokemon";
import AbstractPokemon, { Duskull, Eevee, Pikachu } from "../../model/AbstractPokemon";

export default class PokemonFactory {
    private static map: Map<Pokemon, AbstractPokemon> = this.initFactoryMap()

    static createPokemon(pokemon: Pokemon): AbstractPokemon {
        const pkmn = this.map.get(pokemon);
        if (!pkmn) {
            throw new Error(`Pokemon ${pokemon} not found in factory`);
        }
        return pkmn;
    }

    static initFactoryMap(): Map<Pokemon, AbstractPokemon> {
        const map = new Map<Pokemon, AbstractPokemon>();
        map.set(Pokemon.PIKACHU, new Pikachu());
        map.set(Pokemon.EEVEE, new Eevee());
        map.set(Pokemon.DUSKULL, new Duskull());
        return map;
    }
}