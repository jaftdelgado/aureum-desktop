import * as React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@core/utils/cn";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@core/components/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@core/components/Popover";

export interface ComboboxItem {
  value: string;
  label: string;
}

type ComboboxVariant = "primary" | "secondary";
type ComboboxSize = "sm" | "md" | "lg";

interface ComboboxProps {
  items: ComboboxItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  variant?: ComboboxVariant;
  size?: ComboboxSize;
  width?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  items,
  value,
  onChange,
  placeholder = "Select an option...",
  searchable = false,
  variant = "primary",
  size = "md",
  width = "w-36",
}) => {
  const [open, setOpen] = React.useState(false);
  const selectedLabel = items.find((item) => item.value === value)?.label;

  const sizeClasses: Record<ComboboxSize, string> = {
    sm: "h-8 px-3 py-1.5 text-body",
    md: "h-9 px-4 py-2 text-body",
    lg: "h-10 px-5 py-3 text-body",
  };

  const iconSizes: Record<ComboboxSize, number> = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  const buttonClasses = cn(
    "inline-flex justify-between items-center rounded-xl transition-all duration-150 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBtn text-body",
    sizeClasses[size],
    width,
    variant === "primary"
      ? "bg-secondaryBtn text-primaryText hover:bg-secondaryHoverBtn"
      : "bg-transparent text-primaryText hover:bg-secondaryHoverBtn"
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={buttonClasses} aria-expanded={open}>
          <span className="text-body truncate">
            {selectedLabel || placeholder}
          </span>

          <Icon
            icon="lucide:chevrons-down"
            className="ml-2 shrink-0 opacity-50"
            width={iconSizes[size]}
            height={iconSizes[size]}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className={cn("p-0", width)}>
        <Command className="text-body">
          {searchable && (
            <CommandInput placeholder={placeholder} className="text-body" />
          )}

          <CommandList className="text-body">
            <CommandEmpty className="text-body">No options found.</CommandEmpty>

            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Icon
                    icon="lucide:check"
                    className={cn(
                      "mr-2",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                    width={iconSizes[size]}
                    height={iconSizes[size]}
                  />

                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
