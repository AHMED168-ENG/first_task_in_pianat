import { CreatePostReactionInput } from './create-post-reaction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostReactionInput {
  @Field()
  postId: string;

  @Field()
  usersId: string;

  @Field()
  types: string;
}
