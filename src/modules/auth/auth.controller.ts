import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import * as DTO from './auth.dto';
import { Public } from '@commons';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * SignIn API
   */
  @ApiOperation({
    description: 'Basic signin API with email, password.',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: DTO.SignInResponseBodyDto,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() props: DTO.SignInRequestBodyDto) {
    return this.authService.signIn(props);
  }

  /**
   * SignUp API
   */
  @ApiOperation({
    description: 'Basic signup API with email, password',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: null,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  signUp(@Body() props: DTO.SignUpRequestBodyDto) {
    return this.authService.signUp(props);
  }
}
