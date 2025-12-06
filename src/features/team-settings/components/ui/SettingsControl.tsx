import React from "react";

interface SettingsControlProps {
  title: string;
  description?: string;
  control: React.ReactNode;
  controlWidth?: string; // 👈 ancho individual opcional
  isFirst?: boolean;
  isLast?: boolean;
}

export const SettingsControl: React.FC<SettingsControlProps> = ({
  title,
  description,
  control,
  controlWidth = "140px",
  isFirst = false,
  isLast = false,
}) => {
  const borderTop = isFirst ? "" : "border-t border-outline";
  const roundedTop = isFirst ? "rounded-t-xl" : "";
  const roundedBottom = isLast ? "rounded-b-xl" : "";

  return (
    <div
      className={`
        w-full flex items-center justify-between
        px-5 py-4
        bg-card text-left
        ${borderTop} ${roundedTop} ${roundedBottom}
      `}
    >
      {/* left */}
      <div className="flex flex-col">
        <span className="text-body text-primaryText">{title}</span>

        {description && (
          <span className="text-small text-secondaryText">{description}</span>
        )}
      </div>

      {/* right control */}
      <div
        className="flex items-center ml-4 md:ml-0 justify-end"
        style={{ width: controlWidth }}
      >
        {control}
      </div>
    </div>
  );
};

interface SettingsSectionProps {
  title?: string;
  children: React.ReactElement<SettingsControlProps>[];
  className?: string;
  controlWidth?: string; // 👈 NUEVO, ancho centralizado
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
  className = "",
  controlWidth, // 👈 se recibe aquí
}) => {
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child, {
      isFirst: index === 0,
      isLast: index === children.length - 1,
      controlWidth: child.props.controlWidth ?? controlWidth,
      // 👆 prioridad: individual > sección
    });
  });

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {title && <h3 className="text-body font-semibold mb-2">{title}</h3>}

      <div className="flex flex-col">{childrenWithProps}</div>
    </div>
  );
};
