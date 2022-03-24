import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class ResetPassword {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field()
  newPassword: string;
}
