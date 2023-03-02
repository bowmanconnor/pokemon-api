import { Pokemon } from "src/domain/entity/pokemon";


export class PokemonSummaryDto {
    id: string;
    name: string;
    types: string[]
    favorite: boolean;

    constructor(pokemon: Pokemon) {
        this.id = pokemon.id
        this.name = pokemon.name
        this.types = pokemon.types
        this.favorite = pokemon.favorite
    }
}

