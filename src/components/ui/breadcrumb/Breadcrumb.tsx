import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import "@ui/breadcrumb/breadcrumb.scss";

const routeNameMap: Record<string, string> = {
  "": "Inicio",
  home: "Inicio",
  dashboard: "Inicio",
  courses: "Cursos",
};

const formatName = (name: string): string =>
  routeNameMap[name] || name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const isDashboard = location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <nav className="breadcrumb">
      {isDashboard ? (
        <span className="breadcrumb-current">Inicio</span>
      ) : (
        <NavLink to="/dashboard" className="breadcrumb-item-link">
          Inicio
        </NavLink>
      )}

      {pathnames.map((name, index) => {
        if (name === "dashboard") return null;
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={routeTo} className="breadcrumb-item">
            <span className="breadcrumb-separator">
              <Icon icon="gravity-ui:chevron-right" width={10} height={10} />
            </span>

            {isLast ? (
              <span className="breadcrumb-current">{formatName(name)}</span>
            ) : (
              <NavLink to={routeTo} className="breadcrumb-item-link">
                {formatName(name)}
              </NavLink>
            )}
          </span>
        );
      })}
    </nav>
  );
};
