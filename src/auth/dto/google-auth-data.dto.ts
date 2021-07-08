import { IsOptional } from 'class-validator';

export class GoogleAuthData {
  googleId: string;

  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  picture: string;
}
