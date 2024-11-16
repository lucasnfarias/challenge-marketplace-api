import { UploadAttachmentUseCase } from '@/attachments/use-cases/upload-attachments';
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('/attachments')
export class UploadAttachmentsController {
  constructor(
    private readonly uploadAttachmentUseCase: UploadAttachmentUseCase,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async handle(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2MB
          }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const attachments = await Promise.all(
      files.map(async (file) => {
        const { attachment } = await this.uploadAttachmentUseCase.execute({
          fileName: file.originalname,
          fileType: file.mimetype,
          body: file.buffer,
        });

        return attachment;
      }),
    );

    return { attachments };
  }
}
