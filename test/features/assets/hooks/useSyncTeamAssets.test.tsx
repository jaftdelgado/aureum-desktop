import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSyncTeamAssets } from "@features/assets/hooks/useSyncTeamAssets";
import { SyncTeamAssetsUseCase } from "@domain/use-cases/team-assets/SyncTeamAssetsUseCase";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useSyncTeamAssets", () => {
  it("calls execute and invalidates queries on success", async () => {
    const mockExecute = vi
      .spyOn(SyncTeamAssetsUseCase.prototype, "execute")
      .mockResolvedValue([
        {
          teamAssetId: 1,
          publicId: "ta1",
          teamId: "t1",
          assetId: "a1",
          currentPrice: 100,
          hasMovements: false,
          asset: {
            publicId: "a1",
            assetName: "Asset 1",
            assetSymbol: "A1",
            assetType: "Stock",
            basePrice: 100,
          },
        },
      ]);

    const { result } = renderHook(() => useSyncTeamAssets(), {
      wrapper,
    });

    await result.current.mutateAsync({
      teamId: "t1",
      selectedAssetIds: ["a1"],
    });

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalled();
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
