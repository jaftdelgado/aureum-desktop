import type { Asset } from "@domain/entities/Asset";

interface AssetRowProps {
  asset: Asset;
}

export function AssetRow({ asset }: AssetRowProps) {
  return (
    <div className="flex items-center gap-2">
      {asset.assetPicUrl && (
        <img
          src={asset.assetPicUrl}
          alt={asset.assetName}
          className="w-6 h-6 rounded-full object-cover"
        />
      )}
      <span>{asset.assetName}</span>
    </div>
  );
}
