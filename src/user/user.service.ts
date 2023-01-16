import { Injectable } from "@nestjs/common";
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async activateUser(id: number): Promise<User> {
    return await this.updateUser({
      where: {
        id
      },
      data: {
        deactivated: false
      }
    })
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.password_hash = await bcrypt.hash(data.password_hash, 10)

    return this.prismaService.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id
      },
      data
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }

  async deleteUserById(id: number): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id
      }
    });
  }

  async usernameExists(username: string): Promise<Boolean> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username
      }
    });
    return Boolean(user);
  }

  async emailExists(email: string): Promise<Boolean> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email
      }
    });
    return Boolean(user);
  }

  async userIsAdmin(id: any): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { id }
    });
    return user.admin;
  }
}
