import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthenticationProvider } from '../auth';
import { User } from '../user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
  ) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err: Error, user: User) => void) {
    const userDB = await this.authService.findUser(user.googleId);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
