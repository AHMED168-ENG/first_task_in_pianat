import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Posts } from './models/posts.model';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Resolver(() => Posts)
export class PostResolver {
  uploadImage;
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Posts)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Query(() => [Posts], { name: 'findAllPosts' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Posts, { name: 'findpost' })
  findOne(@Args('userId') userId: string) {
    return this.postService.findOne(userId);
  }

  @Mutation(() => Boolean)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput);
  }

  @Mutation(() => Boolean)
  removePost(@Args('userId') userId: string) {
    return this.postService.remove(userId);
  }
}

function uploadImage() {
  return FileInterceptor('photo', {
    storage: diskStorage({
      destination: './public/frontEnd/posts/images',
      filename: (req, file, done) => {
        console.log(file);
        const name = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        done(null, `${name}-${randomName}${fileExtName}`);
      },
    }),
    fileFilter: (req, file, done) => {
      if (!file) {
        throw new Error('الصوره غير موجوده');
      }
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return done(new Error('Only image files are allowed!'), false);
      }
      return done(null, true);
    },
  });
}
