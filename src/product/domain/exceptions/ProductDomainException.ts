import {
  DomainException,
  ExceptionProps,
} from 'src/shared/domain/exceptions/DomainException.abstract';

export class ProductDomainException extends DomainException {
  static readonly ORIGIN_DEFAULT = 'PRODUCT_DOMAIN';
  static readonly NAME_EXCEPTION = 'ProductDomainException';

  constructor({
    message = 'Product domain exception',
    errors,
    origin = ProductDomainException.ORIGIN_DEFAULT,
  }: ExceptionProps) {
    super({
      name: ProductDomainException.NAME_EXCEPTION,
      message,
      errors,
      origin,
    });
  }
}
