import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class HeightWeight {
    @Prop({
        required: true,
        type: String
    })
    minimum: string;

    @Prop({
        required: true,
        type: String
    })
    maximum: string;
}
export const HeightWeightSchema = SchemaFactory.createForClass(HeightWeight);

@Schema()
class Evolution {
    @Prop({
        required: true,
        type: Number
    })
    id: string;

    @Prop({
        required: true,
        type: String
    })
    name: string;
}
export const EvolutionSchema = SchemaFactory.createForClass(Evolution);


@Schema()
class EvolutionRequirements {
    @Prop({
        required: true,
        type: Number
    })
    amount: string;

    @Prop({
        required: true,
        type: String
    })
    name: string;
}
export const EvolutionRequirementsSchema = SchemaFactory.createForClass(EvolutionRequirements);



@Schema()
class AttackTypes {
    @Prop({
        required: true,
        type: String
    })
    name: string;

    @Prop({
        required: true,
        type: String
    })
    type: String;


    @Prop({
        required: true,
        type: Number
    })
    damage: String;
}
export const AttackTypesSchema = SchemaFactory.createForClass(AttackTypes);


@Schema()
export class Attacks {
    @Prop({
        required: true,
        type: [AttackTypesSchema],
        validate: [(value) => value.length > 0],

    })
    fast: AttackTypes[];

    @Prop({
        required: true,
        type: [AttackTypesSchema],
        validate: [(value) => value.length > 0],

    })
    special: AttackTypes[];
}
export const AttacksSchema = SchemaFactory.createForClass(Attacks);

