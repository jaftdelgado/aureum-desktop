import { useEffect } from "react";

export function useSearchAssets(
  debouncedInput: string,
  setSearch: (query: string) => void,
  setPage: (page: number) => void
) {
  useEffect(() => {
    if (debouncedInput.length >= 2 || debouncedInput.length === 0) {
      setSearch(debouncedInput);
      setPage(1);
    }
  }, [debouncedInput, setSearch, setPage]);
}
