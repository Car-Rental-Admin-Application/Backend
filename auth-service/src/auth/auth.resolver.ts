import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const admin = await this.authService.validateUser(username, password);
    if (!admin) throw new Error('Invalid credentials');
    return (await this.authService.login(admin)).access_token;
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async createAdmin(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    await this.authService.createAdmin(username, password);
    return 'Admin created';
  }

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  async protectedQuery() {
    return 'This is protected data';
  }
}