import { Injectable } from '@nestjs/common';
import { RegisterPayload } from '../dto/RegisterPayload.dto';
import { CommonResponse } from 'src/shared/application/dto';
import { HashingServicePort } from 'src/modules/user/domain/ports/in/hashing-service.port';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/out/user-repository.port';
import { UserBuilder } from 'src/modules/user/domain/user.builder';
import { AlreadyExistsException } from 'src/shared/application/exceptions/already-exists.exception';
import { ResourceNotCreatedException } from 'src/shared/application/exceptions/resource-not-created.exception';
import { generateUuid } from 'src/shared/utils/generateUuid';

@Injectable()
export class RegisterUser {
  constructor(
    private readonly repo: UserRepositoryPort,
    private readonly hashingService: HashingServicePort,
  ) {}

  async exec(payload: RegisterPayload): Promise<CommonResponse> {
    const existingUser = await this.repo.existsByUsernameOrEmail(
      payload.username,
      payload.email,
    );

    if (existingUser) {
      throw new AlreadyExistsException('User already exists');
    }

    const hashedPassword = await this.hashingService.hash(payload.password);
    const user = UserBuilder.create({
      id: generateUuid(),
      username: payload.username,
      email: payload.email,
      hashedPassword,
    });
    const userResult = await this.repo.save(user);

    if (!userResult) {
      throw new ResourceNotCreatedException('User not created');
    }

    return {
      message: 'User created successfully',
    };
  }
}
