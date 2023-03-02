import { Injectable } from '@nestjs/common';
import { Pokemon } from 'src/domain/entity/pokemon';
import { IPokemonService } from 'src/domain/service/pokemon.service.interface';
import { PokemonRepository } from '../../infrastructure/mongoDB/pokemon.repository';

@Injectable()
export class PokemonService implements IPokemonService {
    constructor(private readonly PokemonReository: PokemonRepository) { }
    create(pokemon: Pokemon): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    find(query?: any, skip?: number, limit?: number): Promise<Pokemon[]> {
        throw new Error('Method not implemented.');
    }
    async findByID(id: string): Promise<Pokemon> {
        let values = { "id": id }
        return await this.PokemonReository.findOne(values);
    }
    async findByName(name: string): Promise<Pokemon> {
        let values = { "name": name }
        return await this.PokemonReository.findOne(values);
    }
    async setFavorite(id: string, favorite: boolean): Promise<Pokemon> {
        let values = { "favorite": favorite }
        return await this.PokemonReository.updateOne(id, values);
    }
    types(): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
}
