import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class MyMessagesWithUser {
  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  order: string;
}
