import { Currency, StockStatus } from 'src/product/domain/enum';
import { NullProductArgs } from 'src/product/domain/model/types';

export const PRODUCTS_CONSTANTS = {
  NAME_MAX_LENGTH: 100,
  NAME_MIN_LENGTH: 1,

  DESCRIPTION_MAX_LENGTH: 500,
  DESCRIPTION_MIN_LENGTH: 1,

  STOCK_MAX_VALUE: 1_000,
  STOCK_MIN_VALUE: 0,

  THUMBNAIL_MAX_LENGTH: 255,
  THUMBNAIL_MIN_LENGTH: 1,

  PRICE_MIN_VALUE: 0.01,
  PRICE_MAX_SAFE_VALUE: Number.MAX_SAFE_INTEGER,
  PRICE_PRECISION: 10,
  PRICE_SCALE: 2,
  DEFAULT_CURRENCY: Currency.USD,

  FILTER_WORDS: ['spam'],
} as const;

export const NULL_PRODUCT: NullProductArgs = {
  name: 'No name at the moment',
  currency: Currency.USD,
  stock: 0,
  thumbnail:
    'https://res.cloudinary.com/dy8gpozi6/image/upload/v1733777631/placeholder_q3etpx.webp',
  description: 'No description at the moment',
  status: StockStatus.UNAVAILABLE,
} as const;
