import React from "react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@components/ui/input-field/InputField";

export const Courses: React.FC = () => {
  return (
    <div className="courses-page">
      <h1 className="title">Cursos disponibles</h1>

      <div className="search-bar">
        <InputGroup>
          <InputGroupAddon>
          </InputGroupAddon>

          <InputGroupInput placeholder="Buscar curso..." />
        </InputGroup>
      </div>
    </div>
  );
};
