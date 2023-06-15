import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

class EmailWithPassword {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

/**
 * SignIn
 */
export class SignInRequestBody extends EmailWithPassword {}

export class SignInResponseBody {
  @ApiProperty()
  access_token: string;
}

/**
 * SignUp
 */
export class SignUpRequestBody extends EmailWithPassword {}
