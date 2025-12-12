import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useEditSelection } from "@features/assets/hooks/useEditSelection";
import type { Asset } from "@domain/entities/Asset";

const mockAssets: Asset[] = [
  {
    publicId: "a1",
    assetName: "Asset 1",
    assetSymbol: "A1",
    assetType: "Stock",
    basePrice: 100,
  },
  {
    publicId: "a2",
    assetName: "Asset 2",
    assetSymbol: "A2",
    assetType: "Stock",
    basePrice: 200,
  },
];

describe("useEditSelection", () => {
  it("sets selected assets in edit mode", () => {
    const { result } = renderHook(() =>
      useEditSelection(true, mockAssets, ["a1"])
    );

    expect(result.current.editingSelectedAssets).toEqual([mockAssets[0]]);
  });

  it("toggles assets correctly", () => {
    const { result } = renderHook(() =>
      useEditSelection(true, mockAssets, ["a1"])
    );

    act(() => {
      result.current.toggleAssets([mockAssets[0], mockAssets[1]]);
    });

    expect(result.current.editingSelectedAssets).toEqual([mockAssets[1]]);
  });
});
