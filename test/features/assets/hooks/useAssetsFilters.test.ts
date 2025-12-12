import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useAssetsFilters } from "@features/assets/hooks/useAssetsFilters";

describe("useAssetsFilters", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useAssetsFilters());
    expect(result.current.page).toBe(1);
    expect(result.current.perPage).toBe(20);
    expect(result.current.search).toBe("");
    expect(result.current.sortKey).toBeNull();
    expect(result.current.sortDir).toBeNull();
  });

  it("should update page", () => {
    const { result } = renderHook(() => useAssetsFilters());
    act(() => result.current.setPage(5));
    expect(result.current.page).toBe(5);
  });

  it("should update perPage", () => {
    const { result } = renderHook(() => useAssetsFilters());
    act(() => result.current.setPerPage(50));
    expect(result.current.perPage).toBe(50);
  });

  it("should update search", () => {
    const { result } = renderHook(() => useAssetsFilters());
    act(() => result.current.setSearch("test"));
    expect(result.current.search).toBe("test");
  });

  it("should update sort", () => {
    const { result } = renderHook(() => useAssetsFilters());
    act(() => result.current.setSort("assetName", "asc"));
    expect(result.current.sortKey).toBe("assetName");
    expect(result.current.sortDir).toBe("asc");
  });
});
