type PaginationData = {
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export const handleSetPaginationData = (
  data: unknown
): {
  totalPages: number;
  currentPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
} => {
  const {
    totalPages,
    page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = data as PaginationData;

  return {
    totalPages,
    currentPage: page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  };
};
