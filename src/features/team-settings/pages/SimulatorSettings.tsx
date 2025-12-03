import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@core/components/PageHeader";
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
      title: t("simulator.sections.marketBasics"),
      items: [
        {
          title: t("simulator.settings.initialCash"),
          description: t("simulator.settings.initialCashDesc"),
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
          title: t("simulator.settings.currency"),
          description: t("simulator.settings.currencyDesc"),
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
      title: t("simulator.sections.marketParams"),
      items: [
        {
          title: t("simulator.settings.marketVolatility"),
          description: t("simulator.settings.marketVolatilityDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={marketVolatility}
              onChange={setMarketVolatility}
            />
          ),
        },
        {
          title: t("simulator.settings.marketLiquidity"),
          description: t("simulator.settings.marketLiquidityDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={marketLiquidity}
              onChange={setMarketLiquidity}
            />
          ),
        },
        {
          title: t("simulator.settings.thickSpeed"),
          description: t("simulator.settings.thickSpeedDesc"),
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
      title: t("simulator.sections.tradingRules"),
      items: [
        {
          title: t("simulator.settings.transactionFee"),
          description: t("simulator.settings.transactionFeeDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={transactionFee}
              onChange={setTransactionFee}
            />
          ),
        },
        {
          title: t("simulator.settings.allowShortSelling"),
          description: t("simulator.settings.allowShortSellingDesc"),
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
      title: t("simulator.sections.marketEvents"),
      items: [
        {
          title: t("simulator.settings.eventFrequency"),
          description: t("simulator.settings.eventFrequencyDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={eventFrequency}
              onChange={setEventFrequency}
            />
          ),
        },
        {
          title: t("simulator.settings.dividendImpact"),
          description: t("simulator.settings.dividendImpactDesc"),
          control: (
            <Combobox
              items={simpleOptions}
              value={dividendImpact}
              onChange={setDividendImpact}
            />
          ),
        },
        {
          title: t("simulator.settings.crashImpact"),
          description: t("simulator.settings.crashImpactDesc"),
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

  return (
    <div>
      <PageHeader
        title={t("simulator.title")}
        description={t("simulator.description")}
      />

      <SimulatorSettingsList sections={sections} />
    </div>
  );
};

export default SimulatorSettings;
