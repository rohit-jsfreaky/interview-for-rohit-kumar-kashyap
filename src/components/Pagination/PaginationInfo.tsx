interface PaginationInfoProps {
  paginationData?: {
    totalPages: number;
    currentPage: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
  totalDocs?: number;
  limit?: number;
}

const PaginationInfo = ({
  paginationData,
  totalDocs,
  limit,
}: PaginationInfoProps) => {
  if (!paginationData || !totalDocs) {
    return null;
  }

  const { currentPage } = paginationData;
  const startItem = (currentPage - 1) * (limit || 12) + 1;
  const endItem = Math.min(currentPage * (limit || 12), totalDocs);

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalDocs} results
      </p>
      <p className="text-sm text-gray-600">
        Page {currentPage} of {paginationData.totalPages}
      </p>
    </div>
  );
};

export default PaginationInfo;
