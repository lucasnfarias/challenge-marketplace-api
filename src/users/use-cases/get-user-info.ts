import { PrismaUsersRepository } from '@/database/prisma/repositories/prisma-users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

export interface GetUserInfoUseCaseRequest {
  id: string;
}

export interface GetUserInfoUseCaseResponse {
  user: Omit<User, 'passwordHash'>;
}

@Injectable()
export class GetUserInfoUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    id,
  }: GetUserInfoUseCaseRequest): Promise<GetUserInfoUseCaseResponse> {
    const currentUser = await this.usersRepository.findById(id);

    if (!currentUser) throw new NotFoundException();

    const { passwordHash, ...user } = currentUser;

    return { user };
  }
}
