import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { GoogleAuthData } from './dto/google-auth-data.dto';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }
  async validate(token, refreshToken, profile, done): Promise<any> {
    console.log('from strategy');
    console.log(profile);
    const { name, photos, id } = profile;
    const user: GoogleAuthData = {
      googleId: id,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };
    return this.authService.googleLogin(user);
  }
}
