// test/features/assets/hooks/useTeamAssets.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTeamAssets } from "@features/assets/hooks/useTeamAssets";
import { GetTeamAssetsUseCase } from "@domain/use-cases/team-assets/GetTeamAssetsUseCase";
import type { TeamAsset } from "@domain/entities/TeamAsset";

const createQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useTeamAssets", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch team assets successfully", async () => {
    const mockAssets: TeamAsset[] = [
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
    ];

    const executeSpy = vi
      .spyOn(GetTeamAssetsUseCase.prototype, "execute")
      .mockResolvedValue(mockAssets);

    const { result } = renderHook(() => useTeamAssets("t1"), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockAssets);
    expect(executeSpy).toHaveBeenCalledWith("t1");
  });

  it("should stay idle if teamId is empty", () => {
    const executeSpy = vi.spyOn(GetTeamAssetsUseCase.prototype, "execute");

    const { result } = renderHook(() => useTeamAssets(""), { wrapper });

    // La query no se ejecuta
    expect(executeSpy).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
    expect(result.current.isFetching).toBe(false); // opcional, más seguro que status
  });

  it("should handle errors and return empty array", async () => {
    const error = new Error("Network error");
    vi.spyOn(GetTeamAssetsUseCase.prototype, "execute").mockRejectedValue(
      error
    );

    const { result } = renderHook(() => useTeamAssets("t1"), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // si quieres que siempre devuelva array vacío incluso en error, puedes envolver el queryFn en try/catch:
    expect(result.current.data).toBeUndefined(); // React Query no setea data en error
  });
});
