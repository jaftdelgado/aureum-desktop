// src/features/teams/components/TeamCard.tsx
import React from "react";
import { Skeleton } from "@core/ui/Skeleton";

interface TeamCardProps {
  image?: string;
  title?: string;
  subtitle?: string;
  isFree?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  image,
  title,
  subtitle,
  loading = false,
  onClick,
}) => {
  return (
    <div
      className="bg-bg rounded-xl overflow-hidden border border-outline transition-shadow cursor-pointer max-w-xs"
      onClick={loading ? undefined : onClick}
    >
      <div className="relative aspect-[4/3] w-full">
        {loading ? (
          <Skeleton className="absolute inset-0 w-full h-full" />
        ) : (
          <img
            src={image || "https://placehold.co/600x400/1e1e1e/FFF"}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* divider */}
      <div className="border-t border-outline" />

      <div className="px-4 py-3">
        {loading ? (
          <>
            <Skeleton className="h-5 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </>
        ) : (
          <>
            <h3 className="text-primaryText font-semibold text-headline">
              {title}
            </h3>
            <p className="text-secondaryText text-body">{subtitle}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
