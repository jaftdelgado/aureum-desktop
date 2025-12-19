import React, { type ReactNode } from "react";
import { Label } from "@core/ui/Label";
import { cn } from "@core/utils/cn";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  className = "",
}) => {
  return (
    <div className={cn("w-full flex flex-col", className)}>
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

        {actions && <div className="ml-2">{actions}</div>}
      </div>
    </div>
  );
};
