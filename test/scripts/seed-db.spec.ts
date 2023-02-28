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
        // Purge database before each test
        await purge(PokemonModel)
    });

    afterAll(async () => {
        if (mongo) {
            await disconnectDB()
            await mongo.stop();
        }
    });

    it('should create all seed data', async () => {
        // Call the seed function with the mock model
        const result = await seed(PokemonModel);

        expect(result.createdCount).toBe(151);
        expect(result.duplicateCount).toBe(0);
        expect(result.error).toBe(undefined);
    });

    it('should skip all 151 of seed data', async () => {
        // Call the seed function ocne to fill the database, then again to check if duplicate works
        await seed(PokemonModel);
        const result = await seed(PokemonModel);

        expect(result.createdCount).toBe(0);
        expect(result.duplicateCount).toBe(151);
        expect(result.error).toBe(undefined);
    });

});

