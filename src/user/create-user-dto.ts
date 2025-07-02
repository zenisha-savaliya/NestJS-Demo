import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDTO {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(6)
  password: string;
}
