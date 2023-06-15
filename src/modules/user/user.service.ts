import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma';

@Injectable()
export class UserService {
  constructor(private prisam: PrismaService) {}

  /**
   * CREATE
   */

  async createUser(props: Prisma.UserCreateInput): Promise<User> {
    // TODO: need to add logic to check if you are a registered user.

    return this.prisam.user.create({
      data: props,
    });
  }

  /**
   * READ
   */

  async findUser(props: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisam.user.findUnique({
      where: props,
    });
  }

  /**
   * UPDATE
   */

  async updateUser(props: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = props;

    return this.prisam.user.update({
      where,
      data,
    });
  }

  /**
   * DELETE
   */

  async deleteUser(props: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisam.user.delete({
      where: props,
    });
  }
}
