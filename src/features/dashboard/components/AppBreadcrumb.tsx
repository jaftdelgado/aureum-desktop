import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BreadcrumbItem } from "./breadcrumb/BreadcrumbItem";
import { useTranslation } from "react-i18next";

export const AppBreadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation("dashboard");

  const pathnames = pathname.split("/").filter((x) => x);
  const ROOTS = ["home", "teams", "lessons"];
  const currentRoot = ROOTS.find((r) => pathnames[0] === r);

  const formatName = (segment: string) => {
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
              label={formatName(name)}
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
            label={formatName(name)}
          />
        );
      })}
    </nav>
  );
};
