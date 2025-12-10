import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@core/components/InputGroup";
import { Button } from "@core/ui/Button";
import { ButtonGroup } from "@core/components/ButtonGroup";
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
    <div className="px-component-x py-component-y flex items-center justify-between gap-4">
      <div className="w-2/5 min-w-[260px]">
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Icon icon="lucide:search" className="w-4 h-4 text-secondaryText" />
          </InputGroupAddon>

          <InputGroupInput
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar..."
            size="sm"
          />

          <InputGroupAddon align="inline-end">
            <span className="text-secondaryText text-body whitespace-nowrap">
              {total} resultado{total !== 1 ? "s" : ""}
            </span>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex justify-end">
        <ButtonGroup>
          <Button variant="secondary" size="sm" icon="lucide:filter">
            Filtrar
          </Button>
          <Button variant="secondary" size="sm" icon="lucide:arrow-up-down">
            Ordenar
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
