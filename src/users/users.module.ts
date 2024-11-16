import { CryptographyModule } from '@/cryptography/cryptography.module';
import { DatabaseModule } from '@/database/database.module';
import { CreateSellerController } from '@/users/controllers/create-seller.controller';
import { CreateUserUseCase } from '@/users/use-cases/create-user';
import { Module } from '@nestjs/common';

@Module({
  imports: [CryptographyModule, DatabaseModule],
  providers: [CreateUserUseCase],
  controllers: [CreateSellerController],
})
export class UsersModule {}
