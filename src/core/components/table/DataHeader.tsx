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
    <tr className="bg-card border-b border-outline">
      {selectable && (
        <th
          className={`px-3 ${denseClass} text-body text-secondaryText font-medium whitespace-nowrap border-r border-outline`}
          style={{ width: "48px", minWidth: "48px" }}
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

      {columns.map((col, colIndex) => (
        <th
          key={String(col.key)}
          className={`px-3 ${denseClass} text-secondaryText font-medium whitespace-nowrap border-r border-outline ${
            col.sortable ? "cursor-pointer select-none" : ""
          }`}
          style={{
            width: col.width ?? "auto",
            minWidth: col.width ?? "80px",
          }}
          onClick={() => col.sortable && onSort(col)}
        >
          <div className="flex items-center text-body justify-between overflow-hidden whitespace-nowrap">
            <span className="truncate">{col.header}</span>
            {col.sortable && (
              <Icon
                icon="lucide:chevrons-up-down"
                className="w-4 h-4 flex-shrink-0 ml-2"
              />
            )}
          </div>
        </th>
      ))}
    </tr>
  );
}
