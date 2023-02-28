import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Pokemon {
    @Prop({
        required: true,
        unique: true,
        type: String
    })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    classification: string;

    @Prop({ required: true })
    types: string[];

    @Prop({ required: true })
    resistant: string[];

    @Prop({ required: true })
    weakness: string[];

    @Prop({ required: true, type: Object })
    weight: {
        minimum: string,
        maximum: string
    };

    @Prop({ required: true, type: Object })
    height: {
        minimum: string,
        maximum: string
    };

    @Prop({ required: true })
    fleeRate: number;

    @Prop({ type: Object })
    "Previous evolution(s)"?: {
        id: number,
        name: string
    }[];

    @Prop({ type: Object })
    evolutionRequirements?: {
        amount: number,
        name: string
    };

    @Prop({ type: Object })
    evolutions?: {
        id: number,
        name: string
    }[];

    @Prop({ required: true })
    maxCP: number;

    @Prop({ required: true })
    maxHP: number;

    @Prop({ required: true, type: Object })
    attacks: {
        fast: {
            name: string,
            type: string,
            damage: number
        }[],
        special: {
            name: string,
            type: string,
            damage: number
        }[]
    };

    @Prop({ required: true, default: false })
    favorite: boolean
}

export type PokemonDocument = Pokemon & Document;
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

