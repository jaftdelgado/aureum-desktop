import React from "react";
import { Chip } from "@core/ui/Chip";
import { Label } from "@core/ui/Label";
import { Icon } from "@iconify/react";

interface AssetPriceProps {
  price?: number;
  percentDiff?: number | null;
  isLoading?: boolean;
  className?: string;
}

export const AssetPrice: React.FC<AssetPriceProps> = ({
  price,
  percentDiff,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-end gap-1 min-w-[70px]">
        <div className="h-5 w-12 rounded-md bg-secondaryBtn animate-pulse" />
        <div className="h-4 w-10 rounded-md bg-secondaryBtn animate-pulse" />
      </div>
    );
  }

  const isUp = percentDiff != null && percentDiff > 0;

  return (
    <div className="flex flex-col items-end gap-1 min-w-[70px]">
      {price != null && (
        <Label variant="body" color="primary" weight="medium">
          ${price.toFixed(2)}
        </Label>
      )}

      {percentDiff != null && (
        <Chip
          variant={isUp ? "success" : "destructive"}
          className="flex items-center gap-1"
        >
          <Icon
            icon={isUp ? "hugeicons:trade-up" : "hugeicons:trade-down"}
            width={14}
            height={14}
          />
          {percentDiff.toFixed(2)}%
        </Chip>
      )}
    </div>
  );
};
