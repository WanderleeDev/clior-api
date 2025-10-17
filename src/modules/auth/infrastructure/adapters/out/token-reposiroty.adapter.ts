import { MoreThan, Repository } from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { TokenRepositoryPort } from 'src/modules/auth/domain/ports/out/token-repository.port';
import { RefreshToken } from 'src/modules/auth/domain/model/refresh-token';
import { RefreshTokenMapper } from 'src/modules/auth/application/mapper/refresh-token.mapper';

export class TokenRepositoryAdapter implements TokenRepositoryPort {
  constructor(private readonly repository: Repository<RefreshTokenEntity>) {}

  async findValidTokensByUserId(userId: string): Promise<RefreshToken[]> {
    const entities = await this.repository.find({
      where: {
        userId,
        expiresAt: MoreThan(new Date()),
      },
    });

    return entities.map((entity) => RefreshTokenMapper.ormToModel(entity));
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await this.repository.delete({ userId });
    return (result.affected ?? 0) > 0;
  }

  async save(token: RefreshToken): Promise<RefreshToken> {
    const entity = RefreshTokenMapper.modelToOrm(token);
    const saved = await this.repository.save(entity);

    return RefreshTokenMapper.ormToModel(saved);
  }
}
