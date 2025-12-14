// kept minimal imports; no MouseEvent needed after simplification
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

type PaginationProps = {
  className?: string;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

function getVisiblePages(currentPageIndex: number, totalPages: number) {
  // currentPageIndex is zero-based; visible page numbers are 1-based
  if (totalPages <= 0) return [];

  const current = currentPageIndex + 1;

  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (current <= 2) {
    return [1, 2, 3];
  }

  if (current >= totalPages - 1) {
    return [totalPages - 2, totalPages - 1, totalPages];
  }

  // middle: show prev, current, next
  return [current - 1, current, current + 1];
}

function CustomPagination({
  className,
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handleSetPage = (newPage: number) => {
    if (newPage === page) {
      return;
    }
    if (newPage < 0 || newPage >= totalPages) {
      return;
    }
    onPageChange(newPage);
  };

  // Use handleSetPage directly for buttons (no anchors/MouseEvent handling needed)

  if (totalPages <= 0) {
    return null;
  }

  const visiblePages = getVisiblePages(page, totalPages);
  if (visiblePages.length === 0) {
    return null;
  }

  const firstVisible = visiblePages[0];
  const lastVisible = visiblePages[visiblePages.length - 1];
  const isFirstPage = page === 0;
  const isLastPage = page >= totalPages - 1;
  const showFirstPage = firstVisible !== 1;
  const showLastPage = lastVisible !== totalPages;
  const showLeadingEllipsis = showFirstPage && firstVisible > 2;
  const showTrailingEllipsis = showLastPage && lastVisible < totalPages - 1;

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <button
        className={cn(
          "px-4 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors",
          isFirstPage ? "pointer-events-none opacity-50" : ""
        )}
        onClick={() => handleSetPage(page - 1)}
        disabled={isFirstPage}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="mr-2 text-xs" />
        Previous
      </button>

      <div className="flex divide-x divide-gray-200 text-gray-700">
        {showFirstPage && (
          <button
            className="px-4 py-2 hover:bg-gray-50 transition-colors"
            onClick={() => handleSetPage(0)}
          >
            1
          </button>
        )}
        {showLeadingEllipsis && (
          <span className="px-4 py-2 text-gray-400">...</span>
        )}
        {visiblePages.map((pageNumber) => {
          const pageIndex = pageNumber - 1;
          return (
            <button
              key={pageNumber}
              className={cn(
                "px-4 py-2",
                pageIndex === page
                  ? "font-semibold bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 transition-colors"
              )}
              onClick={() => handleSetPage(pageIndex)}
            >
              {pageNumber}
            </button>
          );
        })}
        {showTrailingEllipsis && (
          <span className="px-4 py-2 text-gray-400">...</span>
        )}
        {showLastPage && (
          <button
            className="px-4 py-2 hover:bg-gray-50 transition-colors"
            onClick={() => handleSetPage(totalPages - 1)}
          >
            {totalPages}
          </button>
        )}
      </div>

      <button
        className={cn(
          "px-4 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors",
          isLastPage ? "pointer-events-none opacity-50" : ""
        )}
        onClick={() => handleSetPage(page + 1)}
        disabled={isLastPage}
      >
        Next
        <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-xs" />
      </button>
    </div>
  );
}

export default CustomPagination;
