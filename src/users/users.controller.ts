import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
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
  findOne(@Param('id', ParseIntPipe) id: number): user.User | string {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() newUser: user.User): user.User {
    return this.usersService.create(newUser);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUser: user.User,
  ): user.User | string {
    return this.usersService.update(id, { ...updatedUser, id });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): string {
    return this.usersService.delete(id);
  }
}
