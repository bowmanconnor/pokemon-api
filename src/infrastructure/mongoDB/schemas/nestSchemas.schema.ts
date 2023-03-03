import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class HeightWeight {
    @Prop()
    _id: false;

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
export type HeightWeightDocument = HeightWeight & Document;
export const HeightWeightSchema = SchemaFactory.createForClass(HeightWeight);

@Schema({ strict: 'throw' })
export class Evolution {
    @Prop()
    _id: false;

    @Prop({
        required: true,
        type: Number
    })
    id: number;

    @Prop({
        required: true,
        type: String
    })
    name: string;
}
export const EvolutionSchema = SchemaFactory.createForClass(Evolution);


@Schema()
export class EvolutionRequirements {
    @Prop()
    _id: false;

    @Prop({
        required: true,
        type: Number
    })
    amount: number;

    @Prop({
        required: true,
        type: String
    })
    name: string;
}
export const EvolutionRequirementsSchema = SchemaFactory.createForClass(EvolutionRequirements);



@Schema()
export class AttackTypes {
    @Prop()
    _id: false;

    @Prop({
        required: true,
        type: String
    })
    name: string;

    @Prop({
        required: true,
        type: String
    })
    type: string;


    @Prop({
        required: true,
        type: Number
    })
    damage: number;
}
export const AttackTypesSchema = SchemaFactory.createForClass(AttackTypes);

@Schema()
export class Attacks {
    @Prop()
    _id: false;

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

