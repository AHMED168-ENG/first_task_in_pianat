import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsString,
  Length,
  IsEmail,
  IsAlphanumeric,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @Length(5, 25)
  name: string;

  @Field()
  @IsEmail({}, { message: 'this filed accept email only' })
  email: string;

  @Field()
  @IsAlphanumeric()
  @Length(10, 25)
  password: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(40)
  @Min(15)
  age: number;

  @Field({ nullable: true })
  @IsOptional()
  @Length(10, 250)
  addres: string;
}
