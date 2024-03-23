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

  async createUser(body: CreateUserDto) {
    if (!body || !body.password || !body.login) {
      throw new BadRequestException();
    }
    const userData: User = {
      id: v4(),
      login: body.login,
      password: body.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const user = this.dataSource.manager.create(UserEntity, userData);
    await this.dataSource.manager.save(UserEntity, user);
    const { id: _id, login, version, createdAt, updatedAt } = user;
    return { id: _id, login, version, createdAt, updatedAt }; 
  }

  async updateUser(id: string, body: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    if (!body || !body.oldPassword || !body.newPassword) {
      throw new BadRequestException();
    }
    const user = await this.dataSource.manager.findOne(UserEntity, {
      select: ['id', 'login', 'password', 'version', 'createdAt', 'updatedAt'], 
      where: {id}
    })
   
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password == body.oldPassword) {
      user.password = body.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
    } else {
      throw new ForbiddenException();
    }
    await this.dataSource.manager.save(UserEntity, user);
    const { id: _id, login, version, createdAt, updatedAt } = user;
    return { id: _id, login, version, createdAt, updatedAt };
  }

  async deleteUser(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const deleteResult = await this.dataSource.manager.delete(UserEntity, {
      id
    })
    if(deleteResult.affected == 0) {
      throw new NotFoundException();
    }
    return {};
  }
}
