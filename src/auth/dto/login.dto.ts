import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @ApiProperty({ description: 'Identifier is a representation for user phone number or email' })
  @IsEmail(
    {},
    {
      message: i18nValidationMessage('validation.IS_EMAIL'),
    },
  )
  @IsNotEmpty({
    message: i18nValidationMessage('validation.IS_REQUIRED'),
  })
  @IsDefined({
    message: i18nValidationMessage('validation.IS_REQUIRED'),
  })
  email: string;

  @ApiProperty()
  @IsString({
    message: i18nValidationMessage('validation.IS_STRING'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.IS_REQUIRED'),
  })
  @IsDefined({
    message: i18nValidationMessage('validation.IS_REQUIRED'),
  })
  password: string;
}
