import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
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
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Uploading } from 'src/interface/upload';
import { testService } from 'src/testing/test.service';

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
  async addImage(
    @Args({ name: 'picture', type: () => GraphQLUpload })
    { createReadStream, filename }: Uploading,
  ): Promise<Boolean> {
    console.log("djddjjddj")
    return new Promise(async (resolver, reject) => {
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolver(true))
        .on('error', () => reject(false));
    });
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
