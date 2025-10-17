import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './infrastructure/adapters/in/user.controller';
import { UserRepositoryPort } from './domain/ports/out/user-repository.port';
import { FindUserById, FindAllUsers } from './application/queries';
import { UpdateUser, DeleteUser } from './application/commands';
import { UserRepositoryAdapter } from './infrastructure/adapters/out/user-repository.adapter';
import { UserEntity } from './infrastructure/adapters/out/user.entity';
import { HashingServicePort } from './domain/ports/in/hashing-service.port';
import { HashingService } from './application/services/hashing.service';
import { FindUser } from './application/queries/FindUser';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryAdapter,
    },
    {
      provide: HashingServicePort,
      useClass: HashingService,
    },
    // Queries
    FindUserById,
    FindAllUsers,
    // Commands
    UpdateUser,
    DeleteUser,
    FindUser,
  ],
  exports: [UserRepositoryPort, FindUserById, HashingServicePort],
})
export class UserModule {}
