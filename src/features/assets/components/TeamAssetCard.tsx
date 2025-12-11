<<<<<<< HEAD
=======
// src/features/assets/components/TeamAssetCard.tsx
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import React from "react";
import { Skeleton } from "@core/ui/Skeleton";
import { Avatar } from "@core/ui/Avatar";
import { Label } from "@core/ui/Label";
<<<<<<< HEAD
import type { TeamAsset } from "@domain/entities/TeamAsset";
import type { Asset } from "@domain/entities/Asset";
import { cn } from "@core/utils/cn";
import { calculatePercentDiff } from "@features/assets/utils/priceUtils";
import { AssetPrice } from "./AssetPrice";
=======
import { Chip } from "@core/ui/Chip";
import { Icon } from "@iconify/react";
import type { TeamAsset } from "@domain/entities/TeamAsset";
import type { Asset } from "@domain/entities/Asset";
import { cn } from "@core/utils/cn";

import {
  calculatePercentDiff,
  formatPercent,
  isPositive,
} from "@features/assets/utils/priceUtils";
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

interface TeamAssetCardProps {
  asset?: TeamAsset | Asset;
  onClick?: (asset: TeamAsset | Asset) => void;
  isFirst?: boolean;
  isLast?: boolean;
  isLoading?: boolean;
}

const isTeamAsset = (a: TeamAsset | Asset): a is TeamAsset => {
  return (a as TeamAsset).asset !== undefined;
};

export const TeamAssetCard: React.FC<TeamAssetCardProps> = ({
  asset,
  onClick,
  isFirst = false,
  isLoading = false,
}) => {
<<<<<<< HEAD
  const borderTop = isFirst ? "" : "border-t border-secondaryOutline";

  if (!asset) {
    return (
      <div className={cn("w-full py-3 text-left", borderTop)}>
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center flex-1 gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex flex-col flex-1 gap-1">
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="h-3 w-32 rounded-full" />
            </div>
          </div>

          <AssetPrice isLoading />
=======
  const borderTop = isFirst ? "" : "border-t border-outline";

  if (!asset) {
    // Render para loading/placeholder
    return (
      <div
        className={cn(
          "w-full flex items-center justify-between py-3 text-left cursor-pointer hover:bg-gray-100",
          borderTop
        )}
      >
        <div className="flex items-center flex-1 pr-4 ml-page-x">
          <Skeleton className="h-6 w-16 rounded-full mr-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="mr-section-x flex flex-col items-end gap-1 min-w-[70px]">
          <Skeleton className="h-5 w-12 rounded-md" />
          <Skeleton className="h-4 w-10 rounded-md" />
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
        </div>
      </div>
    );
  }

  const assetData: Asset = isTeamAsset(asset) ? asset.asset : asset;
<<<<<<< HEAD
=======

>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  const currentPrice = isTeamAsset(asset)
    ? asset.currentPrice
    : assetData.basePrice;
  const percentDiff =
    currentPrice && assetData.basePrice
      ? calculatePercentDiff(currentPrice, assetData.basePrice)
      : null;
<<<<<<< HEAD
=======
  const formattedPercent = formatPercent(percentDiff);
  const isUp = isPositive(percentDiff);
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

  return (
    <div
      className={cn(
<<<<<<< HEAD
        "w-full py-3 text-left cursor-pointer hover:bg-card",
=======
        "w-full flex items-center justify-between py-3 text-left cursor-pointer hover:bg-gray-100",
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
        borderTop
      )}
      onClick={() => !isLoading && onClick?.(asset)}
    >
<<<<<<< HEAD
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center flex-1 gap-3 min-w-0">
          <Avatar
            src={assetData.assetPicUrl ?? undefined}
            alt={assetData.assetSymbol}
            size="md"
            rounded="lg"
          />
          <div className="flex flex-col flex-1 mr-3 min-w-0">
            <Label
              variant="body"
              color="primary"
              weight="medium"
              className="block truncate"
            >
              {assetData.assetSymbol}
            </Label>
            {assetData.assetName && (
              <Label
                variant="small"
                color="secondary"
                className="block truncate"
              >
                {assetData.assetName}
              </Label>
            )}
          </div>
        </div>

        <AssetPrice
          price={currentPrice}
          percentDiff={percentDiff}
          className="flex-shrink-0"
        />
=======
      <div className="flex items-center flex-1 pr-4 ml-page-x">
        {assetData.assetPicUrl && (
          <Avatar
            src={assetData.assetPicUrl}
            alt={assetData.assetSymbol}
            size="md"
            rounded="lg"
            className="mr-3"
          />
        )}

        <div className="flex flex-col">
          <Label
            variant="body"
            color="primary"
            weight="medium"
            className="block truncate"
          >
            {assetData.assetSymbol}
          </Label>

          {assetData.assetName && (
            <Label variant="small" color="secondary" className="block truncate">
              {assetData.assetName}
            </Label>
          )}
        </div>
      </div>

      <div className="mr-section-x flex flex-col items-end gap-1 min-w-[70px]">
        <Chip variant="default">${currentPrice.toFixed(2)}</Chip>

        {formattedPercent && (
          <div className="flex items-center gap-1">
            <Icon
              icon={isUp ? "hugeicons:trade-up" : "hugeicons:trade-down"}
              className={isUp ? "text-primaryText" : "text-destructive"}
              width={14}
              height={14}
            />

            <Label
              variant="small"
              color={isUp ? "primary" : "destructive"}
              weight="medium"
            >
              {formattedPercent}
            </Label>
          </div>
        )}
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      </div>
    </div>
  );
};
