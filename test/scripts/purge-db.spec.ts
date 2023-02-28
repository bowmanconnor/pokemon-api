
import mongoose, { Model } from 'mongoose';
import { Pokemon, PokemonSchema } from '../../src/infrastructure/mongoDB/pokemon.schema';
import { seed } from '../../src/infrastructure/scripts/seed-db'
import { purge } from '../../src/infrastructure/scripts/purge-db'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectDB, disconnectDB } from '../../src/infrastructure/scripts/connect-db';

// Ignore console.log lines in seed, purge, connectDB, disconnectDB
console.log = function () { };

describe('seed-db', () => {
    let mongo = null
    let PokemonModel: Model<Pokemon>

    beforeAll(async () => {
        // Create mock mongoDB database to not interfere with production database
        mongo = await MongoMemoryServer.create();
        const uri = mongo.getUri();
        await connectDB(uri)

        PokemonModel = mongoose.model<Pokemon>('Pokemon', PokemonSchema);

    });

    beforeEach(async () => {
        // Seed database before each test
        await seed(PokemonModel)
    });

    afterAll(async () => {
        if (mongo) {
            await disconnectDB()
            await mongo.stop();
        }
    });

    it('should delete all seed data', async () => {
        // Call the purge function with the mock model
        const result = await purge(PokemonModel);

        expect(result.deletedCount).toBe(151);
        expect(result.success).toBe(true);
        expect(result.error).toBe(undefined);
    });

    it('should delete 0 docs after being purged once', async () => {
        // Call the purge function once to delete the database, then again to check if deleted works
        await purge(PokemonModel);
        const result = await purge(PokemonModel);

        expect(result.deletedCount).toBe(0);
        expect(result.success).toBe(true);
        expect(result.error).toBe(undefined);
    });

});

