import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@InputType('VehicleInput')  // Named input type for GraphQL
@Schema()
export class Vehicle {
  @Field()
  @Prop({ required: true })
  model: string;

  @Field()
  @Prop({ required: true })
  brand: string;

  @Field()
  @Prop({ required: true })
  year: number;

  @Field()
  @Prop({ required: true })
  price: number;

  @Field()
  @Prop({ required: true })
  status: string;

  @Field()
  @Prop({ required: true })
  image: string;

  @Field()
  @Prop({ required: true })
  km: number;
}

@InputType('UpdateVehicleInput') // Add this
export class UpdateVehicleInput extends PartialType(Vehicle) {
  @Field(() => ID) // _id is required for updates
  _id: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);