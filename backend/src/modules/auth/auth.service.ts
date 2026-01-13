import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '70d',
    });
    await this.prisma.tokens.create({
      data: {
        user_id: user.id,
        refreshToken: refreshToken,
      },
    });
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      refreshToken,
    };
  }
}
