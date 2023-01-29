import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';
import { loginInput, RefreshTokenResponse, signupInput } from './dto';
import { GetCurrentUser, GetCurrentUserId, Public, RtGuard } from 'src/common';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse)
  signup(@Args('signupInput') signupInput: signupInput) {
    return this.authService.signup(signupInput);
  }

  @Public()
  @Mutation(() => AuthResponse)
  login(@Args('loginInput') loginInput: loginInput) {
    return this.authService.login(loginInput);
  }

  @Public()
  @UseGuards(RtGuard)
  @Query(() => RefreshTokenResponse)
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Query(() => Boolean)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }
}
