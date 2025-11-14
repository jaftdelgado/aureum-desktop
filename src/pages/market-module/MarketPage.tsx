import React from "react";
import { PageHeader } from "@ui/PageHeader";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/Button";

export const MarketPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("market.title", { defaultValue: "Mercado" })}
        description={t("market.description", {
          defaultValue:
            "Explora los activos disponibles en el mercado y analiza su comportamiento.",
        })}
        actions={
          <Button
            variant="default"
            icon="gravity-ui:store"
            className="px-4 py-2"
          >
            {t("market.exploreButton", { defaultValue: "Explorar mercado" })}
          </Button>
        }
      />

      <div className="flex flex-1 w-full flex-col md:flex-row">
        {/* Panel lateral del módulo */}
        <div className="w-full md:w-[30%] flex items-center justify-center border-r border-outline">
          <div className="text-muted">
            {t("market.sidebar", { defaultValue: "Panel del mercado" })}
          </div>
        </div>

        <div className="w-full md:w-[70%] flex flex-col h-full">
          <div className="flex-1 p-4 text-muted-foreground">
            {t("market.contentPlaceholder", {
              defaultValue: "Contenido del mercado próximamente...",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
