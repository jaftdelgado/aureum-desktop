import { create } from "zustand";
import type { Asset } from "@domain/entities/Asset";

interface EditingSelectedAssetsState {
  editingSelectedAssets: Asset[];
  setEditingSelectedAssets: (assets: Asset[]) => void;
  addAsset: (asset: Asset) => void;
  removeAsset: (assetId: string) => void;
  toggleAsset: (asset: Asset) => void;
}

export const useEditingSelectedAssets = create<EditingSelectedAssetsState>(
  (set, get) => ({
    editingSelectedAssets: [],
    setEditingSelectedAssets: (assets) =>
      set({ editingSelectedAssets: assets }),
    addAsset: (asset) =>
      set((state) => ({
        editingSelectedAssets: [...state.editingSelectedAssets, asset],
      })),
    removeAsset: (assetId) =>
      set((state) => ({
        editingSelectedAssets: state.editingSelectedAssets.filter(
          (a) => a.publicId !== assetId
        ),
      })),
    toggleAsset: (asset) => {
      const exists = get().editingSelectedAssets.find(
        (a) => a.publicId === asset.publicId
      );
      if (exists) get().removeAsset(asset.publicId ?? "");
      else get().addAsset(asset);
    },
  })
);
