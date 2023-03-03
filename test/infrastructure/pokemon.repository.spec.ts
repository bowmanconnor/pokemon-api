import { TestingModule, Test } from "@nestjs/testing";
import { PokemonRepository } from "../../src/infrastructure/mongoDB/pokemon.repository";
import * as fs from 'fs';
import mongoose, { Model, MongooseError } from "mongoose";
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
            it('should find by ID on an empty database', async () => {
                const values = { id: "001" }
                let result = await pokemonRepository.findOne(values)

                expect(result).toBe(null)
            })

            it('should find by valid ID on a populated database', async () => {
                await seed(PokemonModel)

                const values = { id: "001" }
                let result = await pokemonRepository.findOne(values)
                expect(result.id).toBe(values.id)

            })

            it('should find by invalid ID on a populated database', async () => {
                await seed(PokemonModel)

                const values = { id: "000" }
                let result = await pokemonRepository.findOne(values)

                expect(result).toBe(null)
            })
        })

        describe("by Name", () => {
            it('should find by name on an empty database', async () => {
                // Get pokemon with id "001". Should call mock repository findOne
                const values = { name: "Bulbasaur" }
                let result = await pokemonRepository.findOne(values)

                expect(result).toBe(null)
            })

            it('should find by valid name on a populated database', async () => {
                // Seed the database
                await seed(PokemonModel)

                // Get pokemon with id "001". Should call mock repository findOne
                const values = { name: "Bulbasaur" }
                let result = await pokemonRepository.findOne(values)
                expect(result.name).toBe(values.name)

            })

            it('should find by invalid name on a populated database', async () => {
                // Seed the database
                await seed(PokemonModel)

                // Get invalid pokemon with id "000". Should call mock repository findOne. Should throw exception
                const values = { name: "IBM" }
                let result = await pokemonRepository.findOne(values)

                expect(result).toBe(null)
            })
        });
    });

    describe("updateOne", () => {
        it('should update a valid pokemon with valid values on an empty database', async () => {
            const id = "001"
            const values = { "favorite": true }
            let result = await pokemonRepository.updateOne(id, values)

            expect(result).toBe(null)
        })

        it('should update a valid pokemon with invalid values on an empty database', async () => {
            const id = "001"
            const values = { "banana": true }

            await expect(pokemonRepository.updateOne(id, values)).rejects.toBeInstanceOf(Error);

        })

        it('should update a valid pokemon with valid values on a populated database', async () => {
            await seed(PokemonModel)

            const id = "001"
            const values = { "favorite": true }
            let result = await pokemonRepository.updateOne(id, values)

            expect(result.favorite).toBe(values.favorite)

        })

        it('should update a valid pokemon with invalid values on a populated database', async () => {
            await seed(PokemonModel)

            const id = "001"
            const values = { "banana": true }

            await expect(pokemonRepository.updateOne(id, values)).rejects.toBeInstanceOf(Error);

        })

        it('should update an invalid pokemon with valid values on a populated database', async () => {
            await seed(PokemonModel)

            const id = "000"
            const values = { "favorite": true }
            let result = await pokemonRepository.updateOne(id, values)

            expect(result).toBe(null)
        })

        it('should update an invalid pokemon with invalid values on a populated database', async () => {
            // Update pokemon with id "000" with valid options {banana: true}
            await seed(PokemonModel)

            const id = "000"
            const values = { "banana": true }

            await expect(pokemonRepository.updateOne(id, values)).rejects.toBeInstanceOf(Error);
        })
    })

    describe("distinct", () => {
        it('should return distinct values of a valid attribute on an empty database', async () => {
            const attribute = "types"
            let result = await pokemonRepository.distinct(attribute)

            expect(result.length).toBe(0)
            expect(result).toBeInstanceOf(Array<String>)
        })

        it('should return distinct values of a invalid attribute on an empty database', async () => {
            const attribute = "shoes"
            let result = await pokemonRepository.distinct(attribute)

            expect(result.length).toBe(0)
            expect(result).toBeInstanceOf(Array<String>)
        })

        it('should return distinct values of a valid attribute on a populated database', async () => {
            await seed(PokemonModel)

            const attribute = "types"
            let result = await pokemonRepository.distinct(attribute)

            expect(result.length).toBeGreaterThan(0)
            expect(result).toBeInstanceOf(Array<String>)
        })

        it('should return distinct values of an invalid attribute on a populated database', async () => {
            await seed(PokemonModel)

            const attribute = "shoes"
            let result = await pokemonRepository.distinct(attribute)

            expect(result.length).toBe(0)
            expect(result).toBeInstanceOf(Array<String>)
        })
    })

    describe("findMany", () => {
        describe("empty database", () => {
            it('should return a list of pokemon with no query, limit, skip on empty database', async () => {
                let result = await pokemonRepository.findMany({})

                expect(result.length).toBe(0)
            })

            it('should return a list of pokemon with limit = 20 on empty database', async () => {
                let query = {}
                let skip = 0
                let limit = 20
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(0)
            })

            it('should return a list of pokemon with passing skip = 5 on empty database', async () => {
                let query = {}
                let skip = 5
                let limit = 10
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(0)
            })

            it('should return a list of pokemon with passing one of query {name = Bulb} on empty database', async () => {
                let query = { name: "Bulb" }
                let skip = 0
                let limit = 10
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(0)

            })

            it('should return an empty list of pokemon with passing one of query {name = Connor} on empty database', async () => {
                let query = { name: "Connor" }
                let skip = 0
                let limit = 10
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(0)

            })

            it('should return a list of pokemon with multiple queries on empty database', async () => {
                let query = { name: "e", fleeRate: 0.06 }
                let skip = 0
                let limit = 151
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(0)

            })

            it('should return an empty list of pokemon with multiple queries on empty database', async () => {
                let query = { fleeRate: 100, maxCP: 20, maxHP: 3 }
                let skip = 0
                let limit = 151
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(0)
            })
        })

        describe("populated database", () => {
            it('should return a list of pokemon with no query, limit, skip on populated database', async () => {
                await seed(PokemonModel)
                let result = await pokemonRepository.findMany({})

                expect(result.length).toBe(10)
            })

            it('should return a list of pokemon with limit = 20 on populated database', async () => {
                await seed(PokemonModel)
                let query = {}
                let skip = 0
                let limit = 20
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(20)
            })

            it('should return a list of pokemon with passing skip = 5 on populated database', async () => {
                await seed(PokemonModel)
                let query = {}
                let skip = 5
                let limit = 10
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(10)
                expect(result[0].id).toBe("006")
            })

            it('should return a list of pokemon with passing one of query {name = Bulb} on populated database', async () => {
                await seed(PokemonModel)
                let query = { name: "Bulb" }
                let skip = 0
                let limit = 10
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(1)

            })

            it('should return an empty list of pokemon with passing one of query {name = Connor} on populated database', async () => {
                await seed(PokemonModel)
                let query = { name: "Connor" }
                let skip = 0
                let limit = 10
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(0)

            })

            it('should return a list of pokemon with multiple queries on populated database', async () => {
                await seed(PokemonModel)
                let query = { name: "e", fleeRate: 0.06 }
                let skip = 0
                let limit = 151
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(18)

            })

            it('should return an empty list of pokemon with multiple queries on populated database', async () => {
                await seed(PokemonModel)
                let query = { fleeRate: 100, maxCP: 20, maxHP: 3 }
                let skip = 0
                let limit = 151
                let result = await pokemonRepository.findMany(query, skip, limit)

                expect(result.length).toBe(0)
            })
        })
    })
});

