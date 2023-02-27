import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as fs from 'fs';
import { Pokemon, PokemonSchema } from '../src/mongoDB/pokemon.schema';


// Load environment variables
dotenv.config();

// Connect to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        // Create Mongoose model from schema
        const PokemonModel = mongoose.model<Pokemon>('Pokemon', PokemonSchema);

        // Insert seed data
        await PokemonModel.deleteMany();

        console.log('Database purging');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    })
    .finally(() => {
        // Close database connection
        mongoose.disconnect();
        console.log("Disconnected")
    });
