import { DescriptionVO } from './vo/Description.vo';
import { MoneyVO } from './vo/Money.vo';
import { NameVO } from './vo/Name.vo';
import { StockVO } from './vo/Stock.vo';
import { ThumbnailVO } from './vo/Thumbnail.vo';
import {
  AgreementError,
  AgreementRoot,
} from 'src/shared/domain/vo/abstracts/BaseAbstract.vo';
import { UuidVO } from 'src/shared/domain/vo/Uuid.vo';
import { CreateProductArgs, ProductArgs, ProductUpdateArgs } from './types';
import { Result } from 'src/shared/utils/Result';

export class Product extends AgreementRoot<ProductArgs> {
  readonly NAME_AGREEMENT_ROOT: string = 'product';

  private constructor(
    public readonly id: UuidVO,
    public readonly name: NameVO,
    public readonly price: MoneyVO,
    public readonly description: DescriptionVO | null,
    public readonly stock: StockVO,
    public readonly thumbnail: ThumbnailVO | null,
  ) {
    super();
  }

  static create(args: CreateProductArgs): Product {
    return new Product(
      args.id,
      args.name,
      args.price,
      args.description,
      args.stock,
      args.thumbnail,
    );
  }

  public update(args: ProductUpdateArgs): Result<Product, AgreementError[]> {
    if (
      Object.keys(args).length === 0 ||
      Object.values(args).every((value) => value === undefined)
    ) {
      return Result.fail([
        {
          field: 'update',
          message: 'No arguments provided',
        },
      ]);
    }

    const nameResult: Result<NameVO, AgreementError[]> =
      args.name !== undefined ? NameVO.of(args.name) : Result.ok(this.name);

    const priceResult: Result<MoneyVO, AgreementError[]> =
      args.price !== undefined
        ? MoneyVO.of({
            value: args.price,
            currency: args.currency ?? this.price.currency,
          })
        : Result.ok(this.price);

    const descriptionResult: Result<DescriptionVO | null, AgreementError[]> =
      args.description !== undefined
        ? DescriptionVO.of(args.description)
        : Result.ok(this.description);

    const stockResult: Result<StockVO, AgreementError[]> =
      args.stock !== undefined
        ? StockVO.of({ value: args.stock, status: this.stock.status })
        : Result.ok(this.stock);

    const thumbnailResult: Result<ThumbnailVO | null, AgreementError[]> =
      args.thumbnail !== undefined
        ? ThumbnailVO.of(args.thumbnail)
        : Result.ok(this.thumbnail);

    const errors: AgreementError[] = [];

    if (nameResult.hasError) errors.push(...nameResult.error!);
    if (priceResult.hasError) errors.push(...priceResult.error!);
    if (descriptionResult.hasError) errors.push(...descriptionResult.error!);
    if (stockResult.hasError) errors.push(...stockResult.error!);
    if (thumbnailResult.hasError) errors.push(...thumbnailResult.error!);

    if (errors.length > 0) {
      return Result.fail(errors);
    }

    return Result.ok(
      new Product(
        this.id,
        nameResult.data,
        priceResult.data,
        descriptionResult.data,
        stockResult.data,
        thumbnailResult.data,
      ),
    );
  }

  public formatterPrice(): string {
    return this.price.formatterValue();
  }

  public toJSON(): ProductArgs {
    return {
      id: this.id.value,
      name: this.name.value,
      price: this.price.value,
      description: this.description?.value ?? null,
      stock: this.stock.value,
      thumbnail: this.thumbnail?.value ?? null,
      currency: this.price.currency,
      status: this.stock.status,
    };
  }
}
