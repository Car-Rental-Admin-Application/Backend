import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class CreateVehicleInput {
  @Field()
  @IsNotEmpty()
  model: string;

  @Field()
  @IsNotEmpty()
  brand: string;

  @Field()
  @IsNumber()
  year: number;

  @Field()
  @IsNumber()
  @IsPositive()
  price: number;

  @Field()
  @IsNotEmpty()
  status: string;

  @Field()
  @IsNotEmpty()
  image: string;
  
  @Field()
  @IsNumber()
  @IsPositive()
  km: number;

}