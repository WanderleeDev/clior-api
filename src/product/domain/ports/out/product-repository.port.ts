import { PaginationQueryCore, PaginationCoreResponse } from 'src/shared/types';
import { Product } from '../../model/product';

export abstract class ProductRepositoryPort {
  abstract save(product: Product): Promise<Product>;

  abstract readById(id: string): Promise<Product | null>;

  abstract findAll(
    query: PaginationQueryCore,
  ): Promise<PaginationCoreResponse<Product>>;

  abstract update(product: Product): Promise<Product>;

  abstract deleteById(id: string): Promise<boolean>;

  abstract exists(id: string): Promise<boolean>;

  abstract existsByName(name: string): Promise<boolean>;
}
