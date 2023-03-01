import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/domain/entity/pokemon';
import { IPokemonRepository } from 'src/domain/repository/pokemon.repository.interface';
import { MapperService } from './mapper/mapper.service';
import { PokemonDocument, PokemonSchemaClass } from './schemas/pokemon.schema';

@Injectable()
export class PokemonRepository implements IPokemonRepository {
    constructor(
        @InjectModel('Pokemon') private readonly model: Model<PokemonDocument>,
        private readonly MapperService: MapperService
    ) { }

    create(pokemon: Pokemon): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    findMany(query?: any, skip?: number, limit?: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async findOne(values: object): Promise<Pokemon> {
        console.log(values);


        let pokemon = await this.model.find().exec()
        console.log(pokemon);

        // this.MapperService.pokemonSchemaToEntity(pokemon)
        return

    }
    updateOne(id: string, values: object): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    distinct(attribute: string): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
}
