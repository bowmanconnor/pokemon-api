import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HeightWeightSchema, EvolutionSchema, EvolutionRequirementsSchema, AttacksSchema } from './nestSchemas.schema';

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
    weight: typeof HeightWeightSchema;


    @Prop({
        required: true,
        type: HeightWeightSchema,
    })
    height: typeof HeightWeightSchema;

    @Prop({ required: true, type: Number })
    fleeRate: number;

    @Prop({
        type: [
            EvolutionSchema,
        ],
    })
    "Previous evolution(s)"?: typeof EvolutionSchema[];

    @Prop({
        type: EvolutionRequirementsSchema,
    })
    evolutionRequirements?: typeof EvolutionRequirementsSchema;

    @Prop({
        type: [
            EvolutionSchema
        ],
    })
    evolutions?: typeof EvolutionSchema[];

    @Prop({ required: true, type: Number })
    maxCP: number;

    @Prop({ required: true, type: Number })
    maxHP: number;

    @Prop({
        required: true,
        type: AttacksSchema
    })
    attacks: typeof AttacksSchema;

    @Prop({ required: true, default: false, type: Boolean })
    favorite: boolean;
}

export type PokemonDocument = PokemonSchemaClass & Document;
export const PokemonSchema = SchemaFactory.createForClass(PokemonSchemaClass);
