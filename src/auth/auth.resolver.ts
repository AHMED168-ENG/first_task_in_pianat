import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { GqlAuthGuard } from 'src/user/guard/jwt_guard';
import { User } from 'src/user/model/user.model';
import { AuthService } from './auth.service';
import { ResetPassword } from './dto/resetPassword';
import { SignInUserInput } from './dto/SignInUserInput';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((type) => String, { name: 'signInUser' })
  signIn(
    @Args('signInUserInput') signInUserInput: SignInUserInput,
  ): Promise<string> {
    return this.authService.signIn(signInUserInput);
  }

  @Mutation(() => User, { name: 'signUpUser' })
  signUp(
    @Args('signUpUserInput') signUpUserInput: CreateUserInput,
  ): Promise<User> {
    return this.authService.signUp(signUpUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  resetPassword(
    @Args('resetPasswordInput') resetPassword: ResetPassword,
  ): Promise<boolean> {
    return this.authService.resetPassword(resetPassword);
  }
}
