import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(props: { email: string; password: string }): Promise<any> {
    const { email, password } = props;

    const user = await this.userService.findUser({
      email,
    });

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(jwtPayload),
    };
  }
}
