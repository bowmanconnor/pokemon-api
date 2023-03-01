import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from '../../src/application/service/pokemon.service';
import { PokemonRepository } from '../../src/infrastructure/mongoDB/pokemon.repository';
import { PokemonController } from '../../src/presentation/pokemon.controller';

describe('PokemonController', () => {
  let controller: PokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonRepository, PokemonService, { provide: getModelToken('Pokemon'), useValue: jest.fn() }],
      controllers: [PokemonController],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
