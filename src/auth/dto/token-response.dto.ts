import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from '../types';

export class TokenResponseDto {
  @ApiProperty()
  tokens: Tokens;
}
