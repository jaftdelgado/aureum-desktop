import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SettingsControl,
  SettingsSection,
} from "@settings/components/ui/SettingsControl";
import { Combobox, type ComboboxItem } from "@ui/Combobox";

const currencyOptions: ComboboxItem[] = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "JPY", label: "JPY" },
];

const volatilityOptions: ComboboxItem[] = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const thickSpeedOptions: ComboboxItem[] = [
  { value: "Slow", label: "Slow" },
  { value: "Normal", label: "Normal" },
  { value: "Fast", label: "Fast" },
];

const transactionFeeOptions: ComboboxItem[] = [
  { value: "None", label: "None" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const MarketSettings: React.FC = () => {
  const { t } = useTranslation();

  const [initialCash, setInitialCash] = useState(100000);
  const [currency, setCurrency] = useState("USD");
  const [marketVolatility, setMarketVolatility] = useState("Medium");
  const [marketLiquidity, setMarketLiquidity] = useState("Medium");
  const [thickSpeed, setThickSpeed] = useState("Normal");
  const [transactionFee, setTransactionFee] = useState("Low");
  const [eventFrequency, setEventFrequency] = useState("Medium");
  const [dividendImpact, setDividendImpact] = useState("Medium");
  const [crashImpact, setCrashImpact] = useState("Medium");
  const [allowShortSelling, setAllowShortSelling] = useState(false);

  return (
    <div className="w-full h-full flex flex-col gap-4 py-4 max-w-[840px]">
      {/* Sección: Capital y moneda */}
      <SettingsSection title={t("settings.simulator.sections.marketBasics")}>
        <SettingsControl
          title={t("settings.simulator.settings.initialCash")}
          description={t("settings.simulator.settings.initialCashDesc")}
          control={
            <input
              type="number"
              value={initialCash}
              onChange={(e) => setInitialCash(Number(e.target.value))}
              className="border rounded px-2 py-1 w-28 text-sm"
            />
          }
        />
        <SettingsControl
          title={t("settings.simulator.settings.currency")}
          description={t("settings.simulator.settings.currencyDesc")}
          control={
            <Combobox
              items={currencyOptions}
              value={currency}
              onChange={setCurrency}
            />
          }
        />
      </SettingsSection>

      {/* Sección: Parámetros de mercado */}
      <SettingsSection title={t("settings.simulator.sections.marketParams")}>
        <SettingsControl
          title={t("settings.simulator.settings.marketVolatility")}
          description={t("settings.simulator.settings.marketVolatilityDesc")}
          control={
            <Combobox
              items={volatilityOptions}
              value={marketVolatility}
              onChange={setMarketVolatility}
            />
          }
        />
        <SettingsControl
          title={t("settings.simulator.settings.marketLiquidity")}
          description={t("settings.simulator.settings.marketLiquidityDesc")}
          control={
            <Combobox
              items={volatilityOptions}
              value={marketLiquidity}
              onChange={setMarketLiquidity}
            />
          }
        />
        <SettingsControl
          title={t("settings.simulator.settings.thickSpeed")}
          description={t("settings.simulator.settings.thickSpeedDesc")}
          control={
            <Combobox
              items={thickSpeedOptions}
              value={thickSpeed}
              onChange={setThickSpeed}
            />
          }
        />
      </SettingsSection>

      {/* Sección: Reglas de trading */}
      <SettingsSection title={t("settings.simulator.sections.tradingRules")}>
        <SettingsControl
          title={t("settings.simulator.settings.transactionFee")}
          description={t("settings.simulator.settings.transactionFeeDesc")}
          control={
            <Combobox
              items={transactionFeeOptions}
              value={transactionFee}
              onChange={setTransactionFee}
            />
          }
        />
        <SettingsControl
          title={t("settings.simulator.settings.allowShortSelling")}
          description={t("settings.simulator.settings.allowShortSellingDesc")}
          control={
            <Combobox
              items={[
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ]}
              value={allowShortSelling ? "true" : "false"}
              onChange={(val) => setAllowShortSelling(val === "true")}
            />
          }
        />
      </SettingsSection>

      <SettingsSection title={t("settings.simulator.sections.marketEvents")}>
        <SettingsControl
          title={t("settings.simulator.settings.eventFrequency")}
          description={t("settings.simulator.settings.eventFrequencyDesc")}
          control={
            <Combobox
              items={transactionFeeOptions}
              value={eventFrequency}
              onChange={setEventFrequency}
            />
          }
        />
        <SettingsControl
          title={t("settings.simulator.settings.dividendImpact")}
          description={t("settings.simulator.settings.dividendImpactDesc")}
          control={
            <Combobox
              items={transactionFeeOptions}
              value={dividendImpact}
              onChange={setDividendImpact}
            />
          }
        />
        <SettingsControl
          title={t("settings.simulator.settings.crashImpact")}
          description={t("settings.simulator.settings.crashImpactDesc")}
          control={
            <Combobox
              items={transactionFeeOptions}
              value={crashImpact}
              onChange={setCrashImpact}
            />
          }
        />
      </SettingsSection>
    </div>
  );
};
