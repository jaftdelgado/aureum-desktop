import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSearchAssets } from "@features/assets/hooks/useSearchAssets";

describe("useSearchAssets", () => {
  it("calls setSearch and setPage when input length >= 2", () => {
    const setSearch = vi.fn();
    const setPage = vi.fn();

    renderHook(() => useSearchAssets("abc", setSearch, setPage));

    expect(setSearch).toHaveBeenCalledWith("abc");
    expect(setPage).toHaveBeenCalledWith(1);
  });

  it("calls setSearch and setPage when input length === 0", () => {
    const setSearch = vi.fn();
    const setPage = vi.fn();

    renderHook(() => useSearchAssets("", setSearch, setPage));

    expect(setSearch).toHaveBeenCalledWith("");
    expect(setPage).toHaveBeenCalledWith(1);
  });

  it("does not call setSearch if input length is 1", () => {
    const setSearch = vi.fn();
    const setPage = vi.fn();

    renderHook(() => useSearchAssets("a", setSearch, setPage));

    expect(setSearch).not.toHaveBeenCalled();
    expect(setPage).not.toHaveBeenCalled();
  });
});
