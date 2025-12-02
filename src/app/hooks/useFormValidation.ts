import { useState } from "react";

export type ValidationRule<T> = {
  field: keyof T;
  validate: (value: T[keyof T], form: T) => string | null;
};

export function useFormValidation<T>(rules: ValidationRule<T>[]) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateFields = (form: T): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    for (const { field, validate } of rules) {
      const error = validate(form[field], form);
      if (error) {
        newErrors[field] = error;
        break;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, setErrors, validateFields };
}
