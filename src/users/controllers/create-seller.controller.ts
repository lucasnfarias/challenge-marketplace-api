import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { CreateUserUseCase } from '@/users/use-cases/create-user';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';

const createSellerBodySchema = z.object({
  phone: z.string(),
  email: z.string().email(),
  avatarId: z.string().uuid().optional().nullable(),
  password: z.string(),
  passwordConfirmation: z.string(),
});

type CreateSellerBodySchema = z.infer<typeof createSellerBodySchema>;

@Controller('/sellers')
export class CreateSellerController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createSellerBodySchema))
  async handle(@Body() body: CreateSellerBodySchema) {
    const { email, phone, password, passwordConfirmation, avatarId } = body;

    return this.createUserUseCase.execute({
      email,
      phone,
      password,
      passwordConfirmation,
      avatarId,
    });
  }
}
