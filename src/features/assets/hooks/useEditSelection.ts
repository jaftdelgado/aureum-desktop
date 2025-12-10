import { useEffect, useState } from "react";
import type { Asset } from "@domain/entities/Asset";

export function useEditSelection(
  isEditMode: boolean,
  assets: Asset[] | undefined,
  selectedIds: string[]
) {
  const [editingSelectedAssets, setEditingSelectedAssets] = useState<Asset[]>(
    []
  );

  useEffect(() => {
    if (isEditMode && assets) {
      const selected = assets.filter((a) =>
        selectedIds.includes(a.publicId ?? "")
      );
      setEditingSelectedAssets(selected);
    }
  }, [isEditMode, assets, selectedIds]);

  const toggleAssets = (changedAssets: Asset[]) => {
    setEditingSelectedAssets((prev) => {
      const map = new Map(prev.map((a) => [a.publicId, a]));
      changedAssets.forEach((asset) => {
        if (map.has(asset.publicId)) {
          map.delete(asset.publicId);
        } else {
          map.set(asset.publicId, asset);
        }
      });
      return Array.from(map.values());
    });
  };

  return { editingSelectedAssets, setEditingSelectedAssets, toggleAssets };
}
