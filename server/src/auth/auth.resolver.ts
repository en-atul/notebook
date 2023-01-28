import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';
import { loginInput, signupInput } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  signup(@Args('signupInput') signupInput: signupInput) {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse)
  login(@Args('loginInput') loginInput: loginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => Boolean)
  logout(@Args('logout') userId: string) {
    return this.authService.logout(userId);
  }

  
}
