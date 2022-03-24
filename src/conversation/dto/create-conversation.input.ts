import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConversationInput {
  @Field()
  From: string;

  @Field()
  To: string;
}
