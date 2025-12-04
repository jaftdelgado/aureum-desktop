import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";

interface MarketActionsProps {
  onBuy?: () => void;
  onSell?: () => void;
}

export const MarketActions: React.FC<MarketActionsProps> = ({
  onBuy,
  onSell,
}) => {
  const { t } = useTranslation("market");

  return (
    <div className="col-start-4 row-start-5 flex items-stretch gap-4">
      <Button
        className="h-12 flex-1"
        iconLeft="hugeicons:shopping-bag-01"
        onClick={onBuy}
      >
        {t("actions.buy")}
      </Button>

      <Button
        className="h-12 flex-1"
        variant="secondary"
        iconLeft="hugeicons:wallet-03"
        onClick={onSell}
      >
        {t("actions.sell")}
      </Button>
    </div>
  );
};
