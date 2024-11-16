import { BcryptHasher } from '@/cryptography/bcrypt-hasher';
import { PrismaUsersRepository } from '@/database/prisma/repositories/prisma-users.repository';
import { PasswordConfirmationNotMatchedError } from '@/users/use-cases/errors/password-confirmation-not-matched-error';
import { UserAlreadyExistsError } from '@/users/use-cases/errors/user-already-exists-error';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

export interface CreateUserUseCaseRequest {
  email: string;
  phone: string;
  avatarId?: string | null;
  password: string;
  passwordConfirmation: string;
}

export interface CreateUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: PrismaUsersRepository,
    private hashGenerator: BcryptHasher,
  ) {}

  async execute({
    email,
    phone,
    avatarId,
    password,
    passwordConfirmation,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    if (password !== passwordConfirmation)
      throw new PasswordConfirmationNotMatchedError();

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new UserAlreadyExistsError(email);

    const passwordHash = await this.hashGenerator.hash(password);

    const user = await this.usersRepository.create({
      email,
      phone,
      avatarId,
      passwordHash,
    });

    return { user };
  }
}
