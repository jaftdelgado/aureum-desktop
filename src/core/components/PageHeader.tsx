import React, { type ReactNode } from "react";
import { Label } from "@core/ui/Label";
import { Tabs, type TabItem } from "@core/components/Tabs";
import { cn } from "@core/utils/cn";
<<<<<<< HEAD
import { motion } from "framer-motion";
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  tabs?: TabItem[];
  selectedTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  tabs,
  selectedTab,
  onTabChange,
  className = "",
}) => {
  return (
    <div className={cn("w-full flex flex-col", className)}>
<<<<<<< HEAD
      <div className="flex justify-between items-end w-full py-page-y px-page-x bg-bg border-b border-outline">
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Label variant="header" color="primary" className="-mb-4">
              {title}
            </Label>
          </motion.div>

          {description && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <Label variant="body" color="secondary">
                {description}
              </Label>
            </motion.div>
          )}
        </div>

=======
      <div className="flex justify-between items-end w-full py-page-y px-page-x border-b border-outline">
        <div className="flex flex-col gap-1">
          <Label variant="header" color="primary">
            {title}
          </Label>
          {description && (
            <Label variant="body" color="secondary">
              {description}
            </Label>
          )}
        </div>
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
        {actions && <div className="ml-2">{actions}</div>}
      </div>

      {tabs && selectedTab !== undefined && onTabChange && (
        <div className="w-full px-page-x border-b border-outline">
          <Tabs tabs={tabs} value={selectedTab} onChange={onTabChange} />
        </div>
      )}
    </div>
  );
};
