import { BcryptHasher } from '@/cryptography/bcrypt-hasher';
import { JwtEncrypter } from '@/cryptography/jwt-encrypter';
import { Module } from '@nestjs/common';

@Module({
  providers: [BcryptHasher, JwtEncrypter],
  exports: [BcryptHasher, JwtEncrypter],
})
export class CryptographyModule {}
