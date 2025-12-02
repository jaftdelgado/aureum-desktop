import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@core/utils/cn";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primaryBtn",
        "data-[state=unchecked]:bg-secondaryBtn",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full ring-0 transition-transform",
          "data-[state=checked]:translate-x-[calc(85%)] data-[state=unchecked]:translate-x-0",
          "bg-bg dark:data-[state=unchecked]:bg-secondaryBtn dark:data-[state=checked]:bg-primaryBtn"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
