import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationProvider } from './auth';
import { GoogleAuthData } from './dto/google-auth-data.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { UserDataDto } from './dto/user-data.dto';
@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async googleLogin(
    googleAuthData: GoogleAuthData,
  ): Promise<{ user: UserDataDto; accessToken: string }> {
    const { googleId } = googleAuthData;

    let user = await this.findUser(googleId);

    if (!user) {
      user = await this.usersRepository.createUser(googleAuthData);
    }

    const accessToken: string = await this.jwtService.sign({ id: user.id });
    // console.log(accessToken);

    return { user, accessToken };
  }

  async findUser(googleId: string): Promise<any | undefined> {
    try {
      const { id, firstName, lastName, picture } =
        await this.usersRepository.findOne({ googleId: googleId });
      return { id, firstName, lastName, picture };
    } catch (err) {
      return null;
    }
  }
}
