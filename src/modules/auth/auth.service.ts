import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(props: { email: string; password: string }): Promise<any> {
    const { email, password } = props;

    const user = await this.userService.findUser({
      email,
    });

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return user;
  }
}
