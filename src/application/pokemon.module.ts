import { Module } from '@nestjs/common';
import { PokemonService } from '../application/pokemon.service';
import { PokemonController } from '../presentation/pokemon.controller';

@Module({
  providers: [PokemonService],
  controllers: [PokemonController]
})
export class PokemonModule { }