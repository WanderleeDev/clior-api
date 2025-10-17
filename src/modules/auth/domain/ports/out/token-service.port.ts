import { JwtPayload } from '../../types';

export abstract class TokenServicePort {
  abstract generateAccessToken(sub: string, username: string): Promise<string>;

  abstract generateRefreshToken(sub: string, username: string): Promise<string>;

  abstract verifyAccessToken(token: string): Promise<JwtPayload>;

  abstract verifyRefreshToken(token: string): Promise<JwtPayload>;

  abstract validateTokenType(tokenType: 'access' | 'refresh'): void;
}
