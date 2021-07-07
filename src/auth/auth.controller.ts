import { Controller, Get, Req, UseGuards, Inject } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { AuthenticationProvider } from './auth';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
  ) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req): Promise<User> {
    return req.user;
  }
}
