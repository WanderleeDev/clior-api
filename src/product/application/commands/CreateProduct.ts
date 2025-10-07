import { ConflictException, Injectable } from '@nestjs/common';
import { ProductRepositoryPort } from 'src/product/domain/ports/out/product-repository.port';
import { CreateProductDto, ProductResponseDto } from '../dto';
import { ProductBuilder } from 'src/product/domain/product.builder';
import { StockStatus } from 'src/product/domain/enum';
import { ProductMapper } from '../mapper/product.mapper';
import { generateUuid } from 'src/shared/utils/generateUuid';

@Injectable()
export class CreateProduct {
  constructor(private readonly repo: ProductRepositoryPort) {}

  async exec(dto: CreateProductDto): Promise<ProductResponseDto> {
    const exists = await this.repo.existsByName(dto.name);

    if (exists) {
      throw new ConflictException('Product already exists');
    }

    const productId = await this.generateId();
    const product = ProductBuilder.create({
      id: productId,
      name: dto.name,
      description: dto.description ?? null,
      price: dto.price,
      currency: dto.currency,
      stock: dto.stock,
      thumbnail: dto.thumbnail ?? null,
      status: StockStatus.AVAILABLE,
    });
    await this.repo.save(product);
    const responseDto = ProductMapper.modelToResponseDto(product);

    return Promise.resolve(responseDto);
  }

  private async generateId(): Promise<string> {
    while (true) {
      const id = generateUuid();

      if (!(await this.repo.exists(id))) {
        return id;
      }
    }
  }
}
