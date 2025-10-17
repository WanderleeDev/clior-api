import { Injectable } from '@nestjs/common';
import { ProductRepositoryPort } from 'src/modules/product/domain/ports/out/product-repository.port';
import { ProductResponseDto } from '../dto';
import { ProductMapper } from '../mapper/product.mapper';
import { PaginationQueryCore } from 'src/shared/types';
import { Paginated } from 'nestjs-paginate';

@Injectable()
export class FindAllProducts {
  constructor(private readonly repo: ProductRepositoryPort) {}

  async exec(
    filters: PaginationQueryCore,
  ): Promise<Paginated<ProductResponseDto>> {
    const result = await this.repo.findAll(filters);

    return ProductMapper.modelToResponseDtoPaginate(result);
  }
}
