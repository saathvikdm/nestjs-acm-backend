import { Controller, Get, Req, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req: Request): Promise<void> {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req): Promise<{ user: User; accessToken: string }> {
    return req.user;
  }

  @UseGuards(AuthGuard())
  @Get('/google/test')
  getUserById(@Req() req) {
    console.log(req.user);
  }
}
