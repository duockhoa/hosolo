import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '../../entities/users.entity'
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

@Controller('users')
@UsePipes(new ValidationPipe(
  {
    transform: true,
  }
))
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Users> {
    const user = await this.usersService.findById(id)
    if (!user) {
      throw new Error('User not found')
      
    }
    return user;
  }
  @Post()
  create(@Body() user: Users): Promise<Users> {
    return this.usersService.create(user);
  }

}
