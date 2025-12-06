// src/features/dashboard/components/breadcrumb/BreadcrumbItem.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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
    <motion.span
      className="flex items-center"
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -5 }}
      transition={{ duration: 0.2 }}
    >
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
    </motion.span>
  );
};
