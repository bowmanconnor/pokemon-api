import { Injectable } from '@nestjs/common';
import { Pokemon } from 'src/domain/entity/pokemon';
import { IPokemonService } from 'src/domain/service/pokemon.service.interface';
import { PokemonRepository } from '../../infrastructure/mongoDB/pokemon.repository';
@Injectable()
export class PokemonService implements IPokemonService {
    constructor(private readonly PokemonReository: PokemonRepository) { }
    async find(query?: any, skip?: number, limit?: number): Promise<Pokemon[]> {
        return await this.PokemonReository.findMany(query, skip, limit)
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
    async favorites(): Promise<Pokemon[]> {
        let values = { "favorite": true }
        return await this.PokemonReository.findMany(values);
    }
    async types(): Promise<String[]> {
        return await this.PokemonReository.distinct("types")
    }
}
