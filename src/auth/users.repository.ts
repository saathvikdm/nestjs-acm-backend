import { EntityRepository, Repository } from 'typeorm';
import { GoogleAuthData } from './dto/google-auth-data.dto';
import { UserDataDto } from './dto/user-data.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signIn(googleAuthData: GoogleAuthData): Promise<User> {
    const { googleId } = googleAuthData;
    // console.log('From signIn function');
    const user = await this.findOne({ googleId: googleId });

    if (!user) {
      this.createUser(googleAuthData);
    }

    return user;
  }

  async createUser(googleAuthData: GoogleAuthData): Promise<UserDataDto> {
    const { googleId, firstName, lastName, picture } = googleAuthData;
    const user = this.create({
      googleId,
      firstName,
      lastName,
      picture,
    });

    try {
      await this.save(user);
      const { id, firstName, lastName, picture } = user;
      return { id, firstName, lastName, picture };
    } catch (error) {
      console.log(error.code);
    }
  }
}
