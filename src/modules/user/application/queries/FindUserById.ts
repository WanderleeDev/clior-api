import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/out/user-repository.port';
import { UserMapper } from '../mapper/user.mapper';
import { UserResponseDto } from '../dto';

@Injectable()
export class FindUserById {
  constructor(private readonly repo: UserRepositoryPort) {}

  async exec(id: string): Promise<UserResponseDto> {
    const user = await this.repo.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.modelToResponseDto(user);
  }
}
