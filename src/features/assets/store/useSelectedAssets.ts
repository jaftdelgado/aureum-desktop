<<<<<<< HEAD
=======
// src/features/assets/store/useSelectedAssets.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import { create } from "zustand";

interface SelectedAssetsState {
  selectedAssetIds: string[];
  setSelectedAssetIds: (ids: string[]) => void;
}

export const useSelectedAssets = create<SelectedAssetsState>((set) => ({
  selectedAssetIds: [],
  setSelectedAssetIds: (ids: string[]) => set({ selectedAssetIds: ids }),
}));
