import * as mongoose from 'mongoose';
import * as fs from 'fs';
import { Pokemon, PokemonSchema } from '../src/mongoDB/pokemon.schema';
import { connectDB, disconnectDB } from './connect-db';

export const seed = async (pokemonModel: any): Promise<any> => {
    // Define seed data
    const fileContents = fs.readFileSync('src/json/pokemons.JSON', 'utf8');
    const pokemons = JSON.parse(fileContents);

    let ret = {
        createdCount: 0,
        duplicateCount: 0,
        error: undefined
    }

    // Insert seed data
    for (let pokemon of pokemons) {
        try {
            let createdPokemon = await pokemonModel.create(pokemon)
            console.log(`CREATED [${createdPokemon.id}] ${createdPokemon.name}`);
            ret.createdCount += 1;
        } catch (error) {
            if (error.code = 11000) {
                console.log(`DUPLICATE [${pokemon.id}] ${pokemon.name}`);
                ret.duplicateCount += 1;
            } else {
                console.log(error);
                ret.error = error
            }
        }
    }
    console.log('Seed data inserted');
    return ret
}

const run = async () => {
    // await connectDB()
    // const PokemonModel = mongoose.model<Pokemon>('Pokemon', PokemonSchema);
    // await seed(PokemonModel)
    // await disconnectDB()
}

run()

