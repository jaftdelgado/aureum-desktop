import React from "react";
import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAssetsList } from "@features/assets/hooks/useAssetsList";
import * as useAssetsFiltersModule from "@features/assets/hooks/useAssetsFilters";
import { GetAssetsUseCase } from "@domain/use-cases/assets/GetAssetsUseCase";

describe("useAssetsList", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should fetch assets with filters and selected ids", async () => {
    const mockFilters = {
      page: 1,
      perPage: 20,
      search: "",
      sortKey: null,
      sortDir: null,
      setPage: vi.fn(),
      setPerPage: vi.fn(),
      setSearch: vi.fn(),
      setSort: vi.fn(),
    };

    vi.spyOn(useAssetsFiltersModule, "useAssetsFilters").mockReturnValue(
      mockFilters as any
    );

    const mockData = {
      data: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 20,
        totalPages: 0,
        currentPage: 1,
      },
    };
    vi.spyOn(GetAssetsUseCase.prototype, "execute").mockResolvedValue(mockData);

    const { result } = renderHook(() => useAssetsList(["asset-1"]), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(GetAssetsUseCase.prototype.execute).toHaveBeenCalled();
    expect(result.current.data).toEqual(mockData);
  });
});
