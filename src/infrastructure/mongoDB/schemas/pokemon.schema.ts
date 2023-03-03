import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { HeightWeightSchema, EvolutionSchema, EvolutionRequirementsSchema, AttacksSchema, Evolution, EvolutionRequirements, HeightWeight, AttackTypes, Attacks } from './nestSchemas.schema';

@Schema()
export class PokemonSchemaClass {
    @Prop({
        required: true,
        unique: true,
        type: String
    })
    id: string;

    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true })
    classification: string;

    @Prop({ required: true, type: Array })
    types: string[];

    @Prop({ required: true, type: Array })
    resistant: string[];

    @Prop({ required: true, type: Array })
    weaknesses: string[];

    @Prop({
        required: true,
        type: HeightWeightSchema,
    })
    weight: HeightWeight;


    @Prop({
        required: true,
        type: HeightWeightSchema,
    })
    height: HeightWeight;

    @Prop({ required: true, type: Number })
    fleeRate: number;

    @Prop({
        type: [
            EvolutionSchema,
        ],
    })
    "Previous evolution(s)"?: Evolution[];

    @Prop({
        type: EvolutionRequirementsSchema,
    })
    evolutionRequirements?: EvolutionRequirements;

    @Prop({
        type: [
            EvolutionSchema
        ],
    })
    evolutions?: Evolution[];

    @Prop({ required: true, type: Number })
    maxCP: number;

    @Prop({ required: true, type: Number })
    maxHP: number;

    @Prop({
        required: true,
        type: AttacksSchema
    })
    attacks: Attacks;

    @Prop({ required: true, default: false, type: Boolean })
    favorite: boolean;
}

export type PokemonDocument = PokemonSchemaClass & Document;
export const PokemonSchema = SchemaFactory.createForClass(PokemonSchemaClass);
