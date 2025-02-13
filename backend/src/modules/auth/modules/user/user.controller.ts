import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/decorators/get-user/get-user.decorator';
import { UserPayloadI } from 'src/types/user.type';

@Controller('auth/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  getInfoUser(@GetUser() user: UserPayloadI) {
    return this.userService.getInfoUser(user);
  }

  @Get('find-username-available')
  findUsernameAvailable(@Query('username') username: string) {
    return this.userService.findUsernameAvailable(username);
  }
}
