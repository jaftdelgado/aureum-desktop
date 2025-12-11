import { useEffect, useMemo, useState } from "react";

import { MarketApiRepository } from "@infra/api/market/MarketApiRepository";
import { SubscribeToMarketUseCase } from "@domain/use-cases/market/SubscribeToMarketUseCase";
import type { MarketSnapshot } from "@domain/entities/MarketSnapshot";

<<<<<<< HEAD
import { useAuth } from "@app/hooks/useAuth";
import {
  PortfolioRepository,
  type PortfolioAssetQuantity,
} from "@infra/api/portfolio/PortfolioRepository";
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

export type AssetHistoryPoint = {
  date: string;
  value: number;
};

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number; 
  allocation: number; 
  history: AssetHistoryPoint[];
};

export const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export const formatPercent = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

const marketRepository = new MarketApiRepository();
const subscribeToMarketUseCase = new SubscribeToMarketUseCase(
  marketRepository
);

type AssetsState = Record<string, Asset>;

const addSnapshotToState = (
  prev: AssetsState,
  snapshot: MarketSnapshot
): AssetsState => {
  const next: AssetsState = { ...prev };

  snapshot.assets.forEach((asset) => {
    const id = asset.id; 
    const prevAsset = prev[id];

    const historyPoint: AssetHistoryPoint = {
      date: snapshot.timestamp.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      value: asset.price,
    };

    const prevHistory = prevAsset?.history ?? [];
    const history = [...prevHistory, historyPoint].slice(-100); 

    const firstPrice = prevHistory[0]?.value ?? asset.price;
    const change24h =
      firstPrice > 0 ? ((asset.price - firstPrice) / firstPrice) * 100 : 0;

    next[id] = {
      id,
      symbol: asset.symbol,
      name: asset.name,
      currentPrice: asset.price,
      change24h,
      allocation: prevAsset?.allocation ?? 0, 
      history,
    };
  });

  return next;
};

export const useMarketPage = (courseId: string) => {
  const [assetsById, setAssetsById] = useState<AssetsState>({});
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
<<<<<<< HEAD
  const { user } = useAuth();
  const [portfolioQuantities, setPortfolioQuantities] = useState<
    Record<string, number>
  >({});
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToMarketUseCase.execute(courseId, {
      onData: (snapshot) => {
        setAssetsById((prev) => addSnapshotToState(prev, snapshot));
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("[useMarketPage] market stream error:", error);
        setIsLoading(false);
      },
    });

    return () => {
      unsubscribe();
    };
  }, [courseId]);

<<<<<<< HEAD
  const loadPortfolio = async () => {
    try {
      const items: PortfolioAssetQuantity[] =
        await PortfolioRepository.getAssetQuantitiesByTeamAndUser(
          courseId,
          user?.id ?? ""
        );

      const map: Record<string, number> = {};
      for (const item of items) {
        map[item.assetId] = item.quantity;
      }

      setPortfolioQuantities(map);
    } catch (error) {
      console.error("[useMarketPage] error loading portfolio quantities:", error);
    }
  };

  useEffect(() => {
    if (!courseId || !user?.id) return;

    void loadPortfolio();
    
  }, [courseId, user?.id]);

   const assets = useMemo(
    () =>
      Object.values(assetsById).map((asset) => ({
        ...asset,
        allocation: portfolioQuantities[asset.id] ?? 0,
      })),
    [assetsById, portfolioQuantities]
  );
=======
  const assets = useMemo(() => Object.values(assetsById), [assetsById]);
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

  useEffect(() => {
    if (!selectedAssetId && assets.length > 0) {
      setSelectedAssetId(assets[0].id);
    }
  }, [assets, selectedAssetId]);

  const selectedAsset = useMemo(
    () => assets.find((asset) => asset.id === selectedAssetId) ?? null,
    [assets, selectedAssetId]
  );

  const selectAsset = (id: string) => {
    setSelectedAssetId(id);
  };

  return {
    assets,
    selectedAsset,
    selectedAssetId,
    selectAsset,
    isLoading,
<<<<<<< HEAD
    reloadQuantities: loadPortfolio,
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  };
};
