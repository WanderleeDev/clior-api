import { updateGlobalConfig } from 'nestjs-paginate';

export const DEFAULT_PAGINATION_CONFIG = {
  defaultLimit: 20,
  defaultMaxLimit: 60,
};

export const setupPaginationConfig = () =>
  updateGlobalConfig(DEFAULT_PAGINATION_CONFIG);
