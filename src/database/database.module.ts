import { PrismaService } from '@/database/prisma/prisma.service';
import { PrismaUsersRepository } from '@/database/prisma/repositories/prisma-users.repository';
import { Module } from '@nestjs/common';

@Module({
  providers: [PrismaService, PrismaUsersRepository],
  exports: [PrismaService, PrismaUsersRepository],
})
export class DatabaseModule {}
