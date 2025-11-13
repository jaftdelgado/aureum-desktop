import React, { type ReactNode } from "react";
import { Label } from "@ui/Label";
import { useIsMobile } from "@hooks/useIsMobile";

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  className = "",
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`flex justify-between items-end w-full py-4 px-6 border-b border-outline ${className}`}
    >
      <div className="flex flex-col gap-1">
        <Label variant="header" color="primary">
          {title}
        </Label>
        {!isMobile && description && (
          <Label variant="body" color="secondary">
            {description}
          </Label>
        )}
      </div>

      {actions && <div className="ml-2">{actions}</div>}
    </div>
  );
};
