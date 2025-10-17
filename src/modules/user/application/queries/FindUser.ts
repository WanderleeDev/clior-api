import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/out/user-repository.port';
import { UserResponseDto } from '../dto';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class FindUser {
  constructor(private readonly repo: UserRepositoryPort) {}

  async exec(username: string): Promise<UserResponseDto> {
    const user = await this.repo.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.modelToResponseDto(user);
  }
}
