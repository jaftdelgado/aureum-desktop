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
      className="bg-transparent hover:bg-card cursor-pointer transition-colors"
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
          } border-r border-outline`}
          style={{ width: "48px", minWidth: "48px" }}
        >
          <div className="flex items-center justify-center">
            <Checkbox checked={checked} onChange={onToggleSelect} size="sm" />
          </div>
        </td>
      )}

      {columns.map((col) => (
        <td
          key={String(col.key)}
          className={`px-component-x ${
            isDense ? "py-0.5" : "py-1.5"
          } border-r border-outline`}
          style={{
            width: col.width ?? "auto",
            minWidth: col.width ?? "80px",
            boxSizing: "border-box",
          }}
        >
          <div className="truncate text-body text-secondaryText overflow-hidden whitespace-nowrap">
            {col.render
              ? col.render(row[col.key], row, 0)
              : String(row[col.key] ?? "-")}
          </div>
        </td>
      ))}
    </tr>
  );
}
