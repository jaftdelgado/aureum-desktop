import type { Asset } from "../modules/core/types/asset";

export const getAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`/assets`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching assets: ${errorText}`);
  }

  const data: Asset[] = await response.json();
  return data.map((asset) => ({
    ...asset,
    createdAt: asset.createdAt ?? new Date().toISOString(),
  }));
};

export const createAsset = async (asset: Partial<Asset>): Promise<Asset> => {
  const response = await fetch(`/assets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(asset),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error creating asset: ${errorText}`);
  }

  const created: Asset = await response.json();
  created.createdAt = created.createdAt ?? new Date().toISOString();
  return created;
};

export const getAssetById = async (id: number): Promise<Asset> => {
  const response = await fetch(`/assets/${id}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching asset with id ${id}: ${errorText}`);
  }

  const asset: Asset = await response.json();
  asset.createdAt = asset.createdAt ?? new Date().toISOString();
  return asset;
};
