import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './model/user.model';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from './guard/jwt_guard';
import { Roles } from 'modul.exports/Roles';
import { checkingInterseptor } from 'src/guarde.test';
import { Role } from 'modul.exports/roles.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Role(Roles.Admin)
  @Mutation(() => User, { name: 'createUser' })
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'findAllUser' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'findUser' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Query(() => User, { name: 'findUserByEmail' })
  findOneByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  @UseGuards(GqlAuthGuard)
  @Role(Roles.Admin)
  @Mutation(() => Boolean, { name: 'updateUser' })
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('id', { type: () => String }) id: number,
  ): Promise<boolean> {
    return this.userService.update(id, updateUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Role(Roles.Admin)
  @Mutation(() => Boolean, { name: 'removeUser' })
  removeUser(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.userService.remove(id);
  }

  @Mutation(() => String, { name: 'activeUser' })
  activeUser(@Args('id', { type: () => String }) id: string): Promise<string> {
    return this.userService.activeUser(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'mackUserAdmin' })
  mackUserAdmin(
    @Args('id', { type: () => String }) id: string,
  ): Promise<boolean> {
    return this.userService.mackUserAdmin(id);
  }
}
