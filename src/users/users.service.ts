import { BadRequestException, ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { User } from './user';
import {v4, validate} from 'uuid';

const users: Array<User> = [];

@Injectable()
export class UsersService {
  getUsers() {
    return users.map(user => {
      const {id, login, version, createdAt, updatedAt} = user;
      return {id, login, version, createdAt, updatedAt};
    })
  }

  getUser(id: string) {
    if(!validate(id)) {
      throw new BadRequestException();
    }
    const user = users.find(user => user.id == id);
    if(!user) {
      throw new NotFoundException();
    } 
    const {id: _id, login, version, createdAt, updatedAt} = user;
    return {id: _id, login, version, createdAt, updatedAt};
  }

  createUser(body: CreateUserDto) {
    if(!body || !body.password || !body.login) {
      throw new BadRequestException();
    }
    const user: User = {
      id: v4(),
      login: body.login,
      password: body.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    users.push(user);
    const {id: _id, login, version, createdAt, updatedAt} = user;
    return {id: _id, login, version, createdAt, updatedAt};
  }

  updateUser(id: string, body: UpdatePasswordDto) {
    if(!validate(id)) {
      throw new BadRequestException();
    }
    if(!body || !body.oldPassword || !body.newPassword) {
      throw new BadRequestException();
    }
    const userIndex = users.findIndex(user => user.id == id);
    const user = users[userIndex]; 
    if(!user) {
      throw new NotFoundException();
    } 
    if(user.password == body.oldPassword) {
      user.password = body.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
    } else {
      throw new ForbiddenException();
    }
    const {id: _id, login, version, createdAt, updatedAt} = user;
    return {id: _id, login, version, createdAt, updatedAt};
  }

  deleteUser(id: string) {
    if(!validate(id)) {
      throw new BadRequestException();
    }
    const userIndex = users.findIndex(user => user.id == id);
    const user = users[userIndex];
    if(!user) {
      throw new NotFoundException();
    } 
    users.splice(userIndex, 1);
    return {};
  }
}
