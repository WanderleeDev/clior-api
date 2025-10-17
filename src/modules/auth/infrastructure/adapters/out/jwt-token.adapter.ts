import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenServicePort } from 'src/modules/auth/domain/ports/out/token-service.port';
import { JwtPayload } from 'src/modules/auth/domain/types';

@Injectable()
export default class JwtTokenAdapter implements TokenServicePort {
  readonly #timeUnits = new Map<string, number>([
    ['15m', 15 * 60],
    ['1h', 60 * 60],
    ['1d', 24 * 60 * 60],
    ['7d', 7 * 24 * 60 * 60],
  ]);

  readonly #tokenEnvKeys = {
    access: 'JWT_ACCESS_TOKEN_EXPIRATION',
    refresh: 'JWT_REFRESH_TOKEN_EXPIRATION',
  };

  readonly #tokenSecretKeys = {
    access: 'JWT_ACCESS_TOKEN_SECRET',
    refresh: 'JWT_REFRESH_TOKEN_SECRET',
  };

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(sub: string, username: string): Promise<string> {
    const expiresIn = this.generateExpirationTime('access');
    const secret = this.getSecret('access');

    return this.jwtService.signAsync(
      { sub, username, type: 'access' },
      { expiresIn, secret },
    );
  }

  async generateRefreshToken(sub: string, username: string): Promise<string> {
    const expiresIn = this.generateExpirationTime('refresh');
    const secret = this.getSecret('refresh');

    return this.jwtService.signAsync(
      { sub, username, type: 'refresh' },
      { expiresIn, secret },
    );
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.getSecret('access'),
    });
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.getSecret('refresh'),
    });
  }

  public validateTokenType(tokenType: 'access' | 'refresh'): void {
    if (tokenType !== 'access' && tokenType !== 'refresh') {
      throw new InternalServerErrorException(
        `Invalid token type: ${String(tokenType)}`,
      );
    }
  }

  private generateExpirationTime(
    tokenType: 'access' | 'refresh' = 'access',
  ): number {
    this.validateTokenType(tokenType);

    const envKey =
      tokenType === 'access'
        ? this.#tokenEnvKeys.access
        : this.#tokenEnvKeys.refresh;
    const expiresIn = this.configService.get<string>(envKey);
    const seconds = this.#timeUnits.get(expiresIn ?? '15m');

    if (!seconds) {
      throw new InternalServerErrorException(
        `Expiration time is invalid: ${expiresIn}`,
      );
    }

    return seconds;
  }

  private getSecret(tokenType: 'access' | 'refresh' = 'access'): string {
    this.validateTokenType(tokenType);

    const envKey =
      tokenType === 'access'
        ? this.#tokenSecretKeys.access
        : this.#tokenSecretKeys.refresh;

    const secret = this.configService.get<string>(envKey);

    if (!secret) {
      throw new InternalServerErrorException(
        `Secret is not defined for ${envKey}`,
      );
    }

    return secret;
  }
}
