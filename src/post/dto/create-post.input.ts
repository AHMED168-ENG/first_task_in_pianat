import { InputType, Int, Field } from '@nestjs/graphql';
import { UploadImage } from 'src/scalars/upload';

@InputType()
export class CreatePostInput {
  @Field()
  userId: string;

  @Field({ nullable: true })
  post: string;

  @Field({ nullable: true })
  image: UploadImage;

  @Field({ nullable: true })
  video: string;
}
