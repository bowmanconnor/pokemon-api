import { TestingModule, Test } from "@nestjs/testing";
import { PokemonRepository } from "../../src/infrastructure/mongoDB/pokemon.repository";
import * as fs from 'fs';
import mongoose, { Model } from "mongoose";
import { PokemonDocument, PokemonSchema } from "../../src/infrastructure/mongoDB/schemas/pokemon.schema";
import { MongoMemoryServer } from "mongodb-memory-server";
import { seed } from "../../src/infrastructure/scripts/seed-db";
import { getModelToken } from "@nestjs/mongoose";
import { purge } from "../../src/infrastructure/scripts/purge-db";

console.log = function () { };

describe("PokemonRepository", () => {
    let pokemonRepository: PokemonRepository;

    let mongo = null
    let PokemonModel: Model<PokemonDocument>

    // Load pokemons 
    const fileContents = fs.readFileSync('src/infrastructure/json/pokemons.JSON', 'utf8');
    const pokemons = JSON.parse(fileContents);

    beforeAll(async () => {
        PokemonModel = mongoose.model<PokemonDocument>('Pokemon', PokemonSchema);

        // Create mock mongoDB database to not interfere with production database
        mongo = await MongoMemoryServer.create();
        const uri = mongo.getUri();
        mongoose.set("strictQuery", false)
        await mongoose.connect(uri)

        // Compile testing module
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PokemonRepository,
                { provide: getModelToken('Pokemon'), useValue: PokemonModel }
            ],
        }).compile();
        pokemonRepository = module.get<PokemonRepository>(PokemonRepository);

    });

    beforeEach(async () => {
        await purge(PokemonModel)
    })

    it('should be defined', () => {
        expect(pokemonRepository).toBeDefined();
    });

    describe("findOne", () => {
        describe("by ID", () => {
            it('should find by valid ID with empty database', async () => {
                // Get pokemon with id "001". Should call mock repository findOne
                const values = { id: "001" }
                let result = await pokemonRepository.findOne(values)

                expect(result).toBe(null)
            })

            it('should find by invalid ID with empty database', async () => {
                // Get invalid pokemon with id "000". Should call mock repository findOne. Should throw exception
                const values = { id: "000" }
                let result = await pokemonRepository.findOne(values)

                expect(result).toBe(null)
            })

            it('should find by valid ID with populated database', async () => {
                // Seed the database
                await seed(PokemonModel)

                // Get pokemon with id "001". Should call mock repository findOne
                const values = { id: "001" }
                let result = await pokemonRepository.findOne(values)
                expect(result.id).toBe(values.id)

            })

            it('should find by invalid ID with populated database', async () => {
                // Seed the database
                await seed(PokemonModel)

                // Get invalid pokemon with id "000". Should call mock repository findOne. Should throw exception
                const values = { id: "000" }
                let result = await pokemonRepository.findOne(values)

                expect(result).toBe(null)
            })
        })
    });

});