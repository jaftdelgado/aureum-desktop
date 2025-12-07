import type { Column } from "@core/components/table/DataTable";
import Checkbox from "@core/ui/Checkbox";

interface DataRowProps<T> {
  id: string;
  row: T;
  columns: Column<T>[];
  checked: boolean;
  selectable: boolean;
  onToggleSelect: () => void;
  onRowClick: () => void;
  isDense: boolean;
}

export default function DataRow<T>({
  row,
  columns,
  checked,
  selectable,
  onToggleSelect,
  onRowClick,
  isDense,
}: DataRowProps<T>) {
  return (
    <tr
      className="bg-transparent text-body text-secondaryText hover:bg-sidebarHoverBtn cursor-pointer transition-colors"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName.toLowerCase() === "input" || target.closest("label"))
          return;
        onRowClick();
      }}
    >
      {selectable && (
        <td
          className={`px-3 ${
            isDense ? "py-0.5" : "py-1.5"
          } text-body whitespace-nowrap border-b border-outline`}
          style={{
            width: "48px",
            minWidth: "48px",
            boxSizing: "border-box",
          }}
        >
          <div className="flex items-center justify-center">
            <Checkbox checked={checked} onChange={onToggleSelect} size="sm" />
          </div>
        </td>
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
          <td
            key={String(col.key)}
            className={`px-3 ${
              isDense ? "py-0.5" : "py-1.5"
            } text-secondaryText border-b border-outline border-l ${marginClass}`}
            style={{
              width: col.width ?? "auto",
              minWidth: col.width ?? "80px",
              boxSizing: "border-box",
            }}
          >
            <div className="truncate overflow-hidden whitespace-nowrap">
              {col.render
                ? col.render(row[col.key], row, colIndex)
                : String(row[col.key] ?? "-")}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
