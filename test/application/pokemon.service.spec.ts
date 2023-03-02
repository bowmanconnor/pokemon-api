import { TestingModule, Test } from "@nestjs/testing";
import { PokemonRepository } from "../../src/infrastructure/mongoDB/pokemon.repository";
import { PokemonService } from "../../src/application/service/pokemon.service";

import * as fs from 'fs';

console.log = function () { };

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

});