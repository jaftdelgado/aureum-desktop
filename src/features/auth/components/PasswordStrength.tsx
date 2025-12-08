import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@core/utils/cn";
import { useTranslation } from "react-i18next";

interface PasswordStrengthProps {
  password?: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password = "" }) => {
  const { t } = useTranslation("auth");

  const requirements = [
    { id: "length", label: t("signup.strength.length"), regex: /.{8,}/ },
    { id: "upper", label: t("signup.strength.uppercase"), regex: /[A-Z]/ },
    { id: "lower", label: t("signup.strength.lowercase"), regex: /[a-z]/ },
    { id: "number", label: t("signup.strength.number"), regex: /\d/ },
    { id: "symbol", label: t("signup.strength.symbol"), regex: /[\W_]/ },
  ];

  return (
    <div className="bg-surface-variant/30 p-3 rounded-lg border border-border mt-2 mb-2 animate-in slide-in-from-top-2 duration-300">
      <p className="text-xs font-semibold text-secondaryText mb-2">
        {t("signup.strength.title")}
      </p>
      <ul className="grid grid-cols-1 gap-1">
        {requirements.map((req) => {
          const isValid = req.regex.test(password);
          return (
            <li key={req.id} className="flex items-center gap-2">
              <Icon
                icon={isValid ? "lucide:check-circle-2" : "lucide:circle"}
                className={cn(
                  "w-3.5 h-3.5 transition-colors duration-300",
                  isValid ? "text-green-500" : "text-secondaryText/50"
                )}
              />
              <span
                className={cn(
                  "text-xs transition-colors duration-300",
                  isValid ? "text-primaryText" : "text-secondaryText"
                )}
              >
                {req.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};