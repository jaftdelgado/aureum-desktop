import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";

interface MarketActionsProps {
  onBuy?: () => void;
  onSell?: () => void;
  loadingBuy?: boolean;
  loadingSell?: boolean;
}

export const MarketActions: React.FC<MarketActionsProps> = ({
  onBuy,
  onSell,
  loadingBuy = false,
  loadingSell = false,
}) => {
  const { t } = useTranslation("market");

  return (
    <div className="col-start-4 row-start-5 flex items-stretch gap-4">

      <Button
        className="h-12 flex-1"
        iconLeft={!loadingBuy ? "hugeicons:shopping-bag-01" : undefined}
        onClick={onBuy}
        disabled={loadingBuy || loadingSell} 
      >
        {loadingBuy ? t("actions.loading") : t("actions.buy")}
      </Button>

      <Button
        className="h-12 flex-1"
        variant="secondary"
        iconLeft={!loadingSell ? "hugeicons:wallet-03" : undefined}
        onClick={onSell}
        disabled={loadingSell || loadingBuy} 
      >
        {loadingSell ? t("actions.loading") : t("actions.sell")}
      </Button>

    </div>
  );
};
