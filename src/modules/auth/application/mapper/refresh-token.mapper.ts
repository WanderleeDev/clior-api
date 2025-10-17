import { RefreshToken } from '../../domain/model/refresh-token';
import { RefreshTokenEntity } from '../../infrastructure/adapters/out/refresh-token.entity';
import { RefreshTokenBuilder } from '../../domain/refresh-token.builder';

export class RefreshTokenMapper {
  static modelToOrm(token: RefreshToken): RefreshTokenEntity {
    const entity = new RefreshTokenEntity();
    entity.id = token.id.value;
    entity.userId = token.userId.value;
    entity.hashedToken = token.hashedToken.value;
    entity.expiresAt = token.expiresAt;

    return entity;
  }

  static ormToModel(entity: RefreshTokenEntity): RefreshToken {
    return RefreshTokenBuilder.create({
      id: entity.id,
      userId: entity.userId,
      hashedToken: entity.hashedToken,
      expiresAt: entity.expiresAt,
    });
  }
}
