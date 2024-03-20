import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersDBService } from './users-db.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersDBService],
})
export class UsersModule {}
