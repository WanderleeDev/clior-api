import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from './infrastructure/adapters/in/auth.controller';
import { RegisterUser } from './application/commands/RegisterUser';
import { TokenServicePort } from './domain/ports/out/token-service.port';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginUser } from './application/commands/LoginUser';
import { SaveRefreshTokenForUser } from './application/commands/SaveRefreshTokenForUser';
import JwtTokenAdapter from './infrastructure/adapters/out/jwt-token.adapter';
import { RefreshToken } from './application/commands/RefreshToken';
import { LogoutUser } from './application/commands/LogoutUser';
import { TokenRepositoryPort } from './domain/ports/out/token-repository.port';
import { TokenRepositoryAdapter } from './infrastructure/adapters/out/token-reposiroty.adapter';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRATION'),
          algorithm: 'HS256',
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: TokenServicePort,
      useClass: JwtTokenAdapter,
    },
    {
      provide: TokenRepositoryPort,
      useClass: TokenRepositoryAdapter,
    },
    RegisterUser,
    LoginUser,
    SaveRefreshTokenForUser,
    RefreshToken,
    LogoutUser,
  ],
})
export class AuthModule {}
