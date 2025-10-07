import { Injectable } from '@nestjs/common';
import { ProductRepositoryPort } from 'src/product/domain/ports/out/product-repository.port';
import { Product } from 'src/product/domain/model/product';
import { ProductMapper } from 'src/product/application/mapper/product.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { paginate } from 'nestjs-paginate';
import { PRODUCT_PAGINATION_CONFIG } from '../../paginate.config';
import { PaginationCoreResponse, PaginationQueryCore } from 'src/shared/types';

@Injectable()
export class ProductRepositoryAdapter implements ProductRepositoryPort {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async save(product: Product): Promise<Product> {
    const entity = ProductMapper.modelToOrm(product);
    const savedEntity = await this.repository.save(entity);

    return ProductMapper.ormToModel(savedEntity);
  }

  async readById(id: string): Promise<Product | null> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) return null;

    return ProductMapper.ormToModel(entity);
  }

  async findAll(
    query: PaginationQueryCore,
  ): Promise<PaginationCoreResponse<Product>> {
    const result = await paginate(
      query,
      this.repository,
      PRODUCT_PAGINATION_CONFIG,
    );

    return ProductMapper.ormToModelPaginate(result);
  }

  async update(product: Product): Promise<Product> {
    const entity = ProductMapper.modelToOrm(product);
    const updated = await this.repository.save(entity);

    return ProductMapper.ormToModel(updated);
  }

  async deleteById(id: string): Promise<boolean> {
    const entity = await this.repository.softDelete({ id });

    return entity.affected !== undefined && entity.affected > 0;
  }

  async existsByName(name: string): Promise<boolean> {
    return this.repository.exists({ where: { name } });
  }

  async exists(id: string): Promise<boolean> {
    return this.repository.exists({ where: { id } });
  }
}
