import { Toaster as Sonner } from "sonner";
import { useAppTheme } from "@app/hooks/useAppTheme";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useAppTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface group-[.toaster]:text-primaryText group-[.toaster]:border-border group-[.toaster]:shadow-lg rounded-xl",
          description: "group-[.toast]:text-secondaryText",
          actionButton:
            "group-[.toast]:bg-primaryBtn group-[.toast]:text-bg",
          cancelButton:
            "group-[.toast]:bg-surface-variant group-[.toast]:text-secondaryText",
        },
      }}
      {...props}
    />
  );
};