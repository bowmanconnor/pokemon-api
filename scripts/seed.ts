import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as fs from 'fs';
import { Pokemon, PokemonSchema } from '../src/mongoDB/pokemon.schema';


// Load environment variables
dotenv.config();

// Define seed data

// Read file contents
const fileContents = fs.readFileSync('src/json/pokemons.JSON', 'utf8');

// Parse JSON string into object
const pokemons = JSON.parse(fileContents);

// Connect to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        // Create Mongoose model from schema
        const PokemonModel = mongoose.model<Pokemon>('Pokemon', PokemonSchema);

        // Insert seed data
        for (let pokemon of pokemons) {
            try {
                let createdPokemon = await PokemonModel.create(pokemon)
                console.log(`CREATED [${createdPokemon.id}] ${createdPokemon.name}`);
            } catch (error) {
                if (error.code = 11000) {
                    console.log(`DUPLICATE [${pokemon.id}] ${pokemon.name}`);
                } else {
                    console.log(error);
                }
            }
        }
        console.log('Seed data inserted');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    })
    .finally(() => {
        // Close database connection
        mongoose.disconnect();
        console.log("Disconnected")
    });
