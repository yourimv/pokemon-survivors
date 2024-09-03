import { Pokemon } from "../../enum/Pokemon";

export default interface SystemConfig { }

export interface WaveSystemConfig extends SystemConfig {
    pokemon: Pokemon[];
    // probably more fields here later down the line
}