import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as Bcrypt from 'bcryptjs';

import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { TranslationService } from 'App/core';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'App/users/users.service';
import { User } from 'App/users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const user = await this.userService.findUserByEmail(registerUserDto.email);

    if (user) throw new ConflictException(TranslationService.translate('exception.USER_ALREADY_EXIST'));

    const newUser = await this.userService.createUser(registerUserDto);

    const tokens = await this.getTokens(newUser.id);

    return {
      data: newUser,
      ...tokens,
    };
  }

  async login(user: User): Promise<LoginResponseDto> {
    const tokens = await this.getTokens(user.id);

    return { user, tokens };
  }

  /**
   * @description Validate user email & password
   * @param UserCredentialDto user login credential
   * @returns User | null return either valid user or null
   */
  async validateUserCredentials({ email, password }: LoginDto): Promise<User | null> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) return null;

    const isPasswordValid = await Bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }

  async getTokens(userId: number): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_DURATION'),
    });

    return {
      access_token: accessToken,
    };
  }
}
