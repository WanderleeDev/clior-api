import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { USER_CONSTANTS } from 'src/modules/user/const';

export class LoginPayload {
  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'secret-password',
  })
  @IsString()
  @Length(
    USER_CONSTANTS.PASSWORD_MIN_LENGTH,
    USER_CONSTANTS.PASSWORD_MAX_LENGTH,
  )
  password: string;
}
