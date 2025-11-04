import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const routeNameMap: Record<string, string> = {
  "": "Inicio",
  home: "Inicio",
  dashboard: "Inicio",
  courses: "Cursos",
};

const formatName = (name: string): string =>
  routeNameMap[name] ||
  name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const isDashboard =
    location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <nav className="flex items-center text-small font-normal text-secondaryText">
      {isDashboard ? (
        <span className="font-medium text-primaryText cursor-default select-none">
          Inicio
        </span>
      ) : (
        <NavLink
          to="/dashboard"
          className="text-secondaryText hover:text-gray-500 transition-colors"
        >
          Inicio
        </NavLink>
      )}

      {pathnames.map((name, index) => {
        if (name === "dashboard") return null;
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={routeTo} className="flex items-center">
            <span className="mx-[6px] flex items-center text-gray-400">
              <Icon icon="gravity-ui:chevron-right" width={10} height={10} />
            </span>

            {isLast ? (
              <span className="font-medium text-primaryText truncate cursor-default select-none">
                {formatName(name)}
              </span>
            ) : (
              <NavLink
                to={routeTo}
                className="text-secondaryText hover:text-gray-500 transition-colors truncate"
              >
                {formatName(name)}
              </NavLink>
            )}
          </span>
        );
      })}
    </nav>
  );
};
