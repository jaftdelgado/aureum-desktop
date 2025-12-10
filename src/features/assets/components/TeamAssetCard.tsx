import React from "react";
import { Skeleton } from "@core/ui/Skeleton";
import { Avatar } from "@core/ui/Avatar";
import { Label } from "@core/ui/Label";
import type { TeamAsset } from "@domain/entities/TeamAsset";
import type { Asset } from "@domain/entities/Asset";
import { cn } from "@core/utils/cn";
import { calculatePercentDiff } from "@features/assets/utils/priceUtils";
import { AssetPrice } from "./AssetPrice";

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

  return (
    <div
      className={cn(
        "w-full py-3 text-left cursor-pointer hover:bg-card",
        borderTop
      )}
      onClick={() => !isLoading && onClick?.(asset)}
    >
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
      </div>
    </div>
  );
};
