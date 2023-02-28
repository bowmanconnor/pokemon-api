import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { Pokemon, PokemonSchema } from '../src/mongoDB/pokemon.schema';
import { connectDB, disconnectDB } from './connect-db';

export const purge = async (PokemonModel: any): Promise<any> => {
    let ret = {
        success: 0,
        deletedCount: 0,
        error: undefined
    }

    try {
        // Delete all documents in the collection
        const deleteObj = await PokemonModel.deleteMany();
        ret.success = deleteObj.acknowledged
        ret.deletedCount = deleteObj.deletedCount

        console.log('Database purged');
        return ret;

    } catch (err) {
        console.error('Failed to purge database', err);
        ret.error = err
        return ret;
    }
};

const run = async () => {
    // await connectDB()
    // const PokemonModel = mongoose.model<Pokemon>('Pokemon', PokemonSchema);
    // await purge(PokemonModel)
    // await disconnectDB()
}

run()
