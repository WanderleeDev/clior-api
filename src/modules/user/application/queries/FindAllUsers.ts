import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/out/user-repository.port';
import { UserResponseDto } from '../dto';
import { UserMapper } from '../mapper/user.mapper';
import { PaginationQueryCore } from 'src/shared/types';
import { Paginated } from 'nestjs-paginate';

@Injectable()
export class FindAllUsers {
  constructor(private readonly repo: UserRepositoryPort) {}

  async exec(
    filters: PaginationQueryCore,
  ): Promise<Paginated<UserResponseDto>> {
    const result = await this.repo.findAll(filters);

    return UserMapper.modelToResponseDtoPaginate(result);
  }
}
