import { Injectable } from '@nestjs/common';
import { compareSync, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.users.findMany();
  }

  findById(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  validateUser(email: string, password: string) {
    return null;
  }
}
