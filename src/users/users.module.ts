import { AuthService } from '@/auth/auth.service';
import { CryptographyModule } from '@/cryptography/cryptography.module';
import { DatabaseModule } from '@/database/database.module';
import { AuthenticateSellerController } from '@/users/controllers/authenticate-seller.controller';
import { CreateSellerController } from '@/users/controllers/create-seller.controller';
import { GetSellerInfoController } from '@/users/controllers/get-seller-info.controller';
import { AuthenticateSellerUseCase } from '@/users/use-cases/authenticate-seller';
import { CreateUserUseCase } from '@/users/use-cases/create-user';
import { GetUserInfoUseCase } from '@/users/use-cases/get-user-info';
import { Module } from '@nestjs/common';

@Module({
  imports: [CryptographyModule, DatabaseModule],
  providers: [
    CreateUserUseCase,
    AuthenticateSellerUseCase,
    AuthService,
    GetUserInfoUseCase,
  ],
  controllers: [
    CreateSellerController,
    AuthenticateSellerController,
    GetSellerInfoController,
  ],
})
export class UsersModule {}
