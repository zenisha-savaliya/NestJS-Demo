import { Injectable } from '@nestjs/common';
import { UserDTO } from './user-DTO';
import { CreateUserDTO } from './create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDTO)
    private userRepository: Repository<UserDTO>,
  ) {}
  private users: UserDTO[] = [];
  private idCounter = 1;

  create(createUserDto: CreateUserDTO): Promise<UserDTO> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserDTO[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserDTO> {
    return this.userRepository.findOne({ where: { id } }).then((user) => {
      if (!user) {
        throw new Error(`User with id ${id} not found`);
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
