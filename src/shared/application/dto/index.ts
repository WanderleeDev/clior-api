import { ApiProperty } from '@nestjs/swagger';

export class CommonResponse {
  @ApiProperty({ example: 'Message response' })
  message: string;
}
