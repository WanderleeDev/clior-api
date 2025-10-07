import { Product } from 'src/product/domain/model/product';
import { ProductResponseDto } from 'src/product/application/dto';
import { ProductBuilder } from 'src/product/domain/product.builder';
import { ProductEntity } from 'src/product/infrastructure/adapters/out/product.entity';
import { NULL_PRODUCT } from 'src/product/const';
import { PaginationCoreResponse } from 'src/shared/types';
import { Paginated } from 'nestjs-paginate';

export class ProductMapper {
  static modelToResponseDto(product: Product): ProductResponseDto {
    return {
      id: product.id.value,
      name: product.name.value ?? NULL_PRODUCT.name,
      description: product.description?.value ?? NULL_PRODUCT.description,
      price: product.price.value,
      currency: product.price.currency,
      stock: product.stock.value,
      thumbnail: product.thumbnail?.value ?? NULL_PRODUCT.thumbnail,
      status: product.stock.status ?? NULL_PRODUCT.status,
      formatPrice: product.formatterPrice(),
    };
  }

  static modelToOrm(product: Product): ProductEntity {
    const entity = new ProductEntity();
    entity.id = product.id.value;
    entity.name = product.name.value;
    entity.description = product.description?.value ?? null;
    entity.price = product.price.value;
    entity.currency = product.price.currency;
    entity.stock = product.stock.value;
    entity.thumbnail = product.thumbnail?.value ?? null;
    entity.status = product.stock.status;

    return entity;
  }

  static ormToModel(entity: ProductEntity): Product {
    return ProductBuilder.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      description: entity.description,
      stock: entity.stock,
      thumbnail: entity.thumbnail,
      currency: entity.currency,
      status: entity.status,
    });
  }

  static ormToModelPaginate(
    result: PaginationCoreResponse<ProductEntity>,
  ): PaginationCoreResponse<Product> {
    return {
      ...result,
      data: result.data.map((entity) => this.ormToModel(entity)),
    };
  }

  static modelToResponseDtoPaginate(
    result: PaginationCoreResponse<Product>,
  ): Paginated<ProductResponseDto> {
    return {
      ...result,
      data: result.data.map((product) => this.modelToResponseDto(product)),
    } as Paginated<ProductResponseDto>;
  }
}
