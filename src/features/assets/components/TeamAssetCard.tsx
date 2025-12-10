// src/features/assets/components/TeamAssetCard.tsx
import React from "react";
import { Skeleton } from "@core/ui/Skeleton";
import { Avatar } from "@core/ui/Avatar";
import { Label } from "@core/ui/Label";
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
        </div>
      </div>
    );
  }

  const assetData: Asset = isTeamAsset(asset) ? asset.asset : asset;

  const currentPrice = isTeamAsset(asset)
    ? asset.currentPrice
    : assetData.basePrice;
  const percentDiff =
    currentPrice && assetData.basePrice
      ? calculatePercentDiff(currentPrice, assetData.basePrice)
      : null;
  const formattedPercent = formatPercent(percentDiff);
  const isUp = isPositive(percentDiff);

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between py-3 text-left cursor-pointer hover:bg-gray-100",
        borderTop
      )}
      onClick={() => !isLoading && onClick?.(asset)}
    >
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
      </div>
    </div>
  );
};
