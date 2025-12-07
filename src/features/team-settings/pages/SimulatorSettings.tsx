import React from "react";
import { useTranslation } from "react-i18next";

import { Combobox } from "@core/components/Combobox";
import { Switch } from "@core/ui/Switch";

import {
  SettingsControl,
  SettingsSection,
} from "@features/team-settings/components/ui/SettingsControl";

import { InputGroup, InputGroupInput } from "@core/components/InputGroup";
import FormLayout from "@core/layout/FormLayout";

import { useMarketConfig } from "@features/team-settings/hooks/useMarketConfig";
import { defaultMarketConfig } from "@features/team-settings/constants/marketConfigDefaults";
import { useConfigFormState } from "@features/team-settings/hooks/useConfigFormState";

import {
  toCurrency,
  toVolatility,
  toThickSpeed,
  toTransactionFee,
} from "@features/team-settings/utils/configCasters";

import {
  getCurrencyOptions,
  getSimpleOptions,
  getThickSpeedOptions,
} from "@features/team-settings/constants/simulatorOptions";

import { useSelectedTeam } from "@app/hooks/useSelectedTeam";

const SimulatorSettings: React.FC = () => {
  const { t } = useTranslation("teamSettings");
  const { selectedTeam } = useSelectedTeam();

  const teamPublicId = selectedTeam?.publicId ?? "";
  const { data: config, isLoading } = useMarketConfig(teamPublicId);

  const { formState, setField } = useConfigFormState(
    config ?? defaultMarketConfig
  );

  if (!teamPublicId) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
        ⚠️ No hay equipo seleccionado
      </div>
    );
  }

  const currencyOptions = getCurrencyOptions(t);
  const simpleOptions = getSimpleOptions(t);
  const thickSpeedOptions = getThickSpeedOptions(t);

  const sections = [
    {
      title: t("simulator.sections.marketBasics"),
      description: t("simulator.sections.marketBasicsDesc"),
      content: (
        <SettingsSection controlWidth="140px" isLoading={isLoading}>
          <SettingsControl
            title={t("simulator.settings.initialCash")}
            description={t("simulator.settings.initialCashDesc")}
            control={
              <InputGroup>
                <InputGroupInput
                  value={formState.initialCash}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setField("initialCash", Number(e.target.value))
                  }
                  placeholder={t("simulator.settings.initialCash")}
                />
              </InputGroup>
            }
          />
          <SettingsControl
            title={t("simulator.settings.currency")}
            description={t("simulator.settings.currencyDesc")}
            control={
              <Combobox
                items={currencyOptions}
                value={formState.currency}
                onChange={(v) => setField("currency", toCurrency(v))}
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
        <SettingsSection controlWidth="140px" isLoading={isLoading}>
          <SettingsControl
            title={t("simulator.settings.marketVolatility")}
            description={t("simulator.settings.marketVolatilityDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={formState.marketVolatility}
                onChange={(v) => setField("marketVolatility", toVolatility(v))}
              />
            }
          />
          <SettingsControl
            title={t("simulator.settings.marketLiquidity")}
            description={t("simulator.settings.marketLiquidityDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={formState.marketLiquidity}
                onChange={(v) => setField("marketLiquidity", toVolatility(v))}
              />
            }
          />
          <SettingsControl
            title={t("simulator.settings.thickSpeed")}
            description={t("simulator.settings.thickSpeedDesc")}
            control={
              <Combobox
                items={thickSpeedOptions}
                value={formState.thickSpeed}
                onChange={(v) => setField("thickSpeed", toThickSpeed(v))}
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
        <SettingsSection controlWidth="140px" isLoading={isLoading}>
          <SettingsControl
            title={t("simulator.settings.transactionFee")}
            description={t("simulator.settings.transactionFeeDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={formState.transactionFee}
                onChange={(v) =>
                  setField("transactionFee", toTransactionFee(v))
                }
              />
            }
          />
          <SettingsControl
            title={t("simulator.settings.allowShortSelling")}
            description={t("simulator.settings.allowShortSellingDesc")}
            control={
              <Switch
                checked={formState.allowShortSelling}
                onCheckedChange={(v) => setField("allowShortSelling", v)}
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
        <SettingsSection controlWidth="160px" isLoading={isLoading}>
          <SettingsControl
            title={t("simulator.settings.eventFrequency")}
            description={t("simulator.settings.eventFrequencyDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={formState.eventFrequency}
                onChange={(v) => setField("eventFrequency", toVolatility(v))}
              />
            }
          />
          <SettingsControl
            title={t("simulator.settings.dividendImpact")}
            description={t("simulator.settings.dividendImpactDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={formState.dividendImpact}
                onChange={(v) => setField("dividendImpact", toVolatility(v))}
              />
            }
          />
          <SettingsControl
            title={t("simulator.settings.crashImpact")}
            description={t("simulator.settings.crashImpactDesc")}
            control={
              <Combobox
                items={simpleOptions}
                value={formState.crashImpact}
                onChange={(v) => setField("crashImpact", toVolatility(v))}
              />
            }
          />
        </SettingsSection>
      ),
    },
  ];

  return <FormLayout sections={sections} isLoading={isLoading} />;
};

export default SimulatorSettings;
