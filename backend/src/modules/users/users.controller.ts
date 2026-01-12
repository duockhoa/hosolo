import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

@Controller('users')
@UsePipes(
  new ValidationPipe({
    transform: true,
  }),
)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
}
