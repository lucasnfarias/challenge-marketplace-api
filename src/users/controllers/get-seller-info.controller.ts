import { CurrentUser } from '@/auth/current-user-decorator';
import { UserPayload } from '@/auth/jwt.strategy';
import { GetUserInfoUseCase } from '@/users/use-cases/get-user-info';
import { Controller, Get } from '@nestjs/common';

@Controller('/sellers/me')
export class GetSellerInfoController {
  constructor(private getUserInfoUseCase: GetUserInfoUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    return this.getUserInfoUseCase.execute({
      id: user.sub,
    });
  }
}
