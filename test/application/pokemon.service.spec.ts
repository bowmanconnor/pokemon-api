import { TestingModule, Test } from "@nestjs/testing";
import { PokemonRepository } from "../../src/infrastructure/mongoDB/pokemon.repository";
import { PokemonService } from "../../src/application/service/pokemon.service";

import * as fs from 'fs';

// console.log = function () { };

describe("PokemonService", () => {
  let pokemonService: PokemonService;

  // Load pokemons 
  const fileContents = fs.readFileSync('src/infrastructure/json/pokemons.JSON', 'utf8');
  const pokemons = JSON.parse(fileContents);

  // Mock repository
  const mockRepository = {
    findOne: jest.fn().mockImplementation(values => {
      let id = values["id"]
      let name = values["name"]

      let pokemon = pokemons.find(p => p.id === id) || pokemons.find(p => p.name === name)
      return pokemon
    }),

    updateOne: jest.fn().mockImplementation((id, values) => {
      let favoriteStatus = values["favorite"]
      let pokemon = pokemons.find(p => p.id === id)

      if (pokemon !== undefined) {
        pokemon.favorite = favoriteStatus
      }
      return pokemon
    }),

    distinct: jest.fn().mockImplementation((attribute) => {
      const typesArray = [...pokemons.map((pokemon) => pokemon[attribute])];
      const uniqueValues = [...new Set(typesArray.flat())];
      return uniqueValues
    }),

    findMany: jest.fn().mockImplementation((query: any = {}, skip: number = 0, limit: number = 10) => {
      let startIndex = skip;
      const endIndex = startIndex + limit;
      const { name, ...filterQuery } = query;
      const filteredPokemons: Array<any> = pokemons.filter(pokemon => {
        if (name && !(new RegExp(name)).test(pokemon.name)) {
          return false
        } else {
          for (const key in filterQuery) {
            if (filterQuery.hasOwnProperty(key) && pokemon[key] !== filterQuery[key]) {
              return false;
            }
          }
        }
        return true;
      })

      if (skip > filteredPokemons.length) {
        startIndex = 0
      }
      const paginatedPokemons = filteredPokemons.slice(startIndex, endIndex)
      return paginatedPokemons
    })
  }

  beforeAll(async () => {
    // Compile testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: PokemonRepository, useValue: mockRepository },
      ],
    }).compile();
    pokemonService = module.get<PokemonService>(PokemonService);

  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });

  describe("getByID", () => {
    it('should return a valid pokemon', async () => {
      // Get pokemon with id "001". Should call mock repository findOne
      const id = "001"
      let result = await pokemonService.findByID(id)

      expect(mockRepository.findOne).toHaveBeenCalled()
      expect(result.id).toBe(id)
    })

    it('should return an invalid pokemon', async () => {
      // Get invalid pokemon with id "000". Should call mock repository findOne.

      const id = "000"
      let result = await pokemonService.findByID(id)

      expect(mockRepository.findOne).toHaveBeenCalled()
      expect(result).toBe(undefined)
    })
  });

  describe("getByName", () => {
    it('should return a valid pokemon', async () => {
      // Get pokemon with name "Bulbasaur". Should call mock repository findOne
      const name = "Bulbasaur"
      let result = await pokemonService.findByName(name)

      expect(mockRepository.findOne).toHaveBeenCalled()
      expect(result.name).toBe(name)
    })

    it('should return an invalid pokemon', async () => {
      // Get invalid pokemon with id "IBM". Should call mock repository findOne.

      const name = "IBM"
      let result = await pokemonService.findByName(name)

      expect(mockRepository.findOne).toHaveBeenCalled()
      expect(result).toBe(undefined)
    })
  });

  describe("setFavorite", () => {
    it('should change a valid pokemons favorite status to true', async () => {
      // Set pokemon with id "001" favorite status to true. Should call mock repository updateOne
      const id = "001"
      const favoriteStatus = true
      let result = await pokemonService.setFavorite(id, favoriteStatus)

      expect(mockRepository.updateOne).toHaveBeenCalled()
      expect(result.favorite).toBe(favoriteStatus)
    })

    it('should change an invalid pokemons favorite status to true', async () => {
      // Set pokemon with id "000" favorite status to true. Should call mock repository updateOne
      const id = "000"
      const favoriteStatus = true
      let result = await pokemonService.setFavorite(id, favoriteStatus)

      expect(mockRepository.findOne).toHaveBeenCalled()
      expect(result).toBe(undefined)
    })

    it('should change a valid pokemons favorite status to false', async () => {
      // Set pokemon with id "001" favorite status to true. Should call mock repository updateOne
      const id = "001"
      const favoriteStatus = false
      let result = await pokemonService.setFavorite(id, favoriteStatus)

      expect(mockRepository.updateOne).toHaveBeenCalled()
      expect(result.favorite).toBe(favoriteStatus)
    })

    it('should change an invalid pokemons favorite status to false', async () => {
      // Set pokemon with id "000" favorite status to true. Should call mock repository updateOne
      const id = "000"
      const favoriteStatus = false
      let result = await pokemonService.setFavorite(id, favoriteStatus)

      expect(mockRepository.findOne).toHaveBeenCalled()
      expect(result).toBe(undefined)
    })
  });

  describe("types", () => {
    it('should return distinct values of types', async () => {
      const attribute = "types"
      let result = await pokemonService.types()

      expect(mockRepository.distinct).toHaveBeenCalled()
      expect(result).toBeInstanceOf(Array<String>)
    })
  });

  describe("findMany", () => {
    it('should return a list of pokemon with no query, limit, skip', async () => {
      let result = await pokemonService.find()

      expect(mockRepository.findMany).toHaveBeenCalled()
      expect(result.length).toBe(10)
    })

    it('should return a list of pokemon with limit = 20', async () => {
      let query = {}
      let skip = 0
      let limit = 20
      let result = await pokemonService.find(query, skip, limit)

      expect(mockRepository.findMany).toHaveBeenCalled()
      expect(result.length).toBe(20)
    })

    it('should return a list of pokemon with passing skip = 5', async () => {
      let query = {}
      let skip = 5
      let limit = 10
      let result = await pokemonService.find(query, skip, limit)

      expect(mockRepository.findMany).toHaveBeenCalled()
      expect(result.length).toBe(10)
      expect(result[0].id).toBe("006")
    })

    it('should return a list of pokemon with passing one of query {name = Bulb}', async () => {
      let query = { name: "Bulb" }
      let skip = 0
      let limit = 10
      let result = await pokemonService.find(query, skip, limit)

      expect(mockRepository.findMany).toHaveBeenCalled()
      expect(result.length).toBe(1)

    })

    it('should return an empty list of pokemon with passing one of query {name = Connor}', async () => {
      let query = { name: "Connor" }
      let skip = 0
      let limit = 10
      let result = await pokemonService.find(query, skip, limit)

      expect(mockRepository.findMany).toHaveBeenCalled()
      expect(result.length).toBe(0)

    })

    it('should return a list of pokemon with multiple queries', async () => {
      let query = { name: "e", fleeRate: 0.06 }
      let skip = 0
      let limit = 151
      let result = await pokemonService.find(query, skip, limit)

      expect(mockRepository.findMany).toHaveBeenCalled()
      expect(result.length).toBe(18)

    })

    it('should return an empty list of pokemon with multiple queries', async () => {
      let query = { fleeRate: 100, maxCP: 20, maxHP: 3 }
      let skip = 0
      let limit = 151
      let result = await pokemonService.find(query, skip, limit)

      expect(mockRepository.findMany).toHaveBeenCalled()
      expect(result.length).toBe(0)
    })


    it('should return an empty list of favorite pokemons', async () => {
      let query = { favorite: true }
      let skip = 0
      let limit = 151
      let result = await pokemonService.find(query, skip, limit)

      expect(mockRepository.findMany).toHaveBeenCalled()
      expect(result.length).toBe(0)
    })

    it('should return a list of favorite pokemons', async () => {
      await pokemonService.setFavorite("001", true)

      let query = { favorite: true }
      let skip = 0
      let limit = 151
      let result = await pokemonService.find(query, skip, limit)

      expect(mockRepository.findMany).toHaveBeenCalled()
      expect(result.length).toBe(1)
    })
  })
});