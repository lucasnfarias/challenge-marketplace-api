import { Controller, Get } from '@nestjs/common';

@Controller('/users')
export class CreateUserController {
  constructor() {}

  @Get()
  createUser(): string {
    return 'Hello';
  }
}
