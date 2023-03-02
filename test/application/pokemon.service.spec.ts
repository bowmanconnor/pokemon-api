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
      // Get invalid pokemon with id "000". Should call mock repository findOne. Should throw exception

      const id = "000"
      let result = await pokemonService.findByID(id)

      expect(mockRepository.findOne).toHaveBeenCalled()
      expect(result).toBe(undefined)
    })
  });

  describe("getByName", () => {
    it('should return a valid pokemon', async () => {
      // Get pokemon with id "001". Should call mock repository findOne
      const name = "Bulbasaur"
      let result = await pokemonService.findByName(name)

      expect(mockRepository.findOne).toHaveBeenCalled()
      expect(result.name).toBe(name)
    })

    it('should return an invalid pokemon', async () => {
      // Get invalid pokemon with id "000". Should call mock repository findOne. Should throw exception

      const name = "IBM"
      let result = await pokemonService.findByName(name)

      expect(mockRepository.findOne).toHaveBeenCalled()
      expect(result).toBe(undefined)
    })
  });

});