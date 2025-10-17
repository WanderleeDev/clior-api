import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/out/user-repository.port';
import { ResourceNotDeletedException } from 'src/shared/application/exceptions/resource-not-deleted.exception';
import { ResourceNotFoundException } from 'src/shared/application/exceptions/resource-not-found.exception';

@Injectable()
export class DeleteUser {
  constructor(private readonly repo: UserRepositoryPort) {}

  async exec(id: string): Promise<void> {
    const exists = await this.repo.exists(id);

    if (!exists) {
      throw new ResourceNotFoundException('User not found');
    }

    const deleted = await this.repo.deleteById(id);
    if (!deleted) {
      throw new ResourceNotDeletedException('User not deleted');
    }
  }
}
