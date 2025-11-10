import React, { useEffect, useState } from "react";
import { PageHeader } from "@ui/PageHeader";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/Button";
import DataTable from "@ui/table/DataTable";
import type { Column } from "@ui/table/DataTable";
import type { Asset } from "types/asset";
import { getAssets } from "@api/assetApi";

export const AssetPage: React.FC = () => {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAssets()
      .then((data) => {
        const enriched = data.map((a) => ({
          ...a,
          status: a.status ?? "Active",
          createdAt: a.createdAt ?? new Date().toISOString(),
        }));
        setAssets(enriched);
      })
      .catch((err) => {
        console.error("Error fetching assets:", err);
        setError(t("assets.loadError") || "Failed to load assets from API.");
      })
      .finally(() => setLoading(false));
  }, [t]);

  const columns: Column<Asset>[] = [
    {
      key: "assetPicUrl",
      header: t("assets.table.image") || "Image",
      render: (_, row) =>
        row.assetPicUrl ? (
          <img
            src={row.assetPicUrl}
            alt={row.assetName}
            className="h-4 w-4 object-cover rounded"
          />
        ) : (
          <div className="h-4 w-4 bg-gray-200 rounded" />
        ),
      width: "10%",
    },
    {
      key: "assetSymbol",
      header: t("assets.table.symbol") || "Symbol",
      sortable: true,
      width: "15%",
    },
    {
      key: "assetName",
      header: t("assets.table.name") || "Name",
      sortable: true,
      width: "25%",
    },
    {
      key: "assetType",
      header: t("assets.table.type") || "Type",
      sortable: true,
      width: "15%",
    },
    {
      key: "basePrice",
      header: t("assets.table.basePrice") || "Base Price",
      sortable: true,
      width: "15%",
    },
    {
      key: "category",
      header: t("assets.table.category") || "Category",
      render: (_, row) => row.category?.categoryKey ?? "N/A",
      width: "20%",
    },
  ];

  if (loading) return <div>{t("assets.loading") || "Loading assets..."}</div>;

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("assets.title")}
        description={t("assets.description")}
        actions={
          <Button variant="default" icon="lucide:plus" className="px-4 py-2">
            {t("assets.newAssetButton")}
          </Button>
        }
      />

      {error && (
        <div className="text-red-500 mb-3 px-4 py-2 bg-red-100 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-1 w-full">
        <div className="w-[30%] flex items-center justify-center border-r border-outline"></div>

        <div className="w-[70%] flex flex-col h-full">
          <div className="flex-1 overflow-x-auto">
            <DataTable<Asset>
              data={assets}
              columns={columns}
              selectable
              search
              onRowClick={(row) => console.log("Clicked asset:", row)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
