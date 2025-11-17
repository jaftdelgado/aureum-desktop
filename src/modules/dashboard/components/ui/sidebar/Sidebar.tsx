import React, {
  useState,
  useEffect,
  type ReactNode,
  type ButtonHTMLAttributes,
} from "react";
import { Icon } from "@iconify/react";
import { SidebarFooter } from "./SidebarFooter";
import { useLocation } from "react-router-dom"; // <- Importamos useLocation

export type SidebarItem =
  | {
      type: "button";
      icon?: string;
      label: string;
      route: string;
      active?: boolean;
    }
  | {
      type: "separator";
      label: string;
      active?: boolean;
    };

interface SidebarProps {
  items: SidebarItem[];
  onNavigate?: (route: string) => void;
  className?: string;
  profile?: {
    name: string;
    role: string;
    avatarUrl: string;
    onClick?: () => void;
  };
}

interface SidebarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: string;
  state?: "selected" | "hover";
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  children,
  icon,
  state = "hover",
  className = "",
  ...props
}) => {
  const baseClasses =
    "flex items-center justify-start gap-2 rounded-xl text-body transition-all disabled:opacity-60 disabled:pointer-events-none px-4 py-2";

  const stateClasses: Record<"selected" | "hover", string> = {
    selected: "bg-secondaryBtn text-blue-400",
    hover:
      "bg-transparent text-secondaryText hover:bg-gray-800 hover:text-white",
  };

  return (
    <button
      className={`${baseClasses} ${stateClasses[state]} ${className}`}
      {...props}
    >
      {icon && <Icon icon={icon} width={17} height={17} />}
      {children && <span className="flex-1 text-left">{children}</span>}
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  onNavigate,
  className = "",
  profile,
}) => {
  const location = useLocation(); // <- Obtenemos la ruta actual
  const [activeRoute, setActiveRoute] = useState<string>("");

  useEffect(() => {
    // Si existe un botón con la ruta actual, se selecciona automáticamente
    const match = items.find(
      (i) => i.type === "button" && i.route === location.pathname
    );
    if (match && match.type === "button") {
      setActiveRoute(match.route);
    }
  }, [location.pathname, items]);

  const handleClick = (route: string) => {
    setActiveRoute(route);
    onNavigate?.(route);
  };

  const renderSeparator = (label: string, key: string | number) => (
    <div
      key={key}
      className="text-secondaryText text-small font-medium uppercase mt-4 mb-1 pl-2 select-none"
    >
      {label}
    </div>
  );

  return (
    <aside
      className={`flex flex-col w-60 h-full bg-panel text-white p-4 border-r border-outline ${className}`}
    >
      <nav className="flex flex-col gap-1 flex-1">
        {items.map((item, index) =>
          item.type === "separator" ? (
            renderSeparator(item.label, `sep-${index}`)
          ) : (
            <SidebarButton
              key={item.route}
              icon={item.icon}
              state={activeRoute === item.route ? "selected" : "hover"}
              onClick={() => handleClick(item.route)}
            >
              {item.label}
            </SidebarButton>
          )
        )}
      </nav>
      {profile && (
        <SidebarFooter
          name={profile.name}
          role={profile.role}
          avatarUrl={profile.avatarUrl}
          onClick={profile.onClick}
        />
      )}
    </aside>
  );
};
