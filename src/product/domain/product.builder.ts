import { DescriptionVO } from './model/vo/Description.vo';
import { MoneyVO } from './model/vo/Money.vo';
import { NameVO } from './model/vo/Name.vo';
import { StockVO } from './model/vo/Stock.vo';
import { ThumbnailVO } from './model/vo/Thumbnail.vo';
import { UuidVO } from 'src/shared/domain/vo/Uuid.vo';
import { ProductDomainException } from './exceptions/ProductDomainException';
import { collectAgreementErrors } from 'src/shared/utils/collectAgreementErrors';
import { ProductArgs } from './model/types';
import { Product } from './model/product';

export class ProductBuilder {
  static create({
    id,
    name,
    price,
    description,
    stock,
    thumbnail,
    currency,
  }: ProductArgs): Product {
    const uuidVo = UuidVO.of(id);
    const nameVo = NameVO.of(name);
    const moneyVo = MoneyVO.of({ value: price, currency });
    const stockVo = StockVO.of({ value: stock });
    const descriptionVo = description ? DescriptionVO.of(description) : null;
    const thumbnailVo = thumbnail ? ThumbnailVO.of(thumbnail) : null;
    const propertiesNotNull = [
      uuidVo,
      nameVo,
      moneyVo,
      stockVo,
      descriptionVo,
      thumbnailVo,
    ].filter((vo) => vo !== null);
    const errors = collectAgreementErrors(propertiesNotNull);

    if (errors.length > 0) {
      throw new ProductDomainException({
        message: 'Product is not valid',
        origin: 'product',
        errors,
      });
    }

    return Product.create({
      id: uuidVo.data,
      name: nameVo.data,
      price: moneyVo.data,
      description: descriptionVo?.data ?? null,
      stock: stockVo.data,
      thumbnail: thumbnailVo?.data ?? null,
    });
  }
}
