import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Int,
} from '@nestjs/graphql';
import * as fs from 'fs/promises';

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
import { createWriteStream } from 'fs';
import { testService } from 'src/testing/test.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

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

  @Mutation(() => Boolean)
  async uploadPhoto(
    @Args('files', { type: () => GraphQLUpload }) files: FileUpload[],
  ): Promise<boolean> {
    try {
      console.log(await files);
      // const { createReadStream } = file;
      // console.log(createReadStream());
      // const stream = createReadStream();
      // const chunks = [];

      // var buffer = await new Promise<Buffer>((resolve, reject) => {
      //   let buffer: Buffer;

      //   stream.on('data', function (chunk) {
      //     chunks.push(chunk);
      //   });

      //   stream.on('end', function () {
      //     buffer = Buffer.concat(chunks);
      //     resolve(buffer);
      //   });

      //   stream.on('error', reject);
      // });

      // buffer = Buffer.concat(chunks);
      // await fs.writeFile('./src/public/' + file.filename, buffer);

      return true;
    } catch (err) {
      return err;
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
