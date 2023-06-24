import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as Argon2 from 'argon2';
import * as DTO from './auth.dto';
import { UserService } from '@modules/user';
import { User } from '@prisma/client';

@Injectable()
export class AuthUtilService {
  constructor(private userService: UserService) {}

  async passwordHashingByArgon2(password: string): Promise<string> {
    try {
      const hashedPassword = await Argon2.hash(password);
      return hashedPassword;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async passwordVerifyingByArgon2(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    try {
      const isVerifyedPassword = Argon2.verify(hashedPassword, password);
      return isVerifyedPassword;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateUserByPassword(
    props: DTO.SignInRequestBodyDto,
  ): Promise<User | null> {
    try {
      const user = await this.userService.findUser({
        email: props.email,
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const hashedPassword = user.password;
      const isVerifyedPassword = await this.passwordVerifyingByArgon2(
        hashedPassword,
        props.password,
      );

      if (!isVerifyedPassword) {
        throw new UnauthorizedException();
      }

      delete user.password;
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
