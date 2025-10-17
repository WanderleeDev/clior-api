import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsDate,
  IsOptional,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { USER_CONSTANTS } from 'src/modules/user/const';

export class BaseUserDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
    minLength: USER_CONSTANTS.USERNAME_MIN_LENGTH,
    maxLength: USER_CONSTANTS.USERNAME_MAX_LENGTH,
  })
  @IsString()
  @MinLength(USER_CONSTANTS.USERNAME_MIN_LENGTH)
  @MaxLength(USER_CONSTANTS.USERNAME_MAX_LENGTH)
  @Matches(USER_CONSTANTS.USERNAME_REGEX)
  username: string;

  @ApiProperty({
    description: 'User password (will be hashed)',
    example: 'SecureP@ssw0rd',
    minLength: USER_CONSTANTS.PASSWORD_MIN_LENGTH,
    maxLength: USER_CONSTANTS.PASSWORD_MAX_LENGTH,
  })
  @IsString()
  @MinLength(USER_CONSTANTS.PASSWORD_MIN_LENGTH)
  @MaxLength(USER_CONSTANTS.PASSWORD_MAX_LENGTH)
  password: string;

  @ApiProperty({
    description: 'User email',
    example: 'john_doe@example.com',
    maxLength: USER_CONSTANTS.EMAIL_MAX_LENGTH,
  })
  @IsString()
  @IsEmail()
  @Matches(USER_CONSTANTS.EMAIL_REGEX)
  email: string;

  @ApiProperty({
    description: 'User creation date',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'User last update date',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  updatedAt: Date | null;

  @ApiProperty({
    description: 'User deletion date (soft delete)',
    example: null,
    required: false,
  })
  @IsOptional()
  @IsDate()
  deletedAt: Date | null;
}
