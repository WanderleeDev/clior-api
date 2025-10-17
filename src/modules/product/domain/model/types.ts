import { Currency, StockStatus } from '../enum';
import { UuidVO } from 'src/shared/domain/vo/Uuid.vo';
import { NameVO } from 'src/modules/product/domain/model/vo/Name.vo';
import { MoneyVO } from 'src/modules/product/domain/model/vo/Money.vo';
import { DescriptionVO } from 'src/modules/product/domain/model/vo/Description.vo';
import { StockVO } from 'src/modules/product/domain/model/vo/Stock.vo';
import { ThumbnailVO } from 'src/modules/product/domain/model/vo/Thumbnail.vo';

export type ProductArgs = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: Currency;
  stock: number;
  status: StockStatus;
  thumbnail: string | null;
};

export interface CreateProductArgs {
  id: UuidVO;
  name: NameVO;
  price: MoneyVO;
  description: DescriptionVO | null;
  stock: StockVO;
  thumbnail: ThumbnailVO | null;
}

export type ProductUpdateArgs = Partial<
  Omit<ProductArgs, 'id' | 'description' | 'thumbnail'>
> & {
  description?: string;
  thumbnail?: string;
};

export type NullProductArgs = Omit<
  ProductArgs,
  'id' | 'description' | 'thumbnail'
> & {
  description: string;
  thumbnail: string;
};
