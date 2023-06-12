import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@utils';
import { AuthService } from './auth.service';
import * as DTO from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: 'Basic login API with email, password.',
  })
  @ApiResponse({
    status: 200,
    description: 'login success.',
    type: DTO.SignInResponse,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() props: DTO.SignInRequestBody) {
    return this.authService.signIn({
      email: props.email,
      password: props.password,
    });
  }
}
