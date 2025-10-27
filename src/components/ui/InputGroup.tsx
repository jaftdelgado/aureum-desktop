"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@lib/utils";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Textarea } from "@components/ui/TextArea";
import { Label } from "@components/ui/Label";
import { Icon } from "@iconify/react";

interface InputGroupProps extends React.ComponentProps<"div"> {
  label?: string;
  error?: string;
}

function InputGroup({
  className,
  label,
  error,
  children,
  ...props
}: InputGroupProps) {
  return (
    <div className={cn("flex flex-col flex-1 min-w-0", className)} {...props}>
      {label && (
        <Label variant="small" className="font-medium mb-1 ml-2">
          {label}
        </Label>
      )}
      <div className={cn("relative w-full", error && "mb-4")}>
        <div
          data-slot="input-group"
          role="group"
          className={cn(
            "relative flex w-full items-center rounded-xl border border-sidebarHoverBtn bg-sidebarHoverBtn text-primaryText shadow-xs transition-[color,box-shadow] outline-none",
            "focus-within:ring-1 focus-within:ring-primaryBtn",
            "disabled:pointer-events-none disabled:opacity-60",
            "h-10"
          )}
        >
          {children}
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
      xs: "h-9 px-3 rounded-xl",
      sm: "h-10 px-4 rounded-xl",
    },
  },
  defaultVariants: { size: "xs" },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "thirdy",
  size = "xs",
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
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent pl-4 py-2 focus:ring-0",
        className
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent px-4 py-2 shadow-none focus:ring-0",
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
