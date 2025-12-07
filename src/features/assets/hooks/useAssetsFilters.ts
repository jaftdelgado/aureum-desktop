import { create } from "zustand";
import type { Asset } from "@domain/entities/Asset";

interface AssetsFiltersState {
  page: number;
  perPage: number;
  search: string;
  sortKey: keyof Asset | null;
  sortDir: "asc" | "desc" | null;

  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setSearch: (term: string) => void;
  setSort: (key: keyof Asset | null, dir: "asc" | "desc" | null) => void;
}

export const useAssetsFilters = create<AssetsFiltersState>((set) => ({
  page: 1,
  perPage: 20,
  search: "",
  sortKey: null,
  sortDir: null,

  setPage: (page) => set({ page }),
  setPerPage: (perPage) => set({ perPage }),
  setSearch: (search) => set({ search }),
  setSort: (sortKey, sortDir) => set({ sortKey, sortDir }),
}));
