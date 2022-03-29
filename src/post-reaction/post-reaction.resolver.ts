import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostReactionService } from './post-reaction.service';
import { PostReaction } from './models/post-reaction.model';
import { CreatePostReactionInput } from './dto/create-post-reaction.input';
import { UpdatePostReactionInput } from './dto/update-post-reaction.input';

@Resolver(() => PostReaction)
export class PostReactionResolver {
  constructor(private readonly postReactionService: PostReactionService) {}

  @Mutation(() => PostReaction)
  createPostReaction(
    @Args('createPostReactionInput')
    createPostReactionInput: CreatePostReactionInput,
  ) {
    return this.postReactionService.create(createPostReactionInput);
  }

  @Query(() => PostReaction, { name: 'postReaction' })
  findOne(@Args('userId') userId: string) {
    return this.postReactionService.findOne(userId);
  }

  @Mutation(() => PostReaction)
  updatePostReaction(
    @Args('updatePostReactionInput')
    updatePostReactionInput: UpdatePostReactionInput,
  ) {
    return this.postReactionService.update(updatePostReactionInput);
  }

  @Mutation(() => PostReaction)
  removePostReaction(@Args('postId') postId: string) {
    return this.postReactionService.remove(postId);
  }
}
