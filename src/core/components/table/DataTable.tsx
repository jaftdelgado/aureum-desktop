// src/core/components/table/DataTable.tsx
import React, { useEffect, useState } from "react";
import DataHeader from "@core/components/table/DataHeader";
import DataRow from "@core/components/table/DataRow";
import { DataMenu } from "@core/components/table/DataMenu";
import { DataPagination } from "@core/components/table/DataPagination";
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
  page?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
  onRowSelectToggle?: (row: T) => void;
  initialSelectedIds?: string[];
}

function defaultGetRowId<T extends object>(row: T, index: number) {
  const maybeId = (row as any)["id"];
  const maybeUnderscoreId = (row as any)["_id"];
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
  page = 1,
  perPage = 20,
  onPageChange,
  onRowSelectToggle,
  initialSelectedIds,
}: DataTableProps<T>) {
  const [localQuery, setLocalQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!initialSelectedIds) return;
    setSelectedIds((prev) => {
      const next = new Set(initialSelectedIds);
      let changed = false;
      if (prev.size !== next.size) changed = true;
      else {
        for (const id of next) if (!prev.has(id)) changed = true;
      }
      return changed ? next : prev;
    });
  }, [initialSelectedIds]);

  const toggleSelect = (id: string, _row: T) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);

      onSelectionChange?.(
        (data ?? []).filter((item, idx) => next.has(getRowId(item, idx)))
      );

      return next;
    });
  };

  const handleQueryChange = (value: string) => {
    setLocalQuery(value);
    onQueryChange?.(value);
  };

  const skeletonRows = perPage;
  const pageData = loading
    ? Array.from({ length: skeletonRows }, () => ({} as T))
    : data ?? [];

  const hasData = !loading && data && data.length > 0;

  return (
    <div className={`w-full h-full flex flex-col min-h-0 ${className}`}>
      {search && onQueryChange && (
<<<<<<< HEAD
        <div className="sticky top-0 z-30 border-b border-outline">
=======
        <div className="sticky top-0 z-30 bg-background border-b border-outline">
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
          <DataMenu
            query={localQuery}
            onQueryChange={handleQueryChange}
            total={total}
            search={search}
          />
        </div>
      )}

<<<<<<< HEAD
      <div className="flex-1 min-h-0 overflow-y-auto scroll-container">
=======
      <div className="flex-1 min-h-0 overflow-y-auto">
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
        <table className="w-full border-collapse table-fixed">
          <colgroup>
            {selectable && <col style={{ width: "48px" }} />}
            {columns.map((col, i) => (
              <col key={i} style={{ width: col.width ?? "auto" }} />
            ))}
          </colgroup>

<<<<<<< HEAD
          <thead className="sticky top-0 z-20">
=======
          <thead className="sticky top-0 z-20 bg-background">
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
            <DataHeader
              columns={columns}
              selectable={selectable}
              isDense={dense}
              pageData={pageData}
              selected={{}}
              getRowId={getRowId}
              page={page}
              pageSize={pageData.length}
              onToggleSelectAll={() => {}}
              sortKey={null}
              sortDir={null}
              onSort={() => {}}
            />
          </thead>

          <tbody className="divide-y divide-outline">
            {loading ? (
              pageData.map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {selectable && (
                    <td className="px-4 py-2">
                      <Skeleton className="h-4 w-4" />
                    </td>
                  )}
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-4 py-2">
<<<<<<< HEAD
                      <Skeleton className="h-4 w-8" />
=======
                      <Skeleton className="h-4 w-full" />
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
                    </td>
                  ))}
                </tr>
              ))
            ) : hasData ? (
              pageData.map((row, rowIndex) => {
                const id = getRowId(row, rowIndex);
                return (
                  <DataRow
                    key={id}
                    id={id}
                    row={row}
                    columns={columns}
                    checked={selectedIds.has(id)}
                    isDense={dense}
                    selectable={selectable}
                    onToggleSelect={(): void => {
                      if (onRowSelectToggle) {
                        onRowSelectToggle(row);
                      } else {
                        toggleSelect(id, row);
                      }
                    }}
                    onRowClick={() => onRowClick?.(row)}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-6 text-center text-secondaryText"
                >
                  No hay datos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && onPageChange && total > perPage && (
<<<<<<< HEAD
        <div className="sticky bottom-0 z-30 border-t border-outline">
=======
        <div className="sticky bottom-0 z-30 bg-background border-t border-outline">
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
          <DataPagination
            page={page}
            perPage={perPage}
            total={total}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
