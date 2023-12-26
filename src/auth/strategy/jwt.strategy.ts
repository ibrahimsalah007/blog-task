import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload } from '../interface/token-payload.interface';
import { UsersService } from 'App/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /**
   * @description Validate user existence
   * @param TokenPayload
   */
  async validate({ id }: TokenPayload) {
    const user = await this.userService.findUserById(id);

    return user;
  }
}
