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
import { Role } from 'src/modul.exports/roles.decorator';
import { Roles } from 'src/modul.exports/Roles';
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(() => UserMessage)
export class UserMessageResolver {
  constructor(private readonly userMessageService: UserMessageService) {}

  @Subscription(() => UserMessage)
  sendMessageNotification() {
    return pubSub.asyncIterator('sendMessageNotification');
  }

  @Mutation(() => UserMessage)
  createUserMessage(
    @Args('createUserMessageInput')
    createUserMessageInput: CreateUserMessageInput,
  ): Promise<UserMessage> {
    pubSub.publish('sendMessageNotification', createUserMessageInput); // علشان اعمل emit لايفنت معين موجود في clint side
    return this.userMessageService.create(createUserMessageInput);
  }

  @Mutation(() => [UserMessage], { name: 'findAllUserMessage' })
  findAllUserMessage(
    @Args('MyMessagesWithUser')
    MyMessagesWithUser: MyMessagesWithUser,
  ) {
    return this.userMessageService.findAll(MyMessagesWithUser);
  }

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

  @Mutation(() => Boolean)
  removeUserMessage(@Args('id') id: string): Promise<boolean> {
    return this.userMessageService.removeUserMessage(id);
  }
}
