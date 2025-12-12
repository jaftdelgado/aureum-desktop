import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelectedAssetIds } from "@features/assets/hooks/useSelectedAssetIds";
import type { TeamAsset } from "@domain/entities/TeamAsset";

const mockTeamAssets: TeamAsset[] = [
  {
    assetId: "1",
    teamAssetId: 1,
    publicId: "ta1",
    teamId: "t1",
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
  {
    assetId: "2",
    teamAssetId: 2,
    publicId: "ta2",
    teamId: "t1",
    currentPrice: 200,
    hasMovements: true,
    asset: {
      publicId: "a2",
      assetName: "Asset 2",
      assetSymbol: "A2",
      assetType: "Stock",
      basePrice: 200,
    },
  },
];

describe("useSelectedAssetIds", () => {
  it("returns asset publicIds", () => {
    const { result } = renderHook(() => useSelectedAssetIds(mockTeamAssets));
    expect(result.current).toEqual(["a1", "a2"]);
  });

  it("returns empty array when teamAssets is undefined", () => {
    const { result } = renderHook(() => useSelectedAssetIds(undefined));
    expect(result.current).toEqual([]);
  });
});
