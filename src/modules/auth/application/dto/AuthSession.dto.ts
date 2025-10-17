import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  username: string;
}

export class LoginSessionDto {
  @ApiProperty({
    type: () => UserInfoDto,
    description: 'User information',
  })
  user: UserInfoDto;

  accessToken: string;

  refreshToken: string;
}

export class AuthSessionDto extends OmitType(LoginSessionDto, [
  'refreshToken',
] as const) {}
