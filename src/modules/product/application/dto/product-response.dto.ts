import { ApiProperty } from '@nestjs/swagger';
import { BaseProductDto } from './base-product.dto';

export class ProductResponseDto extends BaseProductDto {
  @ApiProperty({
    description: 'Formatted price with currency symbol',
    example: '$1,999.99',
  })
  formatPrice: string;
}
