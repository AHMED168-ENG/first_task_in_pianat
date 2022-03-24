import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserMessageInput {
  @Field()
  message: string;

  @Field()
  from: string;

  @Field()
  to: string;
}
