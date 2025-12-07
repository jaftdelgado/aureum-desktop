import { type TFunction } from "i18next";
import { type ComboboxItem } from "@core/components/Combobox";

export const getCurrencyOptions = (t: TFunction): ComboboxItem[] => [
  { value: "USD", label: t("simulator.options.USD") },
  { value: "EUR", label: t("simulator.options.EUR") },
  { value: "MXN", label: t("simulator.options.MXN") },
];

export const getSimpleOptions = (t: TFunction): ComboboxItem[] => [
  { value: "Low", label: t("simulator.options.Low") },
  { value: "Medium", label: t("simulator.options.Medium") },
  { value: "High", label: t("simulator.options.High") },
  { value: "Disabled", label: t("simulator.options.Disabled") },
];

export const getThickSpeedOptions = (t: TFunction): ComboboxItem[] => [
  { value: "Low", label: t("simulator.options.Low") },
  { value: "Medium", label: t("simulator.options.Medium") },
  { value: "High", label: t("simulator.options.High") },
];
