import React from "react";
import { PageHeader } from "@core/components/PageHeader";
import { useTranslation } from "react-i18next";
import { Button } from "@core/base-design/Button";
import { ButtonGroup } from "@core/components/ButtonGroup";

export const TeamsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("teams.title", { defaultValue: "Equipos" })}
        description={t("teams.description", {
          defaultValue: "Administra los equipos y gestiona su información.",
        })}
        actions={
          <ButtonGroup>
            <Button variant="default">
              {t("teams.actions.save", { defaultValue: "Guardar" })}
            </Button>
            <Button variant="secondary">
              {t("teams.actions.cancel", { defaultValue: "Cancelar" })}
            </Button>
          </ButtonGroup>
        }
      />

      <div className="flex flex-1 w-full flex-col md:flex-row">
        {/* Panel lateral del módulo */}
        <div className="w-full md:w-[30%] flex items-center justify-center border-r border-outline">
          <div className="text-muted">
            {t("teams.sidebar", { defaultValue: "Panel de equipos" })}
          </div>
        </div>

        <div className="w-full md:w-[70%] flex flex-col h-full">
          <div className="flex-1 p-4 text-muted-foreground">
            {t("teams.contentPlaceholder", {
              defaultValue: "Contenido de equipos próximamente...",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
