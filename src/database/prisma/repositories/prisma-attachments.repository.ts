import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Attachment, Prisma } from '@prisma/client';

@Injectable()
export class PrismaAttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Prisma.AttachmentUncheckedCreateInput) {
    return this.prisma.attachment.create({
      data: attachment,
    });
  }

  async update(attachment: Attachment) {
    return this.prisma.attachment.update({
      where: {
        id: attachment.id,
      },
      data: attachment,
    });
  }

  async findById(id: string) {
    const attachment = this.prisma.attachment.findUnique({
      where: {
        id,
      },
    });

    if (!attachment) return null;

    return attachment;
  }
}
