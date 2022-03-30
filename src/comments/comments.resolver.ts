import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comments } from './models/comment.model';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { GqlAuthGuard } from 'src/user/guard/jwt_guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver(() => Comments)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comments)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(createCommentInput);
  }

  @Query(() => [Comments], { name: 'FindAllComments' })
  findAll(
    @Args('userId') userId: string,
    @Args('userId') postId: string,
    @Args('offset') offset: number,
  ) {
    return this.commentsService.findAll(userId, postId, offset);
  }

  @Mutation(() => Boolean)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.update(updateCommentInput);
  }

  @Mutation(() => Boolean)
  removeComment(@Args('id') id: string) {
    return this.commentsService.remove(id);
  }
}
