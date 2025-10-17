import { RefreshToken } from '../../model/refresh-token';

export abstract class TokenRepositoryPort {
  abstract save(token: RefreshToken): Promise<RefreshToken>;

  abstract findValidTokensByUserId(userId: string): Promise<RefreshToken[]>;

  abstract deleteByUserId(userId: string): Promise<boolean>;
}
