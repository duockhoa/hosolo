import { Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareSync, hash } from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) { }
    findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }
    findById(id: number): Promise<Users | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    findByUsername(username: string): Promise<Users | null> {
        return this.usersRepository.findOne({ where: { username } });
    }


    async create(user: Users): Promise<Users> {
        const newUser = this.usersRepository.create(user);
        newUser.createdAt = new Date();
        newUser.updatedAt = new Date();
        newUser.password = await hash(user.password, 10);
        return this.usersRepository.save(newUser);
    }

    async validateUser(username: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { username } })
        if (!user) {
            throw new Error('User not found')
        }
        const isMatch = await compareSync(password, user.password)
        if (!isMatch) {
            throw new Error('Invalid password')
        }
        return user

    }

}
