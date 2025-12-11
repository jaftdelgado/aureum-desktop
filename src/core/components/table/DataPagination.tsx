<<<<<<< HEAD
import React from "react";
import { ButtonGroup } from "@core/components/ButtonGroup";
import { Button } from "@core/ui/Button";
=======
// src/core/components/table/DataPagination.tsx
import React from "react";
import { ButtonGroup } from "@core/components/ButtonGroup";
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

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

<<<<<<< HEAD
=======
  // -----------------------------
  // Generate dynamic page buttons
  // -----------------------------
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  const generatePages = () => {
    const pages: (number | "...")[] = [];

    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible + 2) {
<<<<<<< HEAD
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
=======
      // small set of pages → show all
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // always show 1
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      pages.push(1);

      let start = Math.max(2, page - half);
      let end = Math.min(totalPages - 1, page + half);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");

<<<<<<< HEAD
=======
      // always show last
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      pages.push(totalPages);
    }

    return pages;
  };

  const pageItems = generatePages();

  return (
<<<<<<< HEAD
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

=======
    <div className="flex justify-between items-center px-4 py-3 border-t border-outline bg-surface sticky bottom-0 z-10">
      {/* LEFT: Prev / Next */}
      <ButtonGroup>
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-3 py-1.5 bg-surface text-body border disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-3 py-1.5 bg-surface text-body border disabled:opacity-50"
        >
          Next
        </button>
      </ButtonGroup>

      {/* RIGHT: Page numbers */}
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
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
<<<<<<< HEAD
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
=======
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={`px-3 py-1.5 border text-body ${
                page === item
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface"
              }`}
            >
              {item}
            </button>
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
          )
        )}
      </ButtonGroup>
    </div>
  );
};
