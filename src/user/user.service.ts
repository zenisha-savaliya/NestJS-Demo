import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from './user-DTO';
import { CreateUserDTO } from './create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDTO)
    private userRepository: Repository<UserDTO>,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<UserDTO> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<UserDTO | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    console.log(user);
    return user ?? undefined;
  }

  async updatePassword(id: number, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(id, { password: hashedPassword });
  }

  findAll(): Promise<UserDTO[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserDTO> {
    return this.userRepository.findOne({ where: { id } }).then((user) => {
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    });
  }

  async update(id: number, updateUserDto: CreateUserDTO): Promise<UserDTO> {
    await this.userRepository.update(id, updateUserDto);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
