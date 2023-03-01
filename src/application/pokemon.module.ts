import { Module } from '@nestjs/common';
import { PokemonService } from './service/pokemon.service';
import { PokemonController } from '../presentation/pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonRepository } from 'src/infrastructure/mongoDB/pokemon.repository';
import { PokemonSchema, PokemonSchemaClass } from 'src/infrastructure/mongoDB/schemas/pokemon.schema';
import { MapperService } from 'src/infrastructure/mongoDB/mapper/mapper.service';

@Module({
  providers: [PokemonService, PokemonRepository, MapperService],
  controllers: [PokemonController],
  imports: [
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
  ],
})
export class PokemonModule { }