import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as DTO from './auth.dto';
import { AuthUtilService } from './auth.util.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authUtilService: AuthUtilService,
  ) {}

  /**
   * Signin Local User
   */
  async signIn(props: DTO.SignInRequestBodyDto): Promise<any> {
    const user = await this.authUtilService.validateUserByPassword(props);

    return {
      access_token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }

  /**
   * Signup Local User
   */
  async signUp(props: DTO.SignUpRequestBodyDto): Promise<null> {
    await this.authUtilService.checkIsDuplicatedEmail(props.email);

    const hashedPassword = await this.authUtilService.passwordHashingByArgon2(
      props.password,
    );

    await this.userService.createUser({
      email: props.email,
      password: hashedPassword,
    });

    return null;
  }
}
