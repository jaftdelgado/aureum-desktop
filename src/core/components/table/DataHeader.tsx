import { Icon } from "@iconify/react";
import type { Column } from "@core/components/table/DataTable";
import Checkbox from "@core/ui/Checkbox";

interface DataHeaderProps<T> {
  columns: Column<T>[];
  selectable: boolean;
  isDense: boolean;
  pageData: T[];
  selected: Record<string, boolean>;
  getRowId: (row: T, index: number) => string;
  page: number;
  pageSize: number;
  onToggleSelectAll: () => void;
  sortKey: keyof T | null;
  sortDir: "asc" | "desc" | null;
  onSort: (col: Column<T>) => void;
}

export default function DataHeader<T>({
  columns,
  selectable,
  isDense,
  pageData,
  selected,
  getRowId,
  page,
  pageSize,
  onToggleSelectAll,
  onSort,
}: DataHeaderProps<T>) {
  const denseClass = isDense ? "py-0.5 text-sm" : "py-1.5";

  const allSelected =
    pageData.length > 0 &&
    pageData.every((row, i) => {
      const id = getRowId(row, (page - 1) * pageSize + i);
      return selected[id];
    });

  return (
    <thead className="bg-card border-b border-outline">
      <tr>
        {selectable && (
          <th
            className={`px-3 ${denseClass} text-body text-secondaryText font-medium whitespace-nowrap border-b border-outline`}
            style={{
              width: "48px",
              minWidth: "48px",
              boxSizing: "border-box",
            }}
          >
            <div className="flex items-center justify-center">
              <Checkbox
                checked={allSelected}
                onChange={onToggleSelectAll}
                size="sm"
              />
            </div>
          </th>
        )}

        {columns.map((col, colIndex) => {
          const isFirst = colIndex === 0;
          const isLast = colIndex === columns.length - 1;

          let marginClass = "";
          if (selectable && isFirst) {
            marginClass = "ml-2";
          } else if (isFirst) {
            marginClass = "ml-2";
          }
          if (isLast) {
            marginClass += " mr-2";
          }

          return (
            <th
              key={String(col.key)}
              className={`px-3 ${denseClass} text-body text-secondaryText font-medium whitespace-nowrap border-b border-outline border-l ${marginClass} ${
                col.sortable ? "cursor-pointer select-none" : ""
              }`}
              style={{
                width: col.width ?? "auto",
                minWidth: col.width ?? "80px",
                boxSizing: "border-box",
              }}
              onClick={() => col.sortable && onSort(col)}
            >
              <div className="flex items-center justify-between overflow-hidden whitespace-nowrap">
                <span className="truncate">{col.header}</span>
                {col.sortable && (
                  <Icon
                    icon="lucide:chevrons-up-down"
                    className="text-secondaryText w-4 h-4 flex-shrink-0 ml-2"
                  />
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
