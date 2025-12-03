// src/features/portfolio/pages/PortfolioPage.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@core/components/PageHeader";

const PortfolioPage: React.FC = () => {
  const { t } = useTranslation("portfolio");

  return (
    <div>
      <PageHeader title={t("title")} description={t("description")} />
      <h1>Portfolio Page</h1>
    </div>
  );
};

export default PortfolioPage;
