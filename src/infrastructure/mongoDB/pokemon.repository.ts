import { Injectable } from '@nestjs/common';
import { Pokemon } from 'src/domain/entity/pokemon';
import { IPokemonRepository } from 'src/domain/repository/pokemon.repository.interface';

@Injectable()
export class PokemonRepository implements IPokemonRepository {
    create(pokemon: Pokemon): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    findMany(query?: any, skip?: number, limit?: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findOne(values: object): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    updateOne(id: string, values: object): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    distinct(attribute: string): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
}
