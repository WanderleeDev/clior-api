import { OmitType } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class UserResponseDto extends OmitType(BaseUserDto, [
  'deletedAt',
  'createdAt',
  'updatedAt',
  'password',
] as const) {}

export class UserAuditDto extends OmitType(BaseUserDto, [
  'password',
] as const) {}
