import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginUser } from 'src/modules/auth/application/commands/LoginUser';
import { RegisterUser } from 'src/modules/auth/application/commands/RegisterUser';
import { LoginPayload } from 'src/modules/auth/application/dto/LoginPayload.dto';

import { RegisterPayload } from 'src/modules/auth/application/dto/RegisterPayload.dto';
import { CommonResponse } from 'src/shared/application/dto';
import { AuthGuard } from './auth.guard';
import { Response, Request } from 'express';
import { RefreshToken } from 'src/modules/auth/application/commands/RefreshToken';
import { LogoutUser } from 'src/modules/auth/application/commands/LogoutUser';
import { TokenDto } from 'src/modules/auth/application/dto/Tokens.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUser: RegisterUser,
    private readonly loginUser: LoginUser,
    private readonly refreshToken: RefreshToken,
    private readonly logoutUser: LogoutUser,
    private readonly config: ConfigService,
  ) {}

  // ========================================
  // POST
  // ========================================
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    description: 'User registered successfully',
    type: CommonResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async register(@Body() payload: RegisterPayload) {
    return this.createUser.exec(payload);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: TokenDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async login(
    @Body() payload: LoginPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto> {
    const { accessToken, refreshToken } = await this.loginUser.exec(payload);
    this.injectToken(res, refreshToken);

    return { accessToken };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh a user token' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookies = req.cookies;

    if (!cookies['refreshToken']) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const { accessToken, refreshToken } = await this.refreshToken.exec(
      cookies['refreshToken'] as string,
    );

    this.injectToken(res, refreshToken);

    return { accessToken };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiOkResponse({
    description: 'User logged out successfully',
    type: CommonResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CommonResponse> {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    const result = await this.logoutUser.exec(user.sub);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: this.config.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
    });

    return result;
  }

  // ========================================
  // GET
  // ========================================
  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({
    description: 'User retrieved successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getUserInfo(@Req() req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private injectToken(res: Response, refreshToken: string) {
    const secure = this.config.get<string>('NODE_ENV') === 'production';

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure,
      sameSite: 'strict',
    });
  }
}
