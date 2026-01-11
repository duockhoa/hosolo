import { Controller } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { Tokens } from 'src/entities/token.entity';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {

  }
}
