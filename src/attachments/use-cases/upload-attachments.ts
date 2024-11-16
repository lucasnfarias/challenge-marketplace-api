import { InvalidAttachmentTypeError } from '@/attachments/use-cases/errors/invalid-attachment-type-error';
import { PrismaAttachmentsRepository } from '@/database/prisma/repositories/prisma-attachments.repository';
import { Uploader } from '@/storage/r2-storage';
import { Injectable } from '@nestjs/common';
import { Attachment } from '@prisma/client';

interface UploadAttachmentUseCaseRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}

interface UploadAttachmentUseCaseResponse {
  attachment: Attachment;
}

@Injectable()
export class UploadAttachmentUseCase {
  constructor(
    private attachmentRepository: PrismaAttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAttachmentUseCaseRequest): Promise<UploadAttachmentUseCaseResponse> {
    if (!/^(image\/(jpeg|jpg|png))$|^application\/pdf$/.test(fileType)) {
      throw new InvalidAttachmentTypeError(fileType);
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    });

    const attachment = await this.attachmentRepository.create({
      url,
    });

    return { attachment };
  }
}
