import { ProductRepositoryPort } from 'src/product/domain/ports/out/product-repository.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteProduct {
  constructor(private readonly repo: ProductRepositoryPort) {}

  async exec(id: string): Promise<void> {
    const isDeleted = await this.repo.deleteById(id);

    if (!isDeleted) throw new Error('Product not found');

    return;
  }
}
