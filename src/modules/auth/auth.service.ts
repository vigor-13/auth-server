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
   * Local user validation
   */
  private async _validateLocalUser(
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
   * Signin local user
   */
  async signIn(props: DTO.SignInRequestBody): Promise<any> {
    const user = await this._validateLocalUser(props);

    return {
      access_token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
