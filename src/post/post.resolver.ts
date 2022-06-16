import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Int,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Posts } from './models/posts.model';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { GqlAuthGuard } from 'src/user/guard/jwt_guard';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/user/model/user.model';
import { UserFrindsService } from 'src/user-frinds/user-frinds.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { testService } from 'src/testing/test.service';
import { FileUploading } from 'src/interface/upload';

const pubSub = new PubSub();
@Resolver(() => Posts)
export class PostResolver {
  uploadImage;
  constructor(
    private readonly postService: PostService,
    private readonly userFrindsService: UserFrindsService,
  ) {}

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Posts)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    var usersFrind = await this.userFrindsService.findAllFrindes(
      createPostInput.userId,
    );
    await pubSub.publish('addPostNotification', usersFrind);
    return this.postService.create(createPostInput);
  }

  @Mutation(() => Int, { name: 'coverPhoto' })
  async uploadCoverPhoto(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<number> {
    try {
      console.log('djdhdhdh');
      const { createReadStream } = file;

      const stream = createReadStream();
      const chunks = [];

      var buffer = await new Promise<Buffer>((resolve, reject) => {
        let buffer: Buffer;

        stream.on('data', function (chunk) {
          chunks.push(chunk);
        });

        stream.on('end', function () {
          buffer = Buffer.concat(chunks);
          resolve(buffer);
        });

        stream.on('error', reject);
      });

      buffer = Buffer.concat(chunks);

      const base64 = buffer.toString('base64');
      // If you want to store the file, this is one way of doing
      // it, as you have the file in-memory as Buffer

      console.log(base64);
      return base64.length;
    } catch (err) {
      return 0;
    }
  }

  @Query(() => String)
  testingg(): any {
    return new BadRequestException();
  }

  @Subscription(() => [User], {
    name: 'addPostNotification',
    resolve: (value) => value,
    filter: (payload, variabels) =>
      payload.some((ele) => ele.id == variabels.frindId),
  })
  addPostNotification(@Args('frindId') frindId: string) {
    return pubSub.asyncIterator('addPostNotification');
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Posts], { name: 'findAllPosts' })
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Posts, { name: 'findPost' })
  findOne(@Args('userId') userId: string) {
    return this.postService.findOne(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removePost(@Args('userId') userId: string) {
    return this.postService.remove(userId);
  }
}
