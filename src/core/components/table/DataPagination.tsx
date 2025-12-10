import React from "react";
import { ButtonGroup } from "@core/components/ButtonGroup";
import { Button } from "@core/ui/Button";

interface DataPaginationProps {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const DataPagination: React.FC<DataPaginationProps> = ({
  page,
  perPage,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const generatePages = () => {
    const pages: (number | "...")[] = [];

    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      let start = Math.max(2, page - half);
      let end = Math.min(totalPages - 1, page + half);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pageItems = generatePages();

  return (
    <div className="flex justify-between items-center py-3 px-component-x border-outline bg-surface sticky bottom-0 z-10">
      <ButtonGroup>
        <Button onClick={handlePrev} disabled={page === 1} variant="secondary">
          Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={page === totalPages}
          variant="secondary"
        >
          Next
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        {pageItems.map((item, idx) =>
          item === "..." ? (
            <div
              key={`dots-${idx}`}
              className="px-3 py-1.5 bg-muted text-secondaryText border"
            >
              …
            </div>
          ) : (
            <Button
              key={item}
              onClick={() => onPageChange(item)}
              variant="secondary"
              className={
                page === item ? "bg-primary text-primary-foreground" : ""
              }
            >
              {item}
            </Button>
          )
        )}
      </ButtonGroup>
    </div>
  );
};
