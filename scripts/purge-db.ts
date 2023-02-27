import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { Pokemon, PokemonSchema } from '../src/mongoDB/pokemon.schema';

export const purge = async (print: boolean = true): Promise<boolean> => {
    try {
        // Load environment variables
        dotenv.config();

        // Connect to database
        await mongoose.connect(process.env.MONGO_URI);

        if (print) {
            console.log('Connected to MongoDB');
        }

        // Create Mongoose model from schema
        const PokemonModel = mongoose.model<Pokemon>('Pokemon', PokemonSchema);

        // Delete all documents in the collection
        await PokemonModel.deleteMany();

        if (print) {
            console.log('Database purged');
        }

        return true;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        return false;
    } finally {
        // Close database connection
        await mongoose.disconnect();

        if (print) {
            console.log('Disconnected from MongoDB');
        }
    }
};

purge()