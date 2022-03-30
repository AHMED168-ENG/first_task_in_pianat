import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostReactionService } from './post-reaction.service';
import { PostReaction } from './models/post-reaction.model';
import { CreatePostReactionInput } from './dto/create-post-reaction.input';
import { UpdatePostReactionInput } from './dto/update-post-reaction.input';
import { GqlAuthGuard } from 'src/user/guard/jwt_guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => PostReaction)
export class PostReactionResolver {
  constructor(private readonly postReactionService: PostReactionService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PostReaction)
  createPostReaction(
    @Args('createPostReactionInput')
    createPostReactionInput: CreatePostReactionInput,
  ) {
    return this.postReactionService.createReactPost(createPostReactionInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => PostReaction, { name: 'postReaction' })
  findOne(@Args('userId') userId: string) {
    return this.postReactionService.findOne(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PostReaction)
  updatePostReaction(
    @Args('updatePostReactionInput')
    updatePostReactionInput: UpdatePostReactionInput,
  ) {
    return this.postReactionService.update(updatePostReactionInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeFromPostReact(
    @Args('postId') postId: string,
    @Args('userId') userId: string,
  ) {
    return this.postReactionService.remove(postId);
  }
}
