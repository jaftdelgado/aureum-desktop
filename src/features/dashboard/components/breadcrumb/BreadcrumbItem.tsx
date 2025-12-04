import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

interface BreadcrumbItemProps {
  to?: string;
  isLast?: boolean;
  isFirst?: boolean;
  label: string;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  to,
  isLast,
  isFirst,
  label,
}) => {
  return (
    <span className="flex items-center">
      {/* No mostrar el icono si es el primer breadcrumb */}
      {!isFirst && (
        <span className="mx-[6px] flex items-center text-gray-400">
          <Icon icon="gravity-ui:chevron-right" width={10} height={10} />
        </span>
      )}

      {isLast || !to ? (
        <span className="font-medium text-primaryText truncate cursor-default select-none">
          {label}
        </span>
      ) : (
        <NavLink
          to={to}
          className="text-secondaryText hover:text-primaryText transition-colors truncate"
        >
          {label}
        </NavLink>
      )}
    </span>
  );
};
