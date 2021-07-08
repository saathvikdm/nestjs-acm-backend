import { EntityRepository, Repository } from 'typeorm';
import { GoogleAuthData } from './dto/google-auth-data.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signIn(googleAuthData: GoogleAuthData): Promise<User> {
    const { googleId } = googleAuthData;
    console.log('From signIn function');
    const user = await this.findOne({ googleId: googleId });

    if (!user) {
      this.createUser(googleAuthData);
    }

    return user;
  }

  async createUser(googleAuthData: GoogleAuthData): Promise<User> {
    const { googleId, firstName, lastName, picture } = googleAuthData;
    const user = this.create({
      googleId,
      firstName,
      lastName,
      picture,
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      console.log(error.code);
    }
  }
}
