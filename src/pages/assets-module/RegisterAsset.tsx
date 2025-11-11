import React from "react";
import { PageHeader } from "@ui/PageHeader";
import { useTranslation } from "react-i18next";

export const RegisterAsset: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("assets.registerTitle")}
        description={t("assets.registerDescription")}
      />

      {/* Layout principal */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-5 grid-rows-5 gap-4">
          <div className="col-span-1 row-span-1 col-start-1 row-start-1 flex items-center justify-center bg-gray-100 rounded">
            1
          </div>
          <div className="col-span-1 row-span-1 col-start-2 row-start-1 flex items-center justify-center bg-gray-100 rounded">
            7
          </div>
          <div className="col-span-2 row-span-1 col-start-1 row-start-2 flex items-center justify-center bg-gray-100 rounded">
            8
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAsset;
