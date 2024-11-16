import { UploadAttachmentsController } from '@/attachments/controllers/upload-attachments.controller';
import { UploadAttachmentUseCase } from '@/attachments/use-cases/upload-attachments';
import { DatabaseModule } from '@/database/database.module';
import { StorageModule } from '@/storage/storage.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, StorageModule],
  providers: [UploadAttachmentUseCase],
  controllers: [UploadAttachmentsController],
})
export class AttachmentsModule {}
