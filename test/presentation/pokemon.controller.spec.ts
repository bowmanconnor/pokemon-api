import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from '../../src/application/service/pokemon.service';
import { PokemonRepository } from '../../src/infrastructure/mongoDB/pokemon.repository';
import { PokemonController } from '../../src/presentation/pokemon.controller';
import * as fs from 'fs';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe("PokemonController", () => {
  let pokemonController: PokemonController;

  // Load pokemons
  const fileContents = fs.readFileSync('src/infrastructure/json/pokemons.JSON', 'utf8');
  const pokemons = JSON.parse(fileContents);

  // Mock Service
  const mockService = {
    findByID: jest.fn().mockImplementation(id => {
      let pokemon = pokemons.find(p => p.id === id)
      return pokemon
    }),

    findByName: jest.fn().mockImplementation(name => {
      let pokemon = pokemons.find(p => p.name === name)
      return pokemon
    }),

    setFavorite: jest.fn().mockImplementation((id, favorite) => {
      let pokemon = pokemons.find(p => p.id === id)
      if (pokemon) {
        pokemon.favorite = favorite
      }
      return pokemon
    }),

    types: jest.fn().mockImplementation(() => {
      const typesArray = [...pokemons.map((pokemon) => pokemon.types)];
      const uniqueValues = [...new Set(typesArray.flat())];
      return uniqueValues
    }),

    favorites: jest.fn().mockImplementation(() => {
      let favoritePokemons = []
      let pokemon1 = pokemons.find(p => p.id === "001")
      let pokemon2 = pokemons.find(p => p.id === "002")
      let pokemon3 = pokemons.find(p => p.id === "001")
      let pokemon4 = pokemons.find(p => p.id === "002")

      pokemon1.favorite = true
      pokemon2.favorite = true
      pokemon3.favorite = true
      pokemon4.favorite = true

      favoritePokemons = [pokemon1, pokemon2, pokemon3, pokemon4]
      return favoritePokemons
    })
  }


  beforeAll(async () => {
    // Compile testing module
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        PokemonRepository,
        { provide: PokemonService, useValue: mockService },
        { provide: getModelToken('Pokemon'), useValue: jest.fn() }
      ],
    }).compile();
    pokemonController = app.get<PokemonController>(PokemonController);
  });

  it('should be defined', () => {
    expect(pokemonController).toBeDefined();
  });

  describe("findByID", () => {
    it('should return a valid pokemon', async () => {
      const id = "001"
      let result = await pokemonController.findByID(id)

      expect(mockService.findByID).toHaveBeenCalled()
      expect(result.id).toBe(id)
    })

    it('should return an invalid pokemon', async () => {
      const id = "000"
      const result = pokemonController.findByID(id);

      await expect(result).rejects.toBeInstanceOf(NotFoundException);
    })
  });

  describe("findByName", () => {
    it('should return a valid pokemon', async () => {
      const name = "Bulbasaur"
      let result = await pokemonController.findByName(name)

      expect(mockService.findByName).toHaveBeenCalled()
      expect(result.name).toBe(name)
    })

    it('should return an invalid pokemon', async () => {
      const name = "IBM"
      const result = pokemonController.findByName(name);

      await expect(result).rejects.toBeInstanceOf(NotFoundException);
      expect(mockService.findByName).toHaveBeenCalled()
    })
  });

  describe("favorite", () => {
    it('should set favorite on a valid pokemon', async () => {
      const id = "001"
      let result = await pokemonController.favorite(id)

      expect(mockService.setFavorite).toHaveBeenCalled()
      expect(result.id).toBe(id)
      expect(result.favorite).toBe(true)
    })

    it('should set favorite on an invalid pokemon', async () => {
      const id = "000"
      const result = pokemonController.favorite(id);

      await expect(result).rejects.toBeInstanceOf(BadRequestException);
      expect(mockService.setFavorite).toHaveBeenCalled()
    })
  });

  describe("unfavorite", () => {
    it('should set unfavorite on a valid pokemon', async () => {
      const id = "001"
      let result = await pokemonController.unfavorite(id)

      expect(mockService.setFavorite).toHaveBeenCalled()
      expect(result.id).toBe(id)
      expect(result.favorite).toBe(false)
    })

    it('should set unfavorite on an invalid pokemon', async () => {
      const id = "000"
      const result = pokemonController.unfavorite(id);

      await expect(result).rejects.toBeInstanceOf(BadRequestException);
      expect(mockService.setFavorite).toHaveBeenCalled()
    })
  });

  describe("types", () => {
    it('should return unique values of types', async () => {
      let result = await pokemonController.types()

      expect(mockService.types).toHaveBeenCalled()
      expect(result).toBeInstanceOf(Array<String>)
      expect(result.length).toBeGreaterThan(0)
    })
  });

  describe("favorites", () => {
    it('should return a list of favorites', async () => {
      let result = await pokemonController.favorites()

      expect(mockService.favorites).toHaveBeenCalled()
      expect(result.length).toBe(4)
    })
  })
});
