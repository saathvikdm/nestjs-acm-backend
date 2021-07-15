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
  async validate(token, refreshToken, profile, cb): Promise<any> {
    const { name, photos, id } = profile;
    const userData: GoogleAuthData = {
      googleId: id,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };
    try {
      const jwt = await this.authService.googleLogin(userData);
      cb(null, jwt);
    } catch (err) {
      console.log('ERROR', err);
      cb(err, null);
    }
  }
}
