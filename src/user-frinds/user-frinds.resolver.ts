import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserFrindsService } from './user-frinds.service';
import { UserFrind } from './models/user-frind.model';
import { operation_Frindes } from './dto/operation_Frindes.input';
import { User } from 'src/user/model/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/guard/jwt_guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => UserFrind)
export class UserFrindsResolver {
  constructor(private readonly userFrindsService: UserFrindsService) {}

  @Query(() => [User], { name: 'findAllFrindes' })
  findAllFrindes(@Args('userId') userId: string) {
    return this.userFrindsService.findAllFrindes(userId);
  }

  @Query(() => UserFrind, { name: 'userFrind' })
  findOne(@Args('userId') userId: string) {
    return this.userFrindsService.findOne(userId);
  }
}
