import DataTable from "@core/components/table/DataTable";
import type { Column } from "@core/components/table/DataTable";
import type { Asset } from "@domain/entities/Asset";
import { useTranslation } from "react-i18next";
import { AssetRow } from "./AssetRow";
import { Chip } from "@core/ui/Chip";
import { useEditingSelectedAssets } from "../store/useEditingSelectedAssets";

interface AssetsTableProps {
  data?: Asset[];
  loading?: boolean;
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onQueryChange: (query: string) => void;
<<<<<<< HEAD
  onRowClick?: (row: Asset) => void;
=======
  onRowClick?: (row: Asset) => void; // opcional para comportamiento adicional
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  isEditMode?: boolean;
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
  isEditMode = false,
}: AssetsTableProps) {
  const { t } = useTranslation("assets");
  const { editingSelectedAssets, addAsset, removeAsset } =
    useEditingSelectedAssets();

<<<<<<< HEAD
=======
  // Toggle selección
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  const toggleSelect = (asset: Asset) => {
    const exists = editingSelectedAssets.find(
      (a) => a.publicId === asset.publicId
    );
    if (exists) removeAsset(asset.publicId ?? "");
    else addAsset(asset);
  };

  const columns: Column<Asset>[] = [
    {
      key: "assetName",
<<<<<<< HEAD
      header: t("columns.assetName"),
=======
      header: t("columns.assetName", "Activo"),
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      sortable: true,
      render: (_, row) => <AssetRow asset={row} />,
    },
    {
      key: "assetSymbol",
<<<<<<< HEAD
      header: t("columns.assetSymbol"),
=======
      header: t("columns.assetSymbol", "Símbolo"),
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      sortable: true,
      render: (_, row) => row.assetSymbol,
    },
    {
      key: "assetType",
<<<<<<< HEAD
      header: t("columns.assetType"),
=======
      header: t("columns.assetType", "Tipo / Categoría"),
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      sortable: false,
      render: (_, row) => (
        <div className="flex gap-2">
          {row.assetType && (
            <Chip variant="default">{t(`assetType.${row.assetType}`)}</Chip>
          )}
          <Chip variant="secondary">
            {row.category ? t(`assetCategory.${row.category.name}`) : "-"}
          </Chip>
        </div>
      ),
    },
    {
      key: "basePrice",
      header: t("columns.basePrice", "Precio"),
      sortable: true,
      render: (_, row) => row.basePrice,
    },
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
      selectable={isEditMode}
      initialSelectedIds={editingSelectedAssets.map((a) => a.publicId ?? "")}
      onRowSelectToggle={toggleSelect}
      onRowClick={(row) => {
        if (isEditMode) toggleSelect(row);
        onRowClick?.(row);
      }}
      getRowId={(row, index) => row.publicId ?? String(index)}
      onQueryChange={onQueryChange}
      total={total}
    />
  );
}
