import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import * as DTO from './auth.dto';
import { Public } from '@utils';

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
  @ApiBody({
    schema: {
      properties: {
        email: {
          type: 'string',
          example: 'admin@gmail.com',
        },
        password: {
          type: 'string',
          example: '1234',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: DTO.SignInResponseBody,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() props: DTO.SignInRequestBody) {
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
  signUp(@Body() props: DTO.SignUpRequestBody) {
    return this.authService.signUp(props);
  }
}
