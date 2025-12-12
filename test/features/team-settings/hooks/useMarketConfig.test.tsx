import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMarketConfig } from "@features/team-settings/hooks/useMarketConfig";
import { GetMarketConfigUseCase } from "@domain/use-cases/market-config/GetMarketConfigUseCase";
import { defaultMarketConfig } from "@features/team-settings/constants/marketConfigDefaults";
import type { MarketConfig } from "@domain/entities/MarketConfig";

const createQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useMarketConfig", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch market config successfully", async () => {
    const mockConfig: MarketConfig = {
      publicId: "mc1",
      teamId: "t1",
      initialCash: 10000,
      currency: "USD",
      marketVolatility: "Medium",
      marketLiquidity: "High",
      thickSpeed: "Medium",
      transactionFee: "Low",
      eventFrequency: "Low",
      dividendImpact: "Medium",
      crashImpact: "High",
      allowShortSelling: true,
    };

    const executeSpy = vi
      .spyOn(GetMarketConfigUseCase.prototype, "execute")
      .mockResolvedValue(mockConfig);

    const { result } = renderHook(() => useMarketConfig("t1"), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockConfig);
    expect(executeSpy).toHaveBeenCalledWith("t1");
  });

  it("should return default config if teamPublicId is empty", async () => {
    const executeSpy = vi.spyOn(GetMarketConfigUseCase.prototype, "execute");

    const { result } = renderHook(() => useMarketConfig(""), { wrapper });

    // Esperar que el hook devuelva default
    await waitFor(() =>
      expect(result.current.data).toEqual(defaultMarketConfig)
    );

    expect(executeSpy).not.toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(true);
  });

  it("should return default config on error", async () => {
    vi.spyOn(GetMarketConfigUseCase.prototype, "execute").mockRejectedValue(
      new Error("Network error")
    );

    const { result } = renderHook(() => useMarketConfig("t1"), { wrapper });

    await waitFor(() =>
      expect(result.current.data).toEqual(defaultMarketConfig)
    );

    expect(result.current.isSuccess).toBe(true);
  });
});
