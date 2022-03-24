import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class SignUpUserInput {
  @Field(() => Int)
  id: number;
}
