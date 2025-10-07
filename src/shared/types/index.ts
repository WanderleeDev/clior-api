export type UUID = string;

export type PaginationQueryCore = {
  page?: number;
  limit?: number;
  sortBy?: [string, string][];
  searchBy?: string[];
  search?: string;
  filter?: Record<string, string | string[]>;
  select?: string[];
  cursor?: string;
  withDeleted?: boolean;
  path: string;
};

export type PaginationCoreResponse<T> = {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems?: number;
    currentPage?: number;
    totalPages?: number;
    search: string;
    select: string[];
    filter?: {
      [column: string]: string | string[];
    };
    cursor?: string;
  };
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
};
