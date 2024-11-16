import { BadRequestException } from '@nestjs/common';

export class PasswordConfirmationNotMatchedError extends BadRequestException {
  constructor() {
    super('Password confirmation does not match password.');
  }
}
