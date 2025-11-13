import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@ui/PageHeader";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/Button";
import DataTable from "@ui/table/DataTable";
import type { Column } from "@ui/table/DataTable";
import type { Asset } from "types/asset";
import { getAssets } from "@api/assetApi";

export const AssetPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      key: "assetSymbol",
      header: t("assets.table.symbol"),
      sortable: true,
      width: "15%",
    },
    {
      key: "assetName",
      header: t("assets.table.asset"),
      sortable: true,
      width: "35%",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.assetPicUrl ? (
            <img
              src={row.assetPicUrl}
              alt={row.assetName}
              className="h-5 w-5 object-cover rounded-full"
            />
          ) : (
            <div className="h-5 w-5 bg-gray-200 rounded-full" />
          )}
          <span className="font-medium text-foreground">{row.assetName}</span>
        </div>
      ),
    },
    {
      key: "assetType",
      header: t("assets.table.type"),
      sortable: true,
      width: "15%",
    },
    {
      key: "basePrice",
      header: t("assets.table.basePrice"),
      sortable: true,
      width: "15%",
    },
    {
      key: "category",
      header: t("assets.table.category"),
      render: (_, row) => row.category?.categoryKey ?? "N/A",
      width: "20%",
    },
  ];

  if (loading) return <div>{t("assets.loading")}</div>;

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("assets.title")}
        description={t("assets.description")}
        actions={
          <Button
            variant="default"
            icon="lucide:plus"
            className="px-4 py-2"
            onClick={() => navigate("/dashboard/assets/register")}
          >
            {t("assets.newAssetButton")}
          </Button>
        }
      />

      {error && (
        <div className="text-red-500 mb-3 px-4 py-2 bg-red-100 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-1 w-full flex-col md:flex-row">
        <div className="w-full md:w-[30%] flex items-center justify-center border-r border-outline"></div>

        {/* Tabla */}
        <div className="w-full md:w-[70%] flex flex-col h-full">
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
