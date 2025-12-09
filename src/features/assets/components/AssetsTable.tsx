import DataTable from "@core/components/table/DataTable";
import type { Column } from "@core/components/table/DataTable";
import type { Asset } from "@domain/entities/Asset";
import { Chip } from "@core/ui/Chip";
import { useTranslation } from "react-i18next";

interface AssetsTableProps {
  data?: Asset[];
  loading?: boolean;
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onQueryChange: (query: string) => void;
  onRowClick?: (row: Asset) => void;
}

export function AssetsTable({
  data,
  loading,
  page,
  perPage,
  total,
  onPageChange,
  onQueryChange,
  onRowClick,
}: AssetsTableProps) {
  const { t } = useTranslation("assets");

  const columns: Column<Asset>[] = [
    {
      key: "assetName",
      header: "Activo",
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.assetPicUrl && (
            <img
              src={row.assetPicUrl}
              alt={row.assetName}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <span>{row.assetName}</span>
        </div>
      ),
    },
    { key: "assetSymbol", header: "Símbolo", sortable: true },
    {
      key: "assetType",
      header: "Tipo / Categoría",
      sortable: false,
      render: (_, row) => (
        <div className="flex gap-2">
          {row.category && (
            <Chip variant="default">{t(`assetType.${row.assetType}`)}</Chip>
          )}
          <Chip variant="secondary">
            {row.category ? t(`assetCategory.${row.category.name}`) : "-"}
          </Chip>
        </div>
      ),
    },
    { key: "basePrice", header: "Precio", sortable: true },
  ];

  return (
    <DataTable<Asset>
      data={data}
      columns={columns}
      pagination
      page={page}
      perPage={perPage}
      onPageChange={onPageChange}
      search
      loading={loading}
      onRowClick={onRowClick}
      onQueryChange={onQueryChange}
      total={total}
    />
  );
}
