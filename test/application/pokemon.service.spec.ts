import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonRepository } from '../../src/infrastructure/mongoDB/pokemon.repository';
import { PokemonController } from '../../src/presentation/pokemon.controller';
import { PokemonService } from '../../src/application/service/pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonRepository, PokemonService, { provide: getModelToken('Pokemon'), useValue: jest.fn() }],
      controllers: [PokemonController]
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

