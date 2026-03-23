import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as user from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): user.User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): user.User | undefined {
    const userId = parseInt(id, 10);
    return this.usersService.findOne(userId);
  }

  @Post()
  create(@Body() newUser: user.User): user.User {
    return this.usersService.create(newUser);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedUser: user.User,
  ): user.User | undefined {
    const userId = parseInt(id, 10);
    return this.usersService.update(userId, { ...updatedUser, id: userId });
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    const userId = parseInt(id, 10);
    return this.usersService.delete(userId);
  }
}
