import { ProductRepositoryPort } from 'src/product/domain/ports/out/product-repository.port';
import { Injectable } from '@nestjs/common';
import { ProductResponseDto, UpdateProductDto } from '../dto';
import { ProductMapper } from '../mapper/product.mapper';

@Injectable()
export class UpdateProduct {
  constructor(private readonly repo: ProductRepositoryPort) {}

  async exec(id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.repo.readById(id);

    if (!product) throw new Error('Product not found');

    const productUpdated = product.update(dto);

    if (!productUpdated.isSuccess) throw new Error('Product not updated');

    await this.repo.update(productUpdated.data);

    return ProductMapper.modelToResponseDto(productUpdated.data);
  }
}
