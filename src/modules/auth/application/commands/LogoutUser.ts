import { Injectable } from '@nestjs/common';
import { TokenRepositoryPort } from '../../domain/ports/out/token-repository.port';
import { CommonResponse } from 'src/shared/application/dto';

@Injectable()
export class LogoutUser {
  constructor(private readonly tokenRepository: TokenRepositoryPort) {}

  async exec(userId: string): Promise<CommonResponse> {
    await this.tokenRepository.deleteByUserId(userId);

    return {
      message: 'Logged out successfully',
    };
  }
}
