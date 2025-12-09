// src/features/assets/store/useSelectedAssets.ts
import { create } from "zustand";

interface SelectedAssetsState {
  selectedAssetIds: string[];
  setSelectedAssetIds: (ids: string[]) => void;
}

export const useSelectedAssets = create<SelectedAssetsState>((set) => ({
  selectedAssetIds: [],
  setSelectedAssetIds: (ids: string[]) => set({ selectedAssetIds: ids }),
}));
