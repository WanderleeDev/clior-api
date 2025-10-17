import { OmitType, PartialType } from '@nestjs/swagger';
import { BaseProductDto } from './base-product.dto';

export class UpdateProductDto extends PartialType(
  OmitType(BaseProductDto, ['id', 'status'] as const),
) {}
