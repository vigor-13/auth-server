import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
