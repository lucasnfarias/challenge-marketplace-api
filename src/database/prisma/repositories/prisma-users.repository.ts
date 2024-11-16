import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({
      data: user,
    });
  }

  async update(user: User) {
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }

  async findByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return user;
  }
}
