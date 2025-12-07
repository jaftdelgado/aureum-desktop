import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@core/utils/cn";
import { Button } from "@core/ui/Button";
import { Input, type InputProps } from "@core/ui/Input";
import { Textarea } from "@core/ui/TextArea";
import { Label } from "@core/ui/Label";
import { Icon } from "@iconify/react";

interface InputGroupProps extends React.ComponentProps<"div"> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

function InputGroup({
  className,
  label,
  error,
  size = "md",
  children,
  ...props
}: InputGroupProps) {
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<{
        size?: "sm" | "md" | "lg";
      }>;
      if (element.props.size === undefined) {
        return React.cloneElement(element, { size });
      }
    }
    return child;
  });

  return (
    <div className={cn("flex flex-col flex-1 min-w-0", className)} {...props}>
      {label && (
        <Label variant="small" className="mb-1 ml-2">
          {label}
        </Label>
      )}

      <div className={cn("relative w-full", error && "mb-4")}>
        <div
          data-slot="input-group"
          role="group"
          className={cn(
            "relative flex w-full items-center rounded-xl bg-secondaryBtn text-primaryText shadow-xs transition-[color,box-shadow] outline-none",
            "focus-within:ring-1 focus-within:ring-primaryBtn",
            "disabled:pointer-events-none disabled:opacity-60"
          )}
        >
          {enhancedChildren}
        </div>

        {error && (
          <div className="absolute -bottom-5 left-1 flex items-center gap-1">
            <Icon
              icon="lucide:circle-x"
              className="w-3.5 h-3.5 text-destructive"
            />
            <Label variant="small" color="destructive">
              {error}
            </Label>
          </div>
        )}
      </div>
    </div>
  );
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-md group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-4",
        "inline-end": "order-last pr-4",
        "block-start": "order-first w-full justify-start px-4 pt-2",
        "block-end": "order-last w-full justify-start px-4 pb-2",
      },
    },
    defaultVariants: { align: "inline-start" },
  }
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("flex items-center gap-2 text-sm", {
  variants: {
    size: {
      sm: "h-9 px-3 rounded-xl",
      md: "h-10 px-4 rounded-xl",
      lg: "h-11 px-5 rounded-xl",
    },
  },
  defaultVariants: { size: "md" },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "thirdy",
  size = "md",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  size = "md",
  ...props
}: Omit<InputProps, "label" | "error">) {
  return (
    <Input
      data-slot="input-group-control"
      size={size}
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent focus:ring-0",
        className
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"textarea"> & { size?: "sm" | "md" | "lg" }) {
  const sizeVariants: Record<"sm" | "md" | "lg", string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent shadow-none focus:ring-0",
        sizeVariants[size],
        className
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
};
