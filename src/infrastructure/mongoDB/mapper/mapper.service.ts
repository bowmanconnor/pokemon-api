import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon as PokemonEntity } from 'src/domain/entity/pokemon';
import { PokemonSchemaClass, PokemonDocument } from '../schemas/pokemon.schema';

@Injectable()
export class MapperService {
    constructor(
        @InjectModel('Pokemon') private readonly model: Model<PokemonDocument>
    ) { }

    pokemonSchemaToEntity(pokemon: PokemonSchemaClass): PokemonEntity {
        let entity = new PokemonEntity()

        console.log(pokemon);
        return
        // entity.id = pokemon.id
        // entity.name = pokemon.name
        // entity.classification = pokemon.classification
        // entity.types = pokemon.types
        // entity.resistant = pokemon.resistant
        // entity.weaknesses = pokemon.weaknesses
        // entity.weight.maximum = pokemon.weight.paths.maximum
        // entity.height = pokemon.height
        // entity.fleeRate = pokemon.fleeRate
        // entity.previousEvolutions = pokemon['Previous evolution(s)']
        // entity.evolutionRequirements = pokemon.evolutionRequirements
        // entity.evolutions = pokemon.evolutions
        // entity.maxCP = pokemon.maxCP
        // entity.maxHP = pokemon.maxHP
        // entity.attacks = pokemon.attacks
        // entity.favorite = pokemon.favorite

    }
}
