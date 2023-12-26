import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto';
import { CurrentUser } from 'App/users/decorator';
import { LocalAuthGuard } from './guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthEndPoints } from './auth.endpoints';
import { User } from 'App/users/schema/user.schema';

@ApiTags(AuthEndPoints.title)
@Controller(AuthEndPoints.root)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ type: LoginResponseDto })
  @Post(AuthEndPoints.register)
  async register(@Body() createUserDto: RegisterUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: LoginResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post(AuthEndPoints.login)
  async login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }
}
