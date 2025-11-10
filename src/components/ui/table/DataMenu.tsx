import React from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@ui/InputGroup";
import { Icon } from "@iconify/react";

interface DataMenuProps {
  query: string;
  onQueryChange: (value: string) => void;
  total: number;
  search?: boolean;
}

export const DataMenu: React.FC<DataMenuProps> = ({
  query,
  onQueryChange,
  total,
  search = true,
}) => {
  if (!search) return null;

  return (
    <div className="mb-3 mx-4">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Icon icon="lucide:search" className="w-4 h-4 text-secondaryText" />
        </InputGroupAddon>

        <InputGroupInput
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar..."
        />

        <InputGroupAddon align="inline-end">
          <span className="text-secondaryText text-body">
            {total} resultado{total !== 1 ? "s" : ""}
          </span>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
