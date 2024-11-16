import { BcryptHasher } from '@/cryptography/bcrypt-hasher';
import { JwtEncrypter } from '@/cryptography/jwt-encrypter';
import { PrismaUsersRepository } from '@/database/prisma/repositories/prisma-users.repository';
import { WrongCredentialsError } from '@/users/use-cases/errors/wrong-credentials-error';
import { Injectable } from '@nestjs/common';

interface AuthenticateSellerUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateSellerUseCaseResponse {
  accessToken: string;
}

@Injectable()
export class AuthenticateSellerUseCase {
  constructor(
    private usersRepository: PrismaUsersRepository,
    private hashComparer: BcryptHasher,
    private encrypter: JwtEncrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateSellerUseCaseRequest): Promise<AuthenticateSellerUseCaseResponse> {
    const seller = await this.usersRepository.findByEmail(email);

    if (!seller) {
      throw new WrongCredentialsError();
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      seller.passwordHash,
    );

    if (!isPasswordValid) {
      throw new WrongCredentialsError();
    }

    const accessToken = await this.encrypter.encrypt({
      sub: seller.id.toString(),
    });

    return { accessToken };
  }
}
