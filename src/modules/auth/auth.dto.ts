import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ResponseBodyWithoutDataDto } from '@commons';

class EmailWithPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

class SignInResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  access_token: string;
}

/**
 * SignIn
 */

export class SignInRequestBodyDto extends EmailWithPasswordDto {}

export class SignInResponseBodyDto extends ResponseBodyWithoutDataDto {
  @ApiProperty()
  data: SignInResponseDto;
}

/**
 * SignUp
 */

export class SignUpRequestBodyDto extends EmailWithPasswordDto {}
