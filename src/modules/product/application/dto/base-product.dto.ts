import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsEnum,
  IsInt,
  IsUUID,
  MaxLength,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { PRODUCTS_CONSTANTS } from 'src/modules/product/const';
import { Currency, StockStatus } from 'src/modules/product/domain/enum';

export class BaseProductDto {
  @ApiProperty({
    description: 'Product unique identifier',
    example: '5245412c-58ec-49aa-851f-95538f354cc2',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID(4)
  readonly id: string;

  @ApiProperty({
    description: 'Product name',
    example: 'Galaxy S21',
    maxLength: PRODUCTS_CONSTANTS.NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(PRODUCTS_CONSTANTS.NAME_MAX_LENGTH)
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'The best smartphone ever',
    maxLength: PRODUCTS_CONSTANTS.DESCRIPTION_MAX_LENGTH,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @MaxLength(PRODUCTS_CONSTANTS.DESCRIPTION_MAX_LENGTH)
  readonly description?: string;

  @ApiProperty({
    description: 'Product price',
    example: 1999.99,
    minimum: PRODUCTS_CONSTANTS.PRICE_MIN_VALUE,
  })
  @IsNumber()
  @Min(PRODUCTS_CONSTANTS.PRICE_MIN_VALUE)
  readonly price: number;

  @ApiProperty({
    description: 'Product currency',
    enum: Currency,
    example: Currency.USD,
  })
  @IsEnum(Currency)
  @Transform(({ value }) => String(value).toUpperCase().trim())
  readonly currency: Currency;

  @ApiProperty({
    description: 'Product stock',
    example: 10,
    minimum: PRODUCTS_CONSTANTS.STOCK_MIN_VALUE,
  })
  @IsInt()
  @Min(PRODUCTS_CONSTANTS.STOCK_MIN_VALUE)
  readonly stock: number;

  @ApiPropertyOptional({
    description: 'Product thumbnail image',
    example: 'https://example.com/image.jpg',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @IsUrl({ require_tld: true })
  readonly thumbnail?: string;

  @ApiProperty({
    description: 'Product stock status',
    enum: StockStatus,
    example: StockStatus.AVAILABLE,
  })
  @IsEnum(StockStatus)
  @Transform(({ value }) => String(value).toLowerCase().trim())
  readonly status: StockStatus;
}
