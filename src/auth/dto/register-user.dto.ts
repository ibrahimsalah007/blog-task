import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'App/users/dto/create-user.dto';

import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class RegisterUserDto extends CreateUserDto {
  email: string;
}
