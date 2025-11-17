import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "@dashboard/components/ui/Breadcrumb";

export const AppBreadcrumb: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);
  const isDashboard =
    location.pathname === "/" || location.pathname === "/dashboard";

  const formatName = (name: string) => {
    return t(
      `modules.${name}.title`,
      name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  };

  return (
    <Breadcrumb
      pathnames={pathnames}
      isDashboard={isDashboard}
      formatName={formatName}
    />
  );
};
