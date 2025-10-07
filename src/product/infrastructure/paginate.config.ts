import { PaginateConfig, FilterOperator } from 'nestjs-paginate';
import { ProductEntity } from './adapters/out/product.entity';
import { DEFAULT_PAGINATION_CONFIG } from 'src/shared/infra/config/pagination.config';

export const PRODUCT_PAGINATION_CONFIG: PaginateConfig<ProductEntity> = {
  sortableColumns: ['price', 'stock', 'name', 'currency', 'status'],
  defaultSortBy: [['name', 'ASC']],
  searchableColumns: ['name'],
  filterableColumns: {
    price: [FilterOperator.GTE, FilterOperator.LTE],
    stock: [FilterOperator.GTE, FilterOperator.LTE],
    currency: [FilterOperator.EQ],
    status: [FilterOperator.EQ],
  },
  defaultLimit: DEFAULT_PAGINATION_CONFIG.defaultLimit,
  maxLimit: DEFAULT_PAGINATION_CONFIG.defaultMaxLimit,
} as const;
