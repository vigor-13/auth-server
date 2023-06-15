import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import * as DTO from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Local User Validation
   */
  private async validateLocalUser(
    props: DTO.SignInRequestBody,
  ): Promise<User | null> {
    const user = await this.userService.findUser({
      email: props.email,
    });

    if (!user || user.password !== props.password) {
      throw new UnauthorizedException();
    }

    if (user && user.password === props.password) {
      delete user.password;
      return user;
    }

    return null;
  }

  /**
   * Signin Local User
   */
  async signIn(props: DTO.SignInRequestBody): Promise<any> {
    const user = await this.validateLocalUser(props);

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
  async signUp(props: DTO.SignUpRequestBody): Promise<any> {
    const newUser = await this.userService.createUser({
      email: props.email,
      password: props.password,
    });

    return null;
  }
}
