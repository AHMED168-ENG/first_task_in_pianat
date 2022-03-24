import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Roles } from 'src/modul.exports/Roles';
import { Role } from 'src/modul.exports/roles.decorator';
import { GqlAuthGuard } from 'src/user/guard/jwt_guard';
import { ConversationService } from './conversation.service';
import { CreateConversationInput } from './dto/create-conversation.input';
import { ConversationModel } from './model/conversation.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => ConversationModel)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Mutation((returns) => Boolean)
  createConversation(
    @Args('createConversationInput')
    createConversationInput: CreateConversationInput,
  ): Promise<boolean> {
    return this.conversationService.create(createConversationInput);
  }

  @Mutation(() => [ConversationModel])
  findAllConversationWithUserWithLastMessage(
    @Args('From') From: string,
  ): Promise<ConversationModel[]> {
    return this.conversationService.findAllConversationWithUserWithLastMessage(
      From,
    );
  }

  @Mutation(() => ConversationModel)
  removeConversation(@Args('id') id: string) {
    return this.conversationService.remove(id);
  }
}
