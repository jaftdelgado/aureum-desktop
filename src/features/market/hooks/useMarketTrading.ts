import { useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@app/hooks/useAuth";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { MarketApiRepository } from "@infra/api/market/MarketApiRepository";
import { BuyAssetUseCase } from "@domain/use-cases/market/BuyAssetUseCase";
import { SellAssetUseCase } from "@domain/use-cases/market/SellAssetUseCase";
import type { Asset } from "./useMarketPage";

const repo = new MarketApiRepository();
const buyUseCase = new BuyAssetUseCase(repo);
const sellUseCase = new SellAssetUseCase(repo);

<<<<<<< HEAD
export const useMarketTrading = (selectedAsset: Asset | null,
  reloadQuantities: () => void
) => {

=======
export const useMarketTrading = (selectedAsset: Asset | null) => {
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  const { user } = useAuth();
  const { selectedTeam } = useSelectedTeam();
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [loadingSell, setLoadingSell] = useState(false);

  const handleNotifications = (notifications: { message: string }[]) => {
    notifications.forEach((n) => {
      toast.info("Notificación de mercado", {
        description: n.message,
      });
    });
  };

  const buy = async (quantity: number, price?: number) => {
    if (!user || !selectedTeam || !selectedAsset) return;

    setLoadingBuy(true);
    try {
      const result = await buyUseCase.execute({
        teamPublicId: selectedTeam.publicId,
        assetPublicId: selectedAsset.id,
        userPublicId: user.id,
        quantity,
        price: price ?? selectedAsset.currentPrice,
      });

      toast.success("Compra realizada", {
        description: `Precio: ${result.transactionPrice.toFixed(
          2
        )} · Cantidad: ${result.quantity}`,
      });
<<<<<<< HEAD
      
      handleNotifications(result.notifications);
      reloadQuantities();
=======

      handleNotifications(result.notifications);
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
    } finally {
      setLoadingBuy(false);
    }
  };

  const sell = async (quantity: number, price?: number) => {
    if (!user || !selectedTeam || !selectedAsset) return;

    setLoadingSell(true);
    try {
      const result = await sellUseCase.execute({
        teamPublicId: selectedTeam.publicId,
        assetPublicId: selectedAsset.id,
        userPublicId: user.id,
        quantity,
        price: price ?? selectedAsset.currentPrice,
      });

      toast.success("Venta realizada", {
        description: `Precio: ${result.transactionPrice.toFixed(
          2
        )} · Cantidad: ${result.quantity}`,
      });

      handleNotifications(result.notifications);
<<<<<<< HEAD
      reloadQuantities();
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
    } finally {
      setLoadingSell(false);
    }
  };

  return { buy, sell, loadingBuy, loadingSell };
};
