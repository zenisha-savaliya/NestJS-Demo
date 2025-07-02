import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString({ message: 'Password must be a string' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
