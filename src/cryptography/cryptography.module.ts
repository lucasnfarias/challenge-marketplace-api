import { BcryptHasher } from '@/cryptography/bcrypt-hasher';
import { Module } from '@nestjs/common';

@Module({
  providers: [BcryptHasher],
  exports: [BcryptHasher],
})
export class CryptographyModule {}
