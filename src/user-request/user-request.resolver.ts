import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { UserRequestService } from './user-request.service';
import { UserRequest } from './models/user-request.model';
import { operation_request_input } from './dto/operation-request.input';
import { User } from 'src/user/model/user.model';
import { GqlAuthGuard } from 'src/user/guard/jwt_guard';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { query } from 'express';
const pobSup = new PubSub();
@Resolver(() => UserRequest)
export class UserRequestResolver {
  constructor(private readonly userRequestService: UserRequestService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async requestOperation(
    @Args('createUserRequestInput')
    createUserRequestInput: operation_request_input,
  ): Promise<string> {
    var result = this.userRequestService.requestOperation(
      createUserRequestInput,
    );
    if ((await result) == 'R_Added') {
      pobSup.publish('addRequest', createUserRequestInput.to);
    }
    console.log(result);
    if ((await result) == 'R_Removed') {
      pobSup.publish('removeRequest', createUserRequestInput.to);
    }
    if ((await result) == 'F_Removed') {
      pobSup.publish('removeFrind', createUserRequestInput.to);
    }
    return result;
  }

  @Subscription((returns) => String, {
    resolve: (value) => value,
    filter: (payload, variabels) => payload == variabels.frindId,
  })
  addRequest(@Args('frindId') frindId: string) {
    return pobSup.asyncIterator('addRequest');
  }

  @Subscription((returns) => String, {
    resolve: (value) => value,
    filter: (payload, variabels) => payload == variabels.frindId,
  })
  removeRequest(@Args('frindId') frindId: string) {
    return pobSup.asyncIterator('removeRequest');
  }

  @Subscription((returns) => String, {
    resolve: (value) => value,
    filter: (payload, variabels) => payload == variabels.frindId,
  })
  removeFrind(@Args('frindId') frindId: string) {
    return pobSup.asyncIterator('removeFrind');
  }

  @Subscription((returns) => String, {
    resolve: (value) => value,
    filter: (payload, variabels) => payload == variabels.frindId,
  })
  frindAdded(@Args('frindId') frindId: string) {
    return pobSup.asyncIterator('frindAdded');
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'findrequestThatSeen' })
  findrequestThatSeen(@Args('to') to: string) {
    return this.userRequestService.findrequestThatNotSeen(to);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'findrequestUsers' })
  findrequestUsers(@Args('to') to: string) {
    return this.userRequestService.findrequestUsers(to);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserRequest, { name: 'userRequest' })
  findOne(@Args('id') id: string) {
    return this.userRequestService.findRequest(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  acceptRequest(
    @Args('operation_Frindes') operation_Frindes: operation_request_input,
  ): Promise<string> {
    pobSup.publish('frindAdded', operation_Frindes.to);
    return this.userRequestService.acceptRequest(operation_Frindes);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  changeSeenRequest(@Args('to') to: string): Promise<string> {
    return this.userRequestService.changeSeenRequest(to);
  }
}
