import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  paginationData?: {
    totalPages: number;
    currentPage: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  paginationData,
  onPageChange,
}: PaginationProps) => {
  if (!paginationData || paginationData.totalPages <= 1) {
    return null;
  }

  const {
    totalPages,
    currentPage,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = paginationData;

  const handlePrevious = () => {
    if (hasPrevPage && prevPage) {
      onPageChange(prevPage);
    }
  };

  const handleNext = () => {
    if (hasNextPage && nextPage) {
      onPageChange(nextPage);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, -1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          -1,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          -1,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          -1,
          totalPages
        );
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full relative mt-5">
      <UIPagination className="w-fit border text-black absolute right-0">
        <PaginationContent className="flex items-center gap-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={`cursor-pointer ${
                !hasPrevPage
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            />
          </PaginationItem>

          {pageNumbers.map((pageNum, index) => (
            <PaginationItem key={index}>
              {pageNum === -1 ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageClick(pageNum)}
                  className={`cursor-pointer ${
                    pageNum === currentPage
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={`cursor-pointer ${
                !hasNextPage
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </UIPagination>
    </div>
  );
};

export default PaginationComponent;
