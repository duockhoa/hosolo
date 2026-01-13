import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/passports/jwt.strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtStrategy],
  imports: [],
  exports: [UsersService],
})
export class UsersModule {}
