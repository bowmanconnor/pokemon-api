import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as fs from 'fs';
import { Pokemon, PokemonSchema } from '../src/mongoDB/pokemon.schema';

export const seed = async (print: boolean): Promise<boolean> => {
    try {
        // Load environment variables
        dotenv.config();

        // Define seed data
        const fileContents = fs.readFileSync('src/json/pokemons.JSON', 'utf8');
        const pokemons = JSON.parse(fileContents);

        // Connect to database
        await mongoose.connect(process.env.MONGO_URI)
        if (print) {
            console.log('Connected to MongoDB');
        }

        // Create Mongoose model from schema
        const PokemonModel = mongoose.model<Pokemon>('Pokemon', PokemonSchema);

        // Insert seed data
        for (let pokemon of pokemons) {
            try {
                let createdPokemon = await PokemonModel.create(pokemon)
                if (print) {
                    console.log(`CREATED [${createdPokemon.id}] ${createdPokemon.name}`);
                }
            } catch (error) {
                if (error.code = 11000) {
                    if (print) {
                        console.log(`DUPLICATE [${pokemon.id}] ${pokemon.name}`);
                    }
                } else {
                    if (print) {
                        console.log(error);
                    }
                    return false
                }
            }
        } if (print) {
            console.log('Seed data inserted');
        }
        return true

    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    } finally {
        mongoose.disconnect();
        if (print) {
            console.log("Disconnected")
        }
    }
}

seed(true)
