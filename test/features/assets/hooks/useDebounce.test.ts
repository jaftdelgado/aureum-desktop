import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@features/assets/hooks/useDebounce";

describe("useDebounce", () => {
  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("should debounce value change", async () => {
    vi.useFakeTimers();
    let value = "a";
    const { result, rerender } = renderHook(() => useDebounce(value, 200));

    expect(result.current).toBe("a");

    value = "b";
    rerender();

    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("b");
    vi.useRealTimers();
  });
});
