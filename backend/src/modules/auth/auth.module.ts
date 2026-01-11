import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../passports/local.strategy';
import { JwtStrategy } from '../../passports/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [UsersModule, PassportModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET as string,
    signOptions: { expiresIn : process.env.JWT_EXPIRES_IN as any  },
  })]
})
export class AuthModule {}
