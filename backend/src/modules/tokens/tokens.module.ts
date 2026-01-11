import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from 'src/entities/token.entity';

@Module({
  controllers: [TokensController],
  providers: [TokensService],
  imports: [TypeOrmModule.forFeature([Tokens])],
})
export class TokensModule { }
