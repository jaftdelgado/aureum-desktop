// src/core/layout/FormLayout.tsx
import React from "react";
import { Label } from "@core/ui/Label";
import { Skeleton } from "@core/ui/Skeleton";
import { cn } from "@core/utils/cn";

interface FormLayoutSection {
  title: string;
  description?: string;
  content: React.ReactNode;
}

interface FormLayoutProps {
  sections: FormLayoutSection[];
  className?: string;
  isLoading?: boolean;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  sections,
  className,
  isLoading = false,
}) => {
  return (
    <div className={cn("flex flex-col gap-10 w-full", className)}>
      {sections.map((section, index) => (
        <div
          key={index}
          className="
            grid grid-cols-1 
            md:grid-cols-[260px_1fr]
            gap-8 pb-8 
            border-b border-outline
          "
        >
          <div className="flex flex-col gap-2 pr-4">
            {isLoading ? (
              <>
                <Skeleton className="h-5 w-40 mb-1" />
                {section.description && <Skeleton className="h-4 w-56" />}
              </>
            ) : (
              <>
                <Label
                  variant="headline"
                  color="primary"
                  className="mt-2 font-medium"
                >
                  {section.title}
                </Label>

                {section.description && (
                  <Label variant="body" color="secondary">
                    {section.description}
                  </Label>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col">{section.content}</div>
        </div>
      ))}
    </div>
  );
};

export default FormLayout;
