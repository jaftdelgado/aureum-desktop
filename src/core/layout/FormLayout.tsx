import React from "react";
import { Label } from "@core/ui/Label";
import { cn } from "@core/utils/cn";

interface FormLayoutSection {
  title: string;
  description?: string;
  content: React.ReactNode;
}

interface FormLayoutProps {
  sections: FormLayoutSection[];
  className?: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({ sections, className }) => {
  return (
    <div className={cn("flex flex-col gap-10 w-full", className)}>
      {sections.map((section, index) => (
        <div
          key={index}
          className="
            grid grid-cols-1 
            md:grid-cols-[260px_1fr] 
            gap-8 pb-8 
            border-b border-outline/30
          "
        >
          <div className="flex flex-col gap-2 pr-4">
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
          </div>

          <div className="flex flex-col">{section.content}</div>
        </div>
      ))}
    </div>
  );
};

export default FormLayout;
