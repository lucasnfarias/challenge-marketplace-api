import { BadRequestException } from '@nestjs/common';

export class InvalidAttachmentTypeError extends BadRequestException {
  constructor(identifier: string) {
    super(`Attachment type "${identifier}" is not valid.`);
  }
}
