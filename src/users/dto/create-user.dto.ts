import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @ApiProperty()
  @MinLength(2, { message: i18nValidationMessage('validation.MIN_LENGTH') })
  @IsString({
    message: i18nValidationMessage('validation.IS_STRING'),
  })
  name: string;

  @ApiProperty()
  @IsString({
    message: i18nValidationMessage('validation.IS_STRING'),
  })
  password: string;

  @ApiProperty()
  @IsEmail(
    {},
    {
      message: i18nValidationMessage('validation.IS_EMAIL'),
    },
  )
  email: string;
}
