import React from "react";

interface SettingsControlProps {
  title: string;
  description?: string;
  control: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

export const SettingsControl: React.FC<SettingsControlProps> = ({
  title,
  description,
  control,
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
        bg-input
        text-left
        ${borderTop} ${roundedTop} ${roundedBottom}
      `}
    >
      <div className="flex flex-col">
        <span className="text-body text-primaryText">{title}</span>
        {description && (
          <span className="text-small text-secondaryText">{description}</span>
        )}
      </div>
      <div className="flex items-center">{control}</div>
    </div>
  );
};

interface SettingsSectionProps {
  title?: string;
  children: React.ReactElement<SettingsControlProps>[];
  className?: string;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
  className = "",
}) => {
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, {
      isFirst: index === 0,
      isLast: index === children.length - 1,
    });
  });

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {title && <h3 className="text-body font-semibold mb-2">{title}</h3>}
      <div className="flex flex-col">{childrenWithProps}</div>
    </div>
  );
};
