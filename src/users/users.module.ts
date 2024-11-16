import { Module } from '@nestjs/common';
import { CreateUserController } from 'src/users/controllers/create-user.controller';

@Module({
  controllers: [CreateUserController],
})
export class UsersModule {}
