import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { USER_CONSTANTS } from 'src/modules/user/const';

export class RegisterPayload {
  @ApiProperty({
    example: 'username',
    description: "The user's username",
  })
  @IsString()
  @Length(
    USER_CONSTANTS.USERNAME_MIN_LENGTH,
    USER_CONSTANTS.USERNAME_MAX_LENGTH,
  )
  username: string;

  @ApiProperty({
    example: 'secret-password',
    description: "The user's password",
  })
  @IsString()
  @Length(
    USER_CONSTANTS.PASSWORD_MIN_LENGTH,
    USER_CONSTANTS.PASSWORD_MAX_LENGTH,
  )
  password: string;

  @ApiProperty({
    example: 'user@example.com',
    description: "The user's email",
  })
  @IsEmail()
  email: string;
}
