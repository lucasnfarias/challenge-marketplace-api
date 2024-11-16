import { AuthService } from '@/auth/auth.service';
import { Public } from '@/auth/public';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { AuthenticateSellerUseCase } from '@/users/use-cases/authenticate-seller';
import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { z } from 'zod';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sellers/sessions')
@Public()
export class AuthenticateSellerController {
  constructor(
    private readonly authenticateSellerUseCase: AuthenticateSellerUseCase,
    private authService: AuthService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(
    @Body() body: AuthenticateBodySchema,
    @Res() response: Response,
  ) {
    const { email, password } = body;

    const { accessToken } = await this.authenticateSellerUseCase.execute({
      email,
      password,
    });

    this.authService.setJwtTokenToCookies(response, accessToken);

    return response.send({
      access_token: accessToken,
    });
  }
}
