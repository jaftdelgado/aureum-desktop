import React from "react";
import DataHeader from "@core/components/table/DataHeader";
import DataRow from "@core/components/table/DataRow";
import { DataMenu } from "@core/components/table/DataMenu";
import { Skeleton } from "@core/ui/Skeleton";

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  width?: string;
  className?: string;
  render?: (
    value: T[keyof T] | undefined,
    row: T,
    rowIndex: number
  ) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[] | undefined;
  columns: Column<T>[];
  className?: string;
  pagination?: boolean;
  search?: boolean;
  selectable?: boolean;
  getRowId?: (row: T, index: number) => string;
  onSelectionChange?: (selected: T[]) => void;
  onRowClick?: (row: T) => void;
  onQueryChange?: (query: string) => void;
  dense?: boolean;
  total?: number;
  loading?: boolean;
}

function defaultGetRowId<T extends object>(row: T, index: number) {
  const maybeId = (row as { [key: string]: unknown })["id"];
  const maybeUnderscoreId = (row as { [key: string]: unknown })["_id"];
  if (maybeId != null) return String(maybeId);
  if (maybeUnderscoreId != null) return String(maybeUnderscoreId);
  return String(index);
}

export default function DataTable<T extends object>({
  data,
  columns,
  className = "",
  pagination = true,
  search = true,
  selectable = false,
  getRowId = defaultGetRowId,
  onSelectionChange,
  onRowClick,
  onQueryChange,
  dense = false,
  total = 0,
  loading = false,
}: DataTableProps<T>) {
  const [localQuery, setLocalQuery] = React.useState("");
  const isDense = dense;
  const skeletonRows = 8;

  const handleQueryChange = (value: string) => {
    setLocalQuery(value);
    onQueryChange?.(value);
  };

  const selectedIds: Record<string, boolean> = {};

  // 🔹 pageData seguro: si loading, creamos objetos vacíos como placeholder
  const pageData: T[] = loading
    ? Array.from({ length: skeletonRows }, () => ({} as T))
    : data ?? [];

  const hasData = !loading && data && data.length > 0;

  return (
    <div className={`w-full ${className}`}>
      {search && onQueryChange && (
        <DataMenu
          query={localQuery}
          onQueryChange={handleQueryChange}
          total={total}
          search={search}
        />
      )}

      <div className="overflow-x-auto bg-transparent border-y border-outline">
        <table className="w-full divide-y divide-outline table-fixed">
          <DataHeader
            columns={columns}
            selectable={selectable}
            isDense={isDense}
            pageData={pageData}
            selected={selectedIds}
            getRowId={getRowId}
            page={1}
            pageSize={pageData.length}
            onToggleSelectAll={() => {}}
            sortKey={null}
            sortDir={null}
            onSort={() => {}}
          />

          <tbody className="divide-y divide-outline">
            {loading ? (
              // 🔹 Skeleton mientras carga
              pageData.map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {selectable && (
                    <td className="px-4 py-2">
                      <Skeleton
                        className={`h-4 w-4 ${isDense ? "mx-auto" : ""}`}
                      />
                    </td>
                  )}
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-2">
                      <Skeleton
                        className={`h-4 w-full ${isDense ? "mx-auto" : ""}`}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : hasData ? (
              // 🔹 Datos cargados
              data!.map((row, rowIndex) => {
                const id = getRowId(row, rowIndex);
                return (
                  <DataRow
                    key={id}
                    id={id}
                    row={row}
                    columns={columns}
                    checked={false}
                    isDense={isDense}
                    selectable={selectable}
                    onToggleSelect={() => onSelectionChange?.([row])}
                    onRowClick={() => onRowClick?.(row)}
                  />
                );
              })
            ) : (
              // 🔹 No hay datos
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-6 text-center text-body text-secondaryText"
                >
                  No hay datos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
