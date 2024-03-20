import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { User } from './user';
import { v4, validate } from 'uuid';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';


@Injectable()
export class UsersDBService {
  constructor(private dataSource: DataSource) {}
  async getUsers() {
    return this.dataSource.manager.find(UserEntity, {
      select: ['id', 'login', 'version', 'createdAt', 'updatedAt']
    })
  }

  async getUser(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const user = await this.dataSource.manager.findOne(UserEntity, {
      select: ['id', 'login', 'version', 'createdAt', 'updatedAt'], 
      where: {id}
    })
    if (!user) {
      throw new NotFoundException();
    }
   return user;
  }

  // createUser(body: CreateUserDto) {
  //   if (!body || !body.password || !body.login) {
  //     throw new BadRequestException();
  //   }
  //   const user: User = {
  //     id: v4(),
  //     login: body.login,
  //     password: body.password,
  //     version: 1,
  //     createdAt: Date.now(),
  //     updatedAt: Date.now(),
  //   };
  //   users.push(user);
  //   const { id: _id, login, version, createdAt, updatedAt } = user;
  //   return { id: _id, login, version, createdAt, updatedAt };
  // }

  // updateUser(id: string, body: UpdatePasswordDto) {
  //   if (!validate(id)) {
  //     throw new BadRequestException();
  //   }
  //   if (!body || !body.oldPassword || !body.newPassword) {
  //     throw new BadRequestException();
  //   }
  //   const userIndex = users.findIndex((user) => user.id == id);
  //   const user = users[userIndex];
  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   if (user.password == body.oldPassword) {
  //     user.password = body.newPassword;
  //     user.version += 1;
  //     user.updatedAt = Date.now();
  //   } else {
  //     throw new ForbiddenException();
  //   }
  //   const { id: _id, login, version, createdAt, updatedAt } = user;
  //   return { id: _id, login, version, createdAt, updatedAt };
  // }

  // deleteUser(id: string) {
  //   if (!validate(id)) {
  //     throw new BadRequestException();
  //   }
  //   const userIndex = users.findIndex((user) => user.id == id);
  //   const user = users[userIndex];
  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   users.splice(userIndex, 1);
  //   return {};
  // }
}
