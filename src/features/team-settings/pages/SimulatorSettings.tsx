// src/features/team-settings/pages/SimulatorSettings.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Combobox, type ComboboxItem } from "@core/components/Combobox";
import { Switch } from "@core/ui/Switch";

import {
  SettingsControl,
  SettingsSection,
} from "@features/team-settings/components/ui/SettingsControl";

import FormLayout from "@core/layout/FormLayout";

const SimulatorSettings: React.FC = () => {
  const { t } = useTranslation("teamSettings");

  const [initialCash, setInitialCash] = useState(100000);
  const [currency, setCurrency] = useState("USD");

  const [marketVolatility, setMarketVolatility] = useState("Medium");
  const [marketLiquidity, setMarketLiquidity] = useState("Medium");
  const [thickSpeed, setThickSpeed] = useState("Normal");

  const [transactionFee, setTransactionFee] = useState("Low");
  const [allowShortSelling, setAllowShortSelling] = useState(false);

  const [eventFrequency, setEventFrequency] = useState("Medium");
  const [dividendImpact, setDividendImpact] = useState("Medium");
  const [crashImpact, setCrashImpact] = useState("Medium");

  const currencyOptions: ComboboxItem[] = [
    { value: "USD", label: t("simulator.options.USD") },
    { value: "EUR", label: t("simulator.options.EUR") },
    { value: "JPY", label: t("simulator.options.JPY") },
  ];

  const simpleOptions: ComboboxItem[] = [
    { value: "Low", label: t("simulator.options.Low") },
    { value: "Medium", label: t("simulator.options.Medium") },
    { value: "High", label: t("simulator.options.High") },
  ];

  const thickSpeedOptions: ComboboxItem[] = [
    { value: "Slow", label: t("simulator.options.Slow") },
    { value: "Normal", label: t("simulator.options.Normal") },
    { value: "Fast", label: t("simulator.options.Fast") },
  ];

  const sections = [
    {
      title: t("simulator.sections.marketBasics"),
      description: t("simulator.sections.marketBasicsDesc"),
      content: (
        <SettingsSection controlWidth="140px">
          <SettingsControl
            title={t("simulator.settings.initialCash")}
            description={t("simulator.settings.initialCashDesc")}
            control={
              <input
                type="number"
                value={initialCash}
                onChange={(e) => setInitialCash(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full text-sm"
              />
            }
          />

          <SettingsControl
            title={t("simulator.settings.currency")}
            description={t("simulator.settings.currencyDesc")}
            control={
              <Combobox
                items={currencyOptions}
                value={currency}
                onChange={setCurrency}
              />
            }
          />
        </SettingsSection>
      ),
    },

    {
      title: t("simulator.sections.marketParams"),
      description: t("simulator.sections.marketParamsDesc"),
      content: (
        <SettingsSection controlWidth="140px">
          <SettingsControl
            title={t("simulator.settings.marketVolatility")}
            description={t("simulator.settings.marketVolatilityDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={marketVolatility}
                onChange={setMarketVolatility}
              />
            }
          />

          <SettingsControl
            title={t("simulator.settings.marketLiquidity")}
            description={t("simulator.settings.marketLiquidityDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={marketLiquidity}
                onChange={setMarketLiquidity}
              />
            }
          />

          <SettingsControl
            title={t("simulator.settings.thickSpeed")}
            description={t("simulator.settings.thickSpeedDesc")}
            control={
              <Combobox
                items={thickSpeedOptions}
                value={thickSpeed}
                onChange={setThickSpeed}
              />
            }
          />
        </SettingsSection>
      ),
    },

    {
      title: t("simulator.sections.tradingRules"),
      description: t("simulator.sections.tradingRulesDesc"),
      content: (
        <SettingsSection controlWidth="140px">
          <SettingsControl
            title={t("simulator.settings.transactionFee")}
            description={t("simulator.settings.transactionFeeDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={transactionFee}
                onChange={setTransactionFee}
              />
            }
          />

          <SettingsControl
            title={t("simulator.settings.allowShortSelling")}
            description={t("simulator.settings.allowShortSellingDesc")}
            control={
              <Switch
                checked={allowShortSelling}
                onCheckedChange={setAllowShortSelling}
              />
            }
          />
        </SettingsSection>
      ),
    },

    {
      title: t("simulator.sections.marketEvents"),
      description: t("simulator.sections.marketEventsDesc"),
      content: (
        <SettingsSection controlWidth="160px">
          <SettingsControl
            title={t("simulator.settings.eventFrequency")}
            description={t("simulator.settings.eventFrequencyDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={eventFrequency}
                onChange={setEventFrequency}
              />
            }
          />

          <SettingsControl
            title={t("simulator.settings.dividendImpact")}
            description={t("simulator.settings.dividendImpactDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={dividendImpact}
                onChange={setDividendImpact}
              />
            }
          />

          <SettingsControl
            title={t("simulator.settings.crashImpact")}
            description={t("simulator.settings.crashImpactDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={crashImpact}
                onChange={setCrashImpact}
              />
            }
          />
        </SettingsSection>
      ),
    },
  ];

  return <FormLayout sections={sections} />;
};

export default SimulatorSettings;
