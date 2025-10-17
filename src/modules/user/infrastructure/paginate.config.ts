import { PaginateConfig, FilterOperator } from 'nestjs-paginate';
import { UserEntity } from './adapters/out/user.entity';
import { DEFAULT_PAGINATION_CONFIG } from 'src/shared/infra/config/pagination.config';

export const USER_PAGINATION_CONFIG: PaginateConfig<UserEntity> = {
  sortableColumns: ['username', 'createdAt', 'updatedAt'],
  defaultSortBy: [['createdAt', 'DESC']],
  searchableColumns: ['username'],
  filterableColumns: {
    username: [FilterOperator.EQ, FilterOperator.ILIKE],
    createdAt: [FilterOperator.GTE, FilterOperator.LTE],
  },
  defaultLimit: DEFAULT_PAGINATION_CONFIG.defaultLimit,
  maxLimit: DEFAULT_PAGINATION_CONFIG.defaultMaxLimit,
} as const;
