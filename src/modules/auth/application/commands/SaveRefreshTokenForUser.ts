import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { RefreshTokenEntity } from '../../infrastructure/adapters/out/refresh-token.entity';
import { HashingServicePort } from 'src/modules/user/domain/ports/in/hashing-service.port';
import { generateUuid } from 'src/shared/utils/generateUuid';

export class SaveRefreshTokenForUser {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingServicePort,
  ) {}

  async exec(userId: string, refreshToken: string) {
    const repo = this.dataSource.getRepository(RefreshTokenEntity);
    const hashedRefreshToken = await this.hashingService.hash(refreshToken);
    const refreshTokenEntity = repo.create({
      id: generateUuid(),
      userId,
      hashedToken: hashedRefreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    await repo.save(refreshTokenEntity);
  }
}
