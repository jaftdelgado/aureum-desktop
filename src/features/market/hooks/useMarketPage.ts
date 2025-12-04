import { useMemo, useState } from "react";

export type AssetHistoryPoint = {
  date: string;
  value: number;
};

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number; // porcentaje
  allocation: number; // % en el portafolio
  history: AssetHistoryPoint[];
};

const MOCK_ASSETS: Asset[] = [
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    currentPrice: 78320.23,
    change24h: 4.61,
    allocation: 35,
    history: [
      { date: "Jul 08", value: 54000 },
      { date: "Jul 09", value: 56000 },
      { date: "Jul 10", value: 58000 },
      { date: "Jul 11", value: 60000 },
      { date: "Jul 12", value: 64000 },
      { date: "Jul 13", value: 70000 },
      { date: "Jul 14", value: 78320.23 },
    ],
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    currentPrice: 3450.5,
    change24h: -1.2,
    allocation: 28,
    history: [
      { date: "Jul 08", value: 2900 },
      { date: "Jul 09", value: 2950 },
      { date: "Jul 10", value: 3000 },
      { date: "Jul 11", value: 3100 },
      { date: "Jul 12", value: 3200 },
      { date: "Jul 13", value: 3350 },
      { date: "Jul 14", value: 3450.5 },
    ],
  },
  {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    currentPrice: 180.12,
    change24h: 0.85,
    allocation: 18,
    history: [
      { date: "Jul 08", value: 140 },
      { date: "Jul 09", value: 145 },
      { date: "Jul 10", value: 150 },
      { date: "Jul 11", value: 160 },
      { date: "Jul 12", value: 170 },
      { date: "Jul 13", value: 175 },
      { date: "Jul 14", value: 180.12 },
    ],
  },
  {
    id: "ada",
    symbol: "ADA",
    name: "Cardano",
    currentPrice: 0.72,
    change24h: 3.1,
    allocation: 9,
    history: [
      { date: "Jul 08", value: 0.55 },
      { date: "Jul 09", value: 0.58 },
      { date: "Jul 10", value: 0.6 },
      { date: "Jul 11", value: 0.61 },
      { date: "Jul 12", value: 0.65 },
      { date: "Jul 13", value: 0.69 },
      { date: "Jul 14", value: 0.72 },
    ],
  },
];

export const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export const formatPercent = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

export const useMarketPage = () => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>(
    MOCK_ASSETS[0]?.id ?? ""
  );

  const assets = MOCK_ASSETS;

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
  };
};