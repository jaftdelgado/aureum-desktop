import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";

interface MarketActionsProps {
  onBuy?: () => void;
  onSell?: () => void;
  loadingBuy?: boolean;
  loadingSell?: boolean;
<<<<<<< HEAD
  quantity: number; 
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
}

export const MarketActions: React.FC<MarketActionsProps> = ({
  onBuy,
  onSell,
  loadingBuy = false,
  loadingSell = false,
<<<<<<< HEAD
  quantity,
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
}) => {
  const { t } = useTranslation("market");

  return (
    <div className="col-start-4 row-start-5 flex items-stretch gap-4">

      <Button
        className="h-12 flex-1"
        iconLeft={!loadingBuy ? "hugeicons:shopping-bag-01" : undefined}
        onClick={onBuy}
<<<<<<< HEAD
        disabled={loadingBuy || loadingSell}
=======
        disabled={loadingBuy || loadingSell} 
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      >
        {loadingBuy ? t("actions.loading") : t("actions.buy")}
      </Button>

      <Button
        className="h-12 flex-1"
        variant="secondary"
        iconLeft={!loadingSell ? "hugeicons:wallet-03" : undefined}
        onClick={onSell}
<<<<<<< HEAD
        disabled={loadingSell || loadingBuy || quantity == 0}  
=======
        disabled={loadingSell || loadingBuy} 
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      >
        {loadingSell ? t("actions.loading") : t("actions.sell")}
      </Button>

    </div>
  );
};
