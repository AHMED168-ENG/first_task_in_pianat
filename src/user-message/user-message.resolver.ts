import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { UserMessageService } from './user-message.service';
import { UserMessage } from './model/user-message.model';
import { CreateUserMessageInput } from './dto/create-user-message.input';
import { UpdateUserMessageInput } from './dto/update-user-message.input';
import { MyMessagesWithUser } from './dto/MyMessagesWithUser';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/guard/jwt_guard';
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();

@Resolver(() => UserMessage)
export class UserMessageResolver {
  constructor(private readonly userMessageService: UserMessageService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserMessage)
  async createUserMessage(
    @Args('createUserMessageInput')
    createUserMessageInput: CreateUserMessageInput,
  ): Promise<UserMessage> {
    var message = await this.userMessageService.create(createUserMessageInput);
    pubSub.publish('sendMessageNotification', message); // علشان اعمل emit لايفنت معين موجود في clint side
    return message;
  }

  @Subscription((returns) => UserMessage, {
    resolve: (value) => value,
    filter: (payload, vatiabols) => payload.to === vatiabols.frindId,
  })
  sendMessageNotification(@Args('frindId') frindId: string) {
    return pubSub.asyncIterator('sendMessageNotification');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [UserMessage], { name: 'findAllUserMessage' })
  findAllUserMessage(
    @Args('MyMessagesWithUser')
    MyMessagesWithUser: MyMessagesWithUser,
  ) {
    return this.userMessageService.findAll(MyMessagesWithUser);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  updateUserMessage(
    @Args('id') id: string,
    @Args('updateUserMessageInput')
    updateUserMessageInput: UpdateUserMessageInput,
  ): Promise<boolean> {
    return this.userMessageService.updateUserMessage(
      id,
      updateUserMessageInput,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeUserMessage(@Args('id') id: string): Promise<boolean> {
    return this.userMessageService.removeUserMessage(id);
  }
}
