import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Asset } from "@core/types/asset";
import { getAssets } from "@api/assetApi";

const normalizeAsset = (asset: Asset): Asset => ({
  ...asset,
  status: asset.status ?? "Active",
  createdAt: asset.createdAt ?? new Date().toISOString(),
});

export const useAssets = () => {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAssets()
      .then((data) => setAssets(data.map(normalizeAsset)))
      .catch(() => setError("assets.loadError"))
      .finally(() => setLoading(false));
  }, []);

  return {
    assets,
    loading,
    error: error ? t(error) : null,
  };
};
