// src/features/teams/components/TeamCard.tsx
import React from "react";

interface TeamCardProps {
  image: string;
  title: string;
  subtitle: string;
  isFree?: boolean;
  onClick?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  image,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <div
      className="bg-card rounded-xl overflow-hidden border border-outline transition-shadow cursor-pointer max-w-xs hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] w-full">
        <img
          src={image || "https://placehold.co/600x400?text=Curso"}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="px-4 py-3">
        <h3 className="text-primaryText font-semibold text-headline">
          {title}
        </h3>
        <p className="text-secondaryText text-body">{subtitle}</p>
      </div>
    </div>
  );
};

export default TeamCard;
