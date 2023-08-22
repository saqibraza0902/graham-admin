import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const displayPages = 4;

  let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
  let endPage = Math.min(totalPages, startPage + displayPages - 1);

  if (endPage - startPage + 1 < displayPages) {
    startPage = Math.max(1, endPage - displayPages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <nav className="flex items-center justify-center my-4">
      <ul className="flex space-x-2">
        <li>
          <button
            className="bg-[#959EAD] text-white disabled:cursor-not-allowed disabled:bg-[#b6bcc5] rounded px-2 py-1 disabled:text-brand_white-500"
            disabled={currentPage <= 1 ? true : false}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Prev
          </button>
        </li>

        {startPage > 1 && (
          <li>
            <button
              className="border rounded px-2 py-1"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
          </li>
        )}

        {startPage > 2 && (
          <li>
            <span className="px-2 py-1">...</span>
          </li>
        )}

        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              className={`border rounded px-2 py-1 ${
                page === currentPage ? "bg-[#FFC10E] text-white" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {endPage < totalPages - 1 && (
          <li>
            <span className="px-2 py-1">...</span>
          </li>
        )}

        {endPage < totalPages && (
          <li>
            <button
              className="border rounded px-2 py-1"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}
        <li>
          <button
            className="bg-[#959EAD] text-white disabled:cursor-not-allowed disabled:bg-[#b6bcc5] rounded px-2 py-1 disabled:text-brand_white-500"
            disabled={currentPage < totalPages ? false : true}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
