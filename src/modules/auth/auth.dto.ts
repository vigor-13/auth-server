import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInRequestBody {
  @ApiProperty({
    default: 'admin@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '1234',
  })
  @IsNotEmpty()
  password: string;
}

export class SignInResponseBody {
  @ApiProperty()
  access_token: string;
}
