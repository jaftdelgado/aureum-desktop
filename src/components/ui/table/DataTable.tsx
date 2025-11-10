import React, { useMemo, useState } from "react";
import DataHeader from "./DataHeader";
import DataRow from "./DataRow";
import { DataMenu } from "./DataMenu";

type SortDirection = "asc" | "desc" | null;

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  width?: string; // auto, %, etc.
  className?: string;
  render?: (
    value: T[keyof T] | undefined,
    row: T,
    rowIndex: number
  ) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  pageSize?: number;
  pagination?: boolean;
  search?: boolean;
  selectable?: boolean;
  getRowId?: (row: T, index: number) => string;
  onSelectionChange?: (selected: T[]) => void;
  onRowClick?: (row: T) => void;
  dense?: boolean;
}

function defaultGetRowId<T extends object>(row: T, index: number) {
  const maybeId = (row as { [key: string]: unknown })["id"];
  const maybeUnderscoreId = (row as { [key: string]: unknown })["_id"];
  if (maybeId !== undefined && maybeId !== null) return String(maybeId);
  if (maybeUnderscoreId !== undefined && maybeUnderscoreId !== null)
    return String(maybeUnderscoreId);
  return String(index);
}

export default function DataTable<T extends object>({
  data,
  columns,
  className = "",
  pageSize = 10,
  pagination = true,
  search = true,
  selectable = false,
  getRowId = (row: T, index = 0) => defaultGetRowId(row, index),
  onSelectionChange,
  onRowClick,
  dense = false,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [page] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const effectivePageSize = pageSize;

  // Filtrado
  const filtered = useMemo(() => {
    if (!search || query.trim() === "") return data;
    const q = query.trim().toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const v = row[col.key] as T[keyof T] | undefined;
        if (v === null || v === undefined) return false;
        return String(v).toLowerCase().includes(q);
      })
    );
  }, [data, query, search, columns]);

  // Ordenamiento
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const direction = sortDir === "desc" ? -1 : 1;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const va = a[sortKey] as T[keyof T] | undefined;
      const vb = b[sortKey] as T[keyof T] | undefined;

      if (va === vb) return 0;
      if (va === undefined || va === null) return 1 * direction;
      if (vb === undefined || vb === null) return -1 * direction;
      if (typeof va === "number" && typeof vb === "number")
        return (va - vb) * direction;
      return String(va).localeCompare(String(vb)) * direction;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const total = sorted.length;

  // Paginación
  const pageData = useMemo(() => {
    if (!pagination) return sorted;
    const start = (page - 1) * effectivePageSize;
    return sorted.slice(start, start + effectivePageSize);
  }, [sorted, page, effectivePageSize, pagination]);

  const toggleSelect = (id: string) => {
    setSelected((s) => {
      const next = { ...s, [id]: !s[id] };
      if (onSelectionChange) {
        const selectedRows = data.filter((r, i) => next[getRowId(r, i)]);
        onSelectionChange(selectedRows);
      }
      return next;
    });
  };

  const toggleSelectAllOnPage = () => {
    const idsOnPage = pageData.map((r, i) =>
      getRowId(r, (page - 1) * effectivePageSize + i)
    );
    const allSelected = idsOnPage.every((id) => selected[id]);
    const next = { ...selected };
    idsOnPage.forEach((id) => (next[id] = !allSelected));
    setSelected(next);
    if (onSelectionChange) {
      const selectedRows = data.filter((r, i) => next[getRowId(r, i)]);
      onSelectionChange(selectedRows);
    }
  };

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const key = col.key;
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      } else setSortDir("asc");
    }
  };

  const isDense = dense;

  return (
    <div className={`w-full ${className}`}>
      <DataMenu
        query={query}
        onQueryChange={setQuery}
        total={total}
        search={search}
      />

      <div className="overflow-x-auto bg-transparent border-y border-outline">
        <table className="w-full divide-y divide-outline table-fixed">
          <DataHeader
            columns={columns}
            selectable={selectable}
            isDense={isDense}
            pageData={pageData}
            selected={selected}
            getRowId={getRowId}
            page={page}
            pageSize={effectivePageSize}
            onToggleSelectAll={toggleSelectAllOnPage}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
          />

          <tbody className="divide-y divide-outline">
            {pageData.length > 0 ? (
              pageData.map((row, rowIndex) => {
                const globalIndex = (page - 1) * effectivePageSize + rowIndex;
                const id = getRowId(row, globalIndex);
                const checked = Boolean(selected[id]);

                return (
                  <DataRow
                    key={id}
                    id={id}
                    row={row}
                    columns={columns}
                    checked={checked}
                    isDense={isDense}
                    selectable={selectable}
                    onToggleSelect={() => toggleSelect(id)}
                    onRowClick={() => onRowClick?.(row)}
                  />
                );
              })
            ) : (
              <tr className="bg-transparent">
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-6 text-center text-body text-secondaryText"
                  style={{ minWidth: "100%" }}
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
