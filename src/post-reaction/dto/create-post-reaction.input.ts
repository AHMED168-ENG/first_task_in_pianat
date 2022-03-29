import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostReactionInput {
  @Field()
  postId: string;

  @Field()
  userId: string;

  @Field()
  type: string;
}
