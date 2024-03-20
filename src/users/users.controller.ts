import { Controller, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import {
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { UsersDBService } from './users-db.service';

@Controller('user')
export class UsersController {
  usersService: UsersService | UsersDBService;
  constructor(private readonly usersLocalService: UsersService, private readonly usersDBService: UsersDBService) {
    this.usersService = usersLocalService;
  }

  @Get()
  @HttpCode(200)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() body: CreateUserDto) {
    return this.usersLocalService.createUser(body);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
    return this.usersLocalService.updateUser(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.usersLocalService.deleteUser(id);
  }
}
