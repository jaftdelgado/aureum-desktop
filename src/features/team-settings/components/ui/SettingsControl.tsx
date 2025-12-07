import React from "react";


interface SettingsControlProps {
  title: string;
  description?: string;
  control?: React.ReactNode; 
  controlWidth?: string; 
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
      <div className="flex flex-col pr-4"> 
        <span className="text-body text-primaryText">{title}</span>

        {description && (
          <span className="text-small text-secondaryText">{description}</span>
        )}
      </div>

      {control && (
        <div
          className="flex items-center ml-4 md:ml-0 justify-end"
          style={{ width: controlWidth }}
        >
          {control}
        </div>
      )}
    </div>
  );
};

interface SettingsSectionProps {
  title?: string;
  children: React.ReactNode; 
  className?: string;
  controlWidth?: string; 
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
  className = "",
  controlWidth,
}) => {
  const arrayChildren = React.Children.toArray(children);

  const childrenWithProps = arrayChildren.map((child, index) => {
    if (!React.isValidElement(child)) return child;

    const childProps = child.props as Partial<SettingsControlProps>;

    return React.cloneElement(child as React.ReactElement<any>, {
      isFirst: index === 0,
      isLast: index === arrayChildren.length - 1,
      controlWidth: childProps.controlWidth ?? controlWidth,
    });
  });

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {title && <h3 className="text-body font-semibold mb-2">{title}</h3>}

      <div className="flex flex-col shadow-sm rounded-xl"> {/* Agregué shadow/rounded opcional al contenedor */}
        {childrenWithProps}
      </div>
    </div>
  );
};