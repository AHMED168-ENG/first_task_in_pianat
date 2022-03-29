import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field()
  userId: string;

  @Field({ nullable: true })
  post: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  video: string;
}
