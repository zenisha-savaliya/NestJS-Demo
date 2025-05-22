import { Injectable } from '@nestjs/common';
import { UserDTO } from './user-DTO';
import { CreateUserDTO } from './create-user-dto';

@Injectable()
export class UserService {
  private users: UserDTO[] = [];
  private idCounter = 1;

  create(createUserDto: CreateUserDTO): UserDTO {
    const newUser = { id: this.idCounter++, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): UserDTO[] {
    return this.users;
  }

  findOne(id: number): UserDTO {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: CreateUserDTO): UserDTO {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      this.users[userIndex] = { id, ...updateUserDto };
      return this.users[userIndex];
    }
    throw new Error(`User with id ${id} not found`);
  }

  remove(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
