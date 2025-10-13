import React from "react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@components/ui/input-field/InputField";
import { Button } from "@ui/button/Button";
import "./teams.scss";
import "@scss/texts.scss";

export const Teams: React.FC = () => {
  return (
    <div className="courses-page">
      <div className="courses-header">
        <div className="courses-header__left">
          <h1>Cursos disponibles</h1>
          <p>Explora y gestiona tus cursos activos</p>
        </div>

        <div className="courses-header__right">
          <Button variant="default" icon="gravity-ui:plus">
            Nuevo curso
          </Button>
        </div>
      </div>

      <div className="search-bar">
        <InputGroup>
          <InputGroupAddon>
            <span className="iconify" data-icon="mdi:magnify"></span>
          </InputGroupAddon>
          <InputGroupInput placeholder="Buscar curso..." />
        </InputGroup>
      </div>
    </div>
  );
};
