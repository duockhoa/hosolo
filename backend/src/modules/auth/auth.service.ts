import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService , private readonly jwtService: JwtService) {}
    async login(user: any) {
        const payload = {
            username: user.username,
            sub: user.id,
        }
        return {
            accessToken: this.jwtService.sign(payload),
        }

    }
}
