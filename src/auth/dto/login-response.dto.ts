import { ApiProperty } from '@nestjs/swagger';

import { TokenResponseDto } from './token-response.dto';
import { User } from 'App/users/schema/user.schema';

export class LoginResponseDto extends TokenResponseDto {
  @ApiProperty()
  user: User;
}
