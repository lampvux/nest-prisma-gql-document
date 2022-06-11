import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PasswordService } from '../auth/password/password.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService,
  ) {}
  async create<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
  ): Promise<User> {
    return this.prisma.user.create<T>({
      ...args,
      data: {
        ...args.data,
        password: await this.passwordService.hash(args.data.password),
      },
    });
  }

  async findOne<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
  ): Promise<User | null> {
    return this.prisma.user.findUnique(args);
  }

  async update<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
  ): Promise<User> {
    return this.prisma.user.update<T>({
      ...args,
      data: {
        ...args.data,
        password:
          args.data.password &&
          (await this.passwordService.hash(args.data.password.toString())),
      },
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
