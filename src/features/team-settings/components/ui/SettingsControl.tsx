import React from "react";
import { Skeleton } from "@core/ui/Skeleton";

interface SettingsControlProps {
  title: string;
  description?: string;
  control: React.ReactNode;
  controlWidth?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isLoading?: boolean;
}

export const SettingsControl: React.FC<SettingsControlProps> = ({
  title,
  description,
  control,
  controlWidth = "140px",
  isFirst = false,
  isLast = false,
  isLoading = false,
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
      <div className="flex flex-col flex-1">
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-32 mb-2" />
            {description !== undefined && <Skeleton className="h-3 w-48" />}
          </>
        ) : (
          <>
            <span className="text-body text-primaryText">{title}</span>
            {description && (
              <span className="text-small text-secondaryText">
                {description}
              </span>
            )}
          </>
        )}
      </div>

      <div
        className="flex items-center ml-4 md:ml-0 justify-end"
        style={{ width: controlWidth }}
      >
        {isLoading ? <Skeleton className="h-8 w-full" /> : control}
      </div>
    </div>
  );
};

interface SettingsSectionProps {
  title?: string;
  children: React.ReactElement<SettingsControlProps>[];
  className?: string;
  controlWidth?: string;
  isLoading?: boolean;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
  className = "",
  controlWidth,
  isLoading = false,
}) => {
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child, {
      isFirst: index === 0,
      isLast: index === children.length - 1,
      controlWidth: child.props.controlWidth ?? controlWidth,
      isLoading: child.props.isLoading ?? isLoading,
    });
  });

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {title && <h3 className="text-body font-semibold mb-2">{title}</h3>}

      <div className="flex flex-col">{childrenWithProps}</div>
    </div>
  );
};
