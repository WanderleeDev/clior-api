import { Currency, StockStatus } from '../enum';
import { UuidVO } from 'src/shared/domain/vo/Uuid.vo';
import { NameVO } from 'src/product/domain/model/vo/Name.vo';
import { MoneyVO } from 'src/product/domain/model/vo/Money.vo';
import { DescriptionVO } from 'src/product/domain/model/vo/Description.vo';
import { StockVO } from 'src/product/domain/model/vo/Stock.vo';
import { ThumbnailVO } from 'src/product/domain/model/vo/Thumbnail.vo';

export interface ProductArgs {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: Currency;
  stock: number;
  status: StockStatus;
  thumbnail: string | null;
}

export interface CreateProductArgs {
  id: UuidVO;
  name: NameVO;
  price: MoneyVO;
  description: DescriptionVO | null;
  stock: StockVO;
  thumbnail: ThumbnailVO | null;
}

export interface ProductUpdateArgs {
  name?: string;
  price?: number;
  description?: string;
  stock?: number;
  thumbnail?: string;
  currency?: Currency;
}

export interface NullProductArgs {
  name: string;
  stock: number;
  description: string;
  currency: Currency;
  status: StockStatus;
  thumbnail: string;
}
