import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';

@Injectable()
export class UsersService {
  getUsers() {
    return [];
  }

  getUser(id: string) {
    return {};
  }

  createUser(body: CreateUserDto) {
    return {};
  }

  updateUser(id: string, body: UpdatePasswordDto) {
    return {};
  }

  deleteUser(id: string) {
    return {};
  }
}
