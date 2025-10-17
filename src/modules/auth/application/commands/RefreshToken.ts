import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenRepositoryPort } from '../../domain/ports/out/token-repository.port';
import { TokenServicePort } from '../../domain/ports/out/token-service.port';
import { HashingServicePort } from 'src/modules/user/domain/ports/in/hashing-service.port';
import { SaveRefreshTokenForUser } from './SaveRefreshTokenForUser';
import { TokensDto } from '../dto/Tokens.dto';

@Injectable()
export class RefreshToken {
  constructor(
    private readonly tokenRepository: TokenRepositoryPort,
    private readonly tokenService: TokenServicePort,
    private readonly hashingService: HashingServicePort,
    private readonly saveRefreshTokenForUser: SaveRefreshTokenForUser,
  ) {}

  async exec(refreshToken: string): Promise<TokensDto> {
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }

    const validTokens = await this.tokenRepository.findValidTokensByUserId(
      payload.sub,
    );

    if (!validTokens.length) {
      throw new UnauthorizedException('Invalid token');
    }

    const validTokenResults = await Promise.all(
      validTokens.map((token) =>
        this.hashingService.compare(refreshToken, token.hashedToken.value),
      ),
    );
    const isValid = validTokenResults.includes(true);

    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    const tokens = await this.regenerateTokens(payload.sub, payload.username);
    await this.synchronizeTokens(payload.sub, tokens.refreshToken);

    return tokens;
  }

  private async regenerateTokens(
    sub: string,
    username: string,
  ): Promise<TokensDto> {
    const [newAccessToken, newRefreshToken] = await Promise.all([
      this.tokenService.generateAccessToken(sub, username),
      this.tokenService.generateRefreshToken(sub, username),
    ]);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  private async synchronizeTokens(sub: string, refreshToken: string) {
    await this.tokenRepository.deleteByUserId(sub);
    await this.saveRefreshTokenForUser.exec(sub, refreshToken);
  }
}
