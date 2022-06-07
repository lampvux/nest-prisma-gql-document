import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';

import { SignUserInfo } from './sign-user-info';
import { UserData } from './user-data.decorator';
import { LoginCredential } from './login-credential';

@Resolver(SignUserInfo)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => SignUserInfo)
  async login(@Args() args: LoginCredential): Promise<SignUserInfo> {
    return this.authService.login(args);
  }

  @Query(() => SignUserInfo)
  @UseGuards(GqlAuthGuard)
  async userInfo(@UserData() userInfo: SignUserInfo): Promise<SignUserInfo> {
    return userInfo;
  }
}
