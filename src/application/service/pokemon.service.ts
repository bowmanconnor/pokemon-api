import { Injectable } from '@nestjs/common';
import { Pokemon } from 'src/domain/entity/pokemon';
import { IPokemonService } from 'src/domain/service/pokemon.service.interface';

@Injectable()
export class PokemonService implements IPokemonService {
    create(pokemon: Pokemon): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    find(query?: any, skip?: number, limit?: number): Promise<Pokemon[]> {
        throw new Error('Method not implemented.');
    }
    findByID(values: string): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    findByName(name: string): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    setFavorite(id: string, favorite: boolean): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    types(): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
}
