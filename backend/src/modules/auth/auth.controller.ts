import { Controller, Get, Post, Body, UnauthorizedException, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/entities/users.entity';
import { UsersService } from '../users/users.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { jwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) { }
  @Post('/register')
  async register(@Body() user: Users) {
    return this.usersService.create(user)
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request: any) {

    return this.authService.login(request.user)
  }

  @UseGuards(jwtAuthGuard)
  @Get('/profile')
  async profile(@Request() request: any) {
    return request.user
  }



}
