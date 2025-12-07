// src/features/team-settings/hooks/useConfigFormState.ts
import { useEffect, useState, useCallback } from "react";
import type { MarketConfig } from "@domain/entities/MarketConfig";

export function useConfigFormState(initialConfig: MarketConfig) {
  const [formState, setFormState] = useState<MarketConfig>(initialConfig);

  const setField = useCallback(
    <K extends keyof MarketConfig>(key: K, value: MarketConfig[K]) => {
      setFormState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  useEffect(() => {
    setFormState(initialConfig);
  }, [initialConfig]);

  return {
    formState,
    setField,
    setFormState,
  };
}
