import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from '../../src/application/service/pokemon.service';
import { PokemonRepository } from '../../src/infrastructure/mongoDB/pokemon.repository';
import { PokemonController } from '../../src/presentation/pokemon.controller';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';

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

  describe("getByID", () => {
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
      expect(mockService.findByID).toHaveBeenCalled()

    })
  });

});
