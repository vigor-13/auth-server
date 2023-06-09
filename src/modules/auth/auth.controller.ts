import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import * as DTO from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: 'Basic login API with email, password.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() props: DTO.SignInDto) {
    return this.authService.signIn({
      email: props.email,
      password: props.password,
    });
  }
}
