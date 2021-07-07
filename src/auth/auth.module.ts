import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { GoogleStrategy } from './google.strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
  exports: [GoogleStrategy],
})
export class AuthModule {}
