import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/domain/entity/pokemon';
import { IPokemonRepository } from 'src/domain/repository/pokemon.repository.interface';
import { PokemonDocument } from './schemas/pokemon.schema';

@Injectable()
export class PokemonRepository implements IPokemonRepository {
    constructor(
        @InjectModel('Pokemon') private readonly model: Model<PokemonDocument>) { }

    create(pokemon: Pokemon): Promise<Pokemon> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async findMany(query: any, skip: number = 0, limit: number = 10): Promise<any> {
        const { name, ...filterQuery } = query
        return await this.model.find({ "name": { "$regex": query.name || "", "$options": "i" }, ...filterQuery }).skip(skip).limit(limit).exec();
    }

    async findOne(values: object): Promise<Pokemon> {
        return await this.model.findOne(values).select('-__v -_id').exec()
    }

    async updateOne(id: string, values: object): Promise<Pokemon> {
        await this.model.updateOne(
            { id: id },
            {
                $set:
                    { ...values }
            }
        ).exec()
        return await this.findOne({ "id": id })
    }

    async distinct(attribute: string): Promise<any[]> {
        return this.model.distinct(attribute)
    }
}
