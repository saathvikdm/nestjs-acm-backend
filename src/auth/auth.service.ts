import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationProvider } from './auth';
import { GoogleAuthData } from './dto/google-auth-data.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async googleLogin(
    googleAuthData: GoogleAuthData,
  ): Promise<{ user: User; accessToken: string }> {
    const { googleId } = googleAuthData;
    console.log('From signIn function');
    const user = await this.usersRepository.findOne({ googleId: googleId });
    console.log('user object from signIn');
    console.log(user);

    const accessToken: string = await this.jwtService.sign({ id: user.id });
    console.log(accessToken);

    if (!user) {
      await this.usersRepository.createUser(googleAuthData);
    }

    return { user, accessToken };
  }

  async findUser(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ googleId: id });
  }
}
