import React, { type ReactNode, useEffect, useState } from "react";
import { Label } from "../../modules/core/base-design/Label";
import { cn } from "@lib/utils";

interface ToggleOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface ToggleSelectionProps {
  options: ToggleOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  className?: string;
}

export const ToggleSelection: React.FC<ToggleSelectionProps> = ({
  options,
  value: controlledValue,
  onChange,
  label,
  className = "",
}) => {
  const [value, setValue] = useState<string>(
    controlledValue ?? options[0]?.value
  );

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const activeIndex = options.findIndex((opt) => opt.value === value);

  const handleClick = (val: string) => {
    setValue(val);
    onChange?.(val);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <Label variant="small" className="font-medium mb-1 ml-2">
          {label}
        </Label>
      )}

      <div
        className={cn(
          "relative inline-flex w-full rounded-xl border border-sidebarHoverBtn bg-sidebarHoverBtn",
          className
        )}
      >
        {activeIndex >= 0 && (
          <div
            className="absolute top-0 bottom-0 left-0 bg-panel rounded-xl transition-all duration-200"
            style={{
              width: `${100 / options.length}%`,
              left: `${(100 / options.length) * activeIndex}%`,
            }}
          />
        )}

        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleClick(opt.value)}
            className={cn(
              "relative flex-1 flex items-center justify-center gap-2 font-medium text-body px-4 py-2 cursor-pointer select-none",
              value === opt.value
                ? "text-primaryText z-10"
                : "text-secondaryText"
            )}
          >
            {opt.icon && (
              <span className="flex items-center text-body">{opt.icon}</span>
            )}
            <span className="text-body">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
