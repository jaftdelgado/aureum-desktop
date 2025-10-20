import React from "react";
import { Button } from "@components/ui/button/Button";
import { Input } from "@components/ui/input/Input";
import { Textarea } from "@components/ui/textarea/TextArea";
import "./input-field.scss";

interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
}
interface InputGroupButtonProps extends React.ComponentProps<typeof Button> {
  size?: "xs" | "sm" | "icon-xs" | "icon-sm";
}

export const InputGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={`input-group ${className ?? ""}`} {...props} />;

export const InputGroupAddon: React.FC<InputGroupAddonProps> = ({
  className,
  align = "inline-start",
  ...props
}) => (
  <div
    className={`input-group-addon align-${align} ${className ?? ""}`}
    {...props}
    onClick={(e) => {
      if ((e.target as HTMLElement).closest("button")) return;
      e.currentTarget.parentElement?.querySelector("input")?.focus();
    }}
  />
);

export const InputGroupButton: React.FC<InputGroupButtonProps> = ({
  className,
  size = "xs",
  variant = "thirdy",
  ...props
}) => (
  <Button
    className={`input-group-button ${size} ${className ?? ""}`}
    variant={variant}
    {...props}
  />
);

export const InputGroupText: React.FC<
  React.HTMLAttributes<HTMLSpanElement>
> = ({ className, ...props }) => (
  <span className={`input-group-text ${className ?? ""}`} {...props} />
);

export const InputGroupInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ className, ...props }) => (
  <Input className={`input-group-control ${className ?? ""}`} {...props} />
);

export const InputGroupTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ...props }) => (
  <Textarea
    className={`input-group-control textarea ${className ?? ""}`}
    {...props}
  />
);
