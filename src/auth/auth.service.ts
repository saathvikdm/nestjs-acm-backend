import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationProvider } from './auth';
import { GoogleAuthData } from './dto/google-auth-data.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async googleLogin(user: GoogleAuthData, done) {
    return this.usersRepository.signIn(user, done);
  }

  async findUser(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ googleId: id });
  }
}
