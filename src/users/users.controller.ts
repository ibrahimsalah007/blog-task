import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schema/user.schema';
import { CurrentUser } from 'App/users/decorator';
import { JwtAuthGuard } from 'App/auth/guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  @ApiResponse({ type: User })
  @Get()
  currentUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}
