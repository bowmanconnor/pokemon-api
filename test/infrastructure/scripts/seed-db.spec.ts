import mongoose, { Model } from 'mongoose';
import { PokemonSchemaClass, PokemonSchema, PokemonDocument } from '../../../src/infrastructure/mongoDB/schemas/pokemon.schema';
import { seed } from '../../../src/infrastructure/scripts/seed-db'
import { purge } from '../../../src/infrastructure/scripts/purge-db'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectDB, disconnectDB } from '../../../src/infrastructure/scripts/connect-db';

// Ignore console.log lines in seed, purge, connectDB, disconnectDB
console.log = function () { };

describe('seed-db', () => {
    let mongo = null
    let PokemonModel: Model<PokemonDocument>

    beforeAll(async () => {
        // Create mock mongoDB database to not interfere with production database
        mongo = await MongoMemoryServer.create();
        const uri = mongo.getUri();
        mongoose.set('strictQuery', false)
        await mongoose.connect(uri)

        PokemonModel = mongoose.model<PokemonDocument>('Pokemon', PokemonSchema);

    });

    beforeEach(async () => {
        await purge(PokemonModel)
    });

    afterAll(async () => {
        await mongoose.disconnect()
        await mongo.stop();
    });

    it('should create all seed data', async () => {
        // Call the seed function to load database
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

