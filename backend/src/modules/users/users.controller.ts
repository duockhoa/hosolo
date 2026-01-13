import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { jwtAuthGuard } from 'src/guards/jwt-auth.guard';

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
  @UseGuards(jwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    if (!user) {
      throw new HttpException(
        'User could not be created',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const user = await this.usersService.deleteUser(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
