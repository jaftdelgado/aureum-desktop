import React from "react";
import { Skeleton } from "@core/ui/Skeleton";
import { Avatar } from "@core/ui/Avatar";
import { Label } from "@core/ui/Label";
import type { TeamAsset } from "@domain/entities/TeamAsset";

import { cn } from "@core/utils/cn";

interface TeamAssetCardProps {
  asset?: TeamAsset;
  onClick?: (asset: TeamAsset) => void;
  isFirst?: boolean;
  isLast?: boolean;
  isLoading?: boolean;
}

export const TeamAssetCard: React.FC<TeamAssetCardProps> = ({
  asset,
  onClick,
  isFirst = false,
  isLoading = false,
}) => {
  const borderTop = isFirst ? "" : "border-t border-outline";

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between py-4 text-left cursor-pointer hover:bg-gray-100",
        borderTop
      )}
      onClick={() => !isLoading && asset && onClick?.(asset)}
    >
      <div className="flex items-center flex-1 pr-4 ml-page-x">
        {isLoading || !asset ? (
          <>
            <Skeleton className="h-6 w-16 rounded-full mr-2" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : (
          <>
            {asset.asset.assetPicUrl && (
              <Avatar
                src={asset.asset.assetPicUrl}
                alt={asset.asset.assetSymbol}
                size="md"
                rounded="lg"
                className="mr-3"
              />
            )}
            <div className="flex flex-col">
              <Label variant="body" color="primary" weight="medium">
                {asset.asset.assetSymbol}
              </Label>
              {asset.asset.assetName && (
                <Label variant="body" color="secondary">
                  {asset.asset.assetName}
                </Label>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
