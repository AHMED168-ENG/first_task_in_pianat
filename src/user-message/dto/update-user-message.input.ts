import { CreateUserMessageInput } from './create-user-message.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserMessageInput {
  @Field()
  message: string;
}
