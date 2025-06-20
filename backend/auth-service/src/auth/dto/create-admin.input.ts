import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateAdminInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @MinLength(8)
  password: string;
}