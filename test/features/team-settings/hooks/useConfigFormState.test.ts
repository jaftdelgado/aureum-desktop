import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useConfigFormState } from "@features/team-settings/hooks/useConfigFormState";
import type { MarketConfig } from "@domain/entities/MarketConfig";

const initialConfig: MarketConfig = {
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

describe("useConfigFormState", () => {
  it("should initialize form state with initial config", () => {
    const { result } = renderHook(() => useConfigFormState(initialConfig));

    expect(result.current.formState).toEqual(initialConfig);
  });

  it("should update a single field with setField", () => {
    const { result } = renderHook(() => useConfigFormState(initialConfig));

    act(() => {
      result.current.setField("initialCash", 5000);
    });

    expect(result.current.formState.initialCash).toBe(5000);
  });

  it("should reset form state when initialConfig changes", () => {
    const { result, rerender } = renderHook(
      ({ config }) => useConfigFormState(config),
      { initialProps: { config: initialConfig } }
    );

    const newConfig = { ...initialConfig, currency: "EUR" as const };

    rerender({ config: newConfig });

    expect(result.current.formState.currency).toBe("EUR");
  });

  it("should allow directly setting form state", () => {
    const { result } = renderHook(() => useConfigFormState(initialConfig));

    act(() => {
      result.current.setFormState({
        ...initialConfig,
        allowShortSelling: false,
      });
    });

    expect(result.current.formState.allowShortSelling).toBe(false);
  });
});
