// src/features/dashboard/components/AppBreadcrumb.tsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BreadcrumbItem } from "./breadcrumb/BreadcrumbItem";
import { useTranslation } from "react-i18next";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";

export const AppBreadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation("dashboard");
  const { selectedTeam } = useSelectedTeam();

  const pathnames = pathname.split("/").filter((x) => x);
  const ROOTS = ["home", "teams", "lessons"];
  const currentRoot = ROOTS.find((r) => pathnames[0] === r);

  const formatName = (segment: string, index: number) => {
    // Si es el teamId y tenemos un equipo seleccionado, usamos el nombre
    if (segment === pathnames[1] && pathnames[0] === "teams" && selectedTeam) {
      return selectedTeam.name;
    }

    if (!isNaN(Number(segment))) return segment;
    const key = `breadcrumb.${segment}`;
    const translated = t(key);
    return translated !== key
      ? translated
      : segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  if (pathnames.length === 0) {
    return (
      <nav className="flex items-center text-small font-normal text-secondaryText">
        <span className="font-medium text-primaryText">
          {t("breadcrumb.home")}
        </span>
      </nav>
    );
  }

  if (currentRoot) {
    return (
      <nav className="flex items-center text-small font-normal text-secondaryText">
        {pathnames.map((name, index) => {
          if (name === "dashboard") return null;
          const isLast = index === pathnames.length - 1;
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          return (
            <BreadcrumbItem
              key={routeTo}
              to={isLast ? undefined : routeTo}
              isLast={isLast}
              isFirst={index === 0}
              label={formatName(name, index)}
            />
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center text-small font-normal text-secondaryText">
      <NavLink to="/home" className="hover:text-primaryText">
        {t("breadcrumb.home")}
      </NavLink>

      {pathnames.map((name, index) => {
        if (name === "dashboard") return null;
        const isLast = index === pathnames.length - 1;
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        return (
          <BreadcrumbItem
            key={routeTo}
            to={isLast ? undefined : routeTo}
            isLast={isLast}
            isFirst={false}
            label={formatName(name, index)}
          />
        );
      })}
    </nav>
  );
};
