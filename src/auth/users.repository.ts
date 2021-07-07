import { EntityRepository, Repository } from 'typeorm';
import { GoogleAuthData } from './dto/google-auth-data.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signIn(googleAuthData: GoogleAuthData, done): Promise<User> {
    const { googleId } = googleAuthData;

    const user = await this.findOne({ googleId: googleId });
    if (user) {
      done(null, user);
      return user;
    }
    return this.createUser(googleAuthData, done);
  }

  async createUser(googleAuthData: GoogleAuthData, done): Promise<User> {
    const { googleId, firstName, lastName, picture, accessToken } =
      googleAuthData;
    const user = this.create({
      googleId,
      firstName,
      lastName,
      picture,
    });

    try {
      await this.save(user);
      done(null, user);
      return user;
    } catch (error) {
      console.log(error.code);
    }
  }
}
