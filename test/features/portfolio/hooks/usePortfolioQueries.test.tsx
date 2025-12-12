import { renderHook, waitFor } from "@testing-library/react";
import { usePortfolioData } from "@features/portfolio/hooks/usePortfolioQueries";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PortfolioRepository } from "@infra/api/portfolio/PortfolioRepository";
import React from "react";

vi.mock("@infra/api/portfolio/PortfolioRepository", () => ({
  PortfolioRepository: {
    getByCourse: vi.fn(),
    getHistory: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Hook usePortfolioData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe retornar isLoading en true al iniciar", () => {
    vi.mocked(PortfolioRepository.getByCourse).mockReturnValue(
      new Promise(() => {})
    );
    vi.mocked(PortfolioRepository.getHistory).mockReturnValue(
      new Promise(() => {})
    );

    const { result } = renderHook(
      () => usePortfolioData("curso-123", "estudiante-123"),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.portfolio).toEqual([]);
  });

  it("debe retornar los datos del portafolio y del historial cuando la carga es exitosa", async () => {
    const mockPortfolio = [{ id: 1, asset: "BTC", quantity: 0.5 }];
    const mockHistory = [{ id: 101, type: "BUY", asset: "BTC" }];

    vi.mocked(PortfolioRepository.getByCourse).mockResolvedValue(
      mockPortfolio as any
    );
    vi.mocked(PortfolioRepository.getHistory).mockResolvedValue(
      mockHistory as any
    );

    const { result } = renderHook(
      () => usePortfolioData("curso-123", "estudiante-123"),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.portfolio).toEqual(mockPortfolio);
    expect(result.current.history).toEqual(mockHistory);
    expect(PortfolioRepository.getByCourse).toHaveBeenCalledWith(
      "curso-123",
      "estudiante-123"
    );
  });

  it("debe manejar errores si alguna de las peticiones falla", async () => {
    vi.mocked(PortfolioRepository.getByCourse).mockRejectedValue(
      new Error("Error de red")
    );

    const { result } = renderHook(
      () => usePortfolioData("curso-123", "estudiante-123"),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(true);
    expect(result.current.portfolio).toEqual([]);
  });
});
