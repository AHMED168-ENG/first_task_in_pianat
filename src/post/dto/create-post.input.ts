import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  userId: string;

  @Field({ nullable: true })
  post: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  video: string;
}
