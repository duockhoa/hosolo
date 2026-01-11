import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokens } from 'src/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokensService {
    constructor(@InjectRepository(Tokens) private tokensRepository: Repository<Tokens>) { }
}
