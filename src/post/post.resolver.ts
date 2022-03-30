import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Posts } from './models/posts.model';
import { UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { GqlAuthGuard } from 'src/user/guard/jwt_guard';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/user/model/user.model';
import { UserRequestService } from 'src/user-request/user-request.service';
import { UserFrindsService } from 'src/user-frinds/user-frinds.service';
const pubSub = new PubSub();
@Resolver(() => Posts)
export class PostResolver {
  uploadImage;
  constructor(
    private readonly postService: PostService,
    private readonly userFrindsService: UserFrindsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Posts)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    var usersFrind = await this.userFrindsService.findAllFrindes(
      createPostInput.userId,
    );
    await pubSub.publish('addPostNotification', usersFrind);
    return this.postService.create(createPostInput);
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
  @Query(() => Posts, { name: 'findpost' })
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
