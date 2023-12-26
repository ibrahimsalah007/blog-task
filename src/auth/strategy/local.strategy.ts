import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { TranslationService } from 'App/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * @description Validate user existence
   * @param email user unique email
   * @param password plain text password
   */
  async validate(email: string, password: string) {
    const user = await this.authService.validateUserCredentials({ email, password });

    if (!user) throw new BadRequestException(TranslationService.translate('exception.INVALID_CREDENTIALS'));

    return user;
  }
}
