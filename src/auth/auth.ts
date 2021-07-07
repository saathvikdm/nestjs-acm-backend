import { GoogleAuthData } from './dto/google-auth-data.dto';

export interface AuthenticationProvider {
  googleLogin(user: GoogleAuthData, done);
  findUser(id: string);
}
