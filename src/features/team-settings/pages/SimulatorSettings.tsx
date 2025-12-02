import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SimulatorSettingsList } from "@features/team-settings/components/SimulatorSettingsList";
import { Combobox, type ComboboxItem } from "@core/components/Combobox";
import { Switch } from "@core/ui/Switch";

const SimulatorSettings: React.FC = () => {
  const { t } = useTranslation("teamSettings");

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

  const currencyOptions: ComboboxItem[] = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "JPY", label: "JPY" },
  ];

  const simpleOptions: ComboboxItem[] = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const thickSpeedOptions: ComboboxItem[] = [
    { value: "Slow", label: "Slow" },
    { value: "Normal", label: "Normal" },
    { value: "Fast", label: "Fast" },
  ];

  const sections = [
    {
      title: t("settings.simulator.sections.marketBasics"),
      items: [
        {
          title: t("settings.simulator.settings.initialCash"),
          description: t("settings.simulator.settings.initialCashDesc"),
          control: (
            <input
              type="number"
              value={initialCash}
              onChange={(e) => setInitialCash(Number(e.target.value))}
              className="border rounded px-2 py-1 w-28 text-sm"
            />
          ),
        },
        {
          title: t("settings.simulator.settings.currency"),
          description: t("settings.simulator.settings.currencyDesc"),
          control: (
            <Combobox
              items={currencyOptions}
              value={currency}
              onChange={setCurrency}
            />
          ),
        },
      ],
    },
    {
      title: t("settings.simulator.sections.marketParams"),
      items: [
        {
          title: t("settings.simulator.settings.marketVolatility"),
          description: t("settings.simulator.settings.marketVolatilityDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={marketVolatility}
              onChange={setMarketVolatility}
            />
          ),
        },
        {
          title: t("settings.simulator.settings.marketLiquidity"),
          description: t("settings.simulator.settings.marketLiquidityDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={marketLiquidity}
              onChange={setMarketLiquidity}
            />
          ),
        },
        {
          title: t("settings.simulator.settings.thickSpeed"),
          description: t("settings.simulator.settings.thickSpeedDesc"),
          control: (
            <Combobox
              items={thickSpeedOptions}
              value={thickSpeed}
              onChange={setThickSpeed}
            />
          ),
        },
      ],
    },
    {
      title: t("settings.simulator.sections.tradingRules"),
      items: [
        {
          title: t("settings.simulator.settings.transactionFee"),
          description: t("settings.simulator.settings.transactionFeeDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={transactionFee}
              onChange={setTransactionFee}
            />
          ),
        },
        {
          title: t("settings.simulator.settings.allowShortSelling"),
          description: t("settings.simulator.settings.allowShortSellingDesc"),
          control: (
            <Switch
              checked={allowShortSelling}
              onCheckedChange={setAllowShortSelling}
            />
          ),
        },
      ],
    },
    {
      title: t("settings.simulator.sections.marketEvents"),
      items: [
        {
          title: t("settings.simulator.settings.eventFrequency"),
          description: t("settings.simulator.settings.eventFrequencyDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={eventFrequency}
              onChange={setEventFrequency}
            />
          ),
        },
        {
          title: t("settings.simulator.settings.dividendImpact"),
          description: t("settings.simulator.settings.dividendImpactDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={dividendImpact}
              onChange={setDividendImpact}
            />
          ),
        },
        {
          title: t("settings.simulator.settings.crashImpact"),
          description: t("settings.simulator.settings.crashImpactDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={crashImpact}
              onChange={setCrashImpact}
            />
          ),
        },
      ],
    },
  ];

  return <SimulatorSettingsList sections={sections} />;
};

export default SimulatorSettings;
