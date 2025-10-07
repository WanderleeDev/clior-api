import { Injectable } from '@nestjs/common';
import { ProductRepositoryPort } from 'src/product/domain/ports/out/product-repository.port';
import { ProductMapper } from '../mapper/product.mapper';
import { ProductResponseDto } from '../dto';

@Injectable()
export class FindProductById {
  constructor(private readonly repo: ProductRepositoryPort) {}

  async exec(id: string): Promise<ProductResponseDto> {
    const product = await this.repo.readById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    return ProductMapper.modelToResponseDto(product);
  }
}
