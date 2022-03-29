import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  comment: string;

  @Field()
  userId: string;

  @Field()
  postId: string;
}
