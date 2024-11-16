import { PrismaService } from '@/database/prisma/prisma.service';
import { PrismaAttachmentsRepository } from '@/database/prisma/repositories/prisma-attachments.repository';
import { PrismaUsersRepository } from '@/database/prisma/repositories/prisma-users.repository';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    PrismaService,
    PrismaUsersRepository,
    PrismaAttachmentsRepository,
  ],
  exports: [PrismaService, PrismaUsersRepository, PrismaAttachmentsRepository],
})
export class DatabaseModule {}
