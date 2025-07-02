import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/user/user-DTO';
import { RegisterDto } from '../dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginResponse } from '../dto/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(UserDTO)
    private userRepository: Repository<UserDTO>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const { password, ...result } = user;
        return result;
      } else {
        console.log('Password does not match');
      }
    } else {
      console.log('No user found with this email');
    }
    return null;
  }

  login(user: Partial<UserDTO>): LoginResponse {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create new user with hashed password
    const user = this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      isActive: true,
    });

    // Save the user
    const savedUser = await this.userRepository.save(user);

    // Remove password from response
    const { password, ...result } = savedUser;

    // Generate token
    const token = this.jwtService.sign({
      email: savedUser.email,
      sub: savedUser.id,
    });
    return {
      user: result,
      access_token: token,
    };
  }
}
