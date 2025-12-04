import React from "react";
import { NavLink } from "react-router-dom";
import { BreadcrumbItem } from "./BreadcrumbItem";

interface BreadcrumbProps {
  pathnames: string[];
  isDashboard: boolean;
  formatName?: (name: string) => string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  pathnames,
  isDashboard,
  formatName = (name) => name,
}) => {
  return (
    <nav className="flex items-center text-small font-normal text-secondaryText">
      {isDashboard ? (
        <span className="font-medium text-primaryText cursor-default select-none">
          Inicio
        </span>
      ) : (
        <NavLink
          to="/dashboard"
          className="text-secondaryText hover:text-primaryText transition-colors"
        >
          Inicio
        </NavLink>
      )}

      {/* Items dinámicos */}
      {pathnames.map((name, index) => {
        if (name === "dashboard") return null;

        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <BreadcrumbItem
            key={routeTo}
            to={isLast ? undefined : routeTo}
            isLast={isLast}
            label={formatName(name)}
          />
        );
      })}
    </nav>
  );
};
