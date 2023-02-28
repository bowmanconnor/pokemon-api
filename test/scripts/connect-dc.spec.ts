
import mongoose, { Model } from 'mongoose';
import { Pokemon, PokemonSchema } from '../../src/mongoDB/pokemon.schema';
import { seed } from '../../scripts/seed-db'
import { purge } from '../../scripts/purge-db'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectDB, disconnectDB } from '../../scripts/connect-db';

// Ignore console.log lines in seed, purge, connectDB, disconnectDB
console.log = function () { };

describe('seed-db', () => {
    let mongo = null
    let uri: string

    beforeAll(async () => {
        // Create mock mongoDB database to not interfere with production database
        mongo = await MongoMemoryServer.create();
        uri = mongo.getUri();
    });

    afterAll(async () => {
        if (mongo) {
            await mongo.stop();
        }
    });

    it('should connect to a mongoDB database', async () => {
        // except the connection to be disconnected initialy
        expect(mongoose.connection.readyState).toBe(0);

        await connectDB(uri);

        // expect the connection to be connected now
        expect(mongoose.connection.readyState).toBe(1);

    });

    it('should disconnect to a mongoDB database', async () => {
        // expect the connection to be connected still
        expect(mongoose.connection.readyState).toBe(1);

        await disconnectDB();

        // expect the connection to be disconnected finally
        expect(mongoose.connection.readyState).toBe(0);

    });


});

