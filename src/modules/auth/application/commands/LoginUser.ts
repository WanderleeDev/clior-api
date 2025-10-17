import { Injectable } from '@nestjs/common';
import { HashingServicePort } from 'src/modules/user/domain/ports/in/hashing-service.port';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/out/user-repository.port';
import { LoginPayload } from '../dto/LoginPayload.dto';
import { TokenServicePort } from '../../domain/ports/out/token-service.port';
import { ResourceNotFoundException } from 'src/shared/application/exceptions/resource-not-found.exception';
import { InvalidCredentialsException } from 'src/shared/application/exceptions/invalid-credentials';
import { SaveRefreshTokenForUser } from './SaveRefreshTokenForUser';
import { TokensDto } from '../dto/Tokens.dto';

@Injectable()
export class LoginUser {
  constructor(
    private readonly repo: UserRepositoryPort,
    private readonly hashingService: HashingServicePort,
    private readonly tokenService: TokenServicePort,
    private readonly saveRefreshToken: SaveRefreshTokenForUser,
  ) {}

  async exec(payload: LoginPayload): Promise<TokensDto> {
    const user = await this.repo.findByEmail(payload.email);

    if (!user) {
      throw new ResourceNotFoundException('User not found');
    }

    const isPasswordValid = await this.hashingService.compare(
      payload.password,
      user.hashedPassword.value,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException('Invalid password');
    }

    const { sub, username } = {
      sub: user.id.value,
      username: user.username.value,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken(sub, username),
      this.tokenService.generateRefreshToken(sub, username),
    ]);

    await this.saveRefreshToken.exec(sub, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}
