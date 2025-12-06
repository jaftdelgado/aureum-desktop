// src/core/components/Tabs.tsx
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@core/utils/cn";
import { motion } from "framer-motion";
import { Label } from "@core/ui/Label";

export interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  onChange,
  className,
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = tabs.findIndex((tab) => tab.value === value);
      const currentTab = tabRefs.current[activeIndex];
      if (currentTab && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const tabRect = currentTab.getBoundingClientRect();
        setIndicatorStyle({
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
        });
      }
    };

    updateIndicator();

    const resizeObserver = new ResizeObserver(updateIndicator);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [value, tabs]);

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center relative", className)}
    >
      {tabs.map((tab, index) => {
        const isActive = tab.value === value;

        return (
          <button
            key={tab.value}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            disabled={tab.disabled}
            className={cn(
              "focus:outline-none py-2 whitespace-nowrap",
              tab.disabled && "opacity-50 cursor-not-allowed",
              index < tabs.length - 1 && "mr-8"
            )}
            onClick={() => !tab.disabled && onChange(tab.value)}
          >
            <Label variant="body" color={isActive ? "primary" : "secondary"}>
              {tab.label}
            </Label>
          </button>
        );
      })}

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute bottom-0 h-0.5 bg-primaryBtn rounded"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />
    </div>
  );
};
