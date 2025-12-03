# 🖥️ Aureum Desktop

Aureum es una plataforma educativa web y de escritorio que enseña inversiones mediante simulaciones prácticas en equipo.
Cada equipo funciona como un mercado aislado, donde las decisiones de compra y venta afectan el rendimiento colectivo, permitiendo un entorno seguro, gamificado e interactivo para aprender estrategias de inversión y comprender el comportamiento del mercado.

> [!IMPORTANT]  
> Este proyecto es privado y **no acepta contribuciones externas**.

## 🛠 Stack Tecnológico
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)


---

## 🏗 Arquitectura: Hexagonal + Modular

El proyecto implementa una combinación de arquitectura hexagonal y modularidad por funcionalidades, permitiendo aislar la lógica de negocio de la infraestructura y mantener una interfaz limpia y desacoplada.

| Capa / Concepto | Carpeta / Ubicación | Descripción |
|-----------------|---------------------|-------------|
| 🏠 App | `app/` | Configuración global de la aplicación, navegación y providers. |
|             | `app/config/` | Manejo de variables de entorno (`env.ts`). |
|             | `app/context/` | Contextos globales: autenticación, estado global, etc. |
|             | `app/navigation/` | Rutas, protección de rutas, redirecciones y layout principal. |
|             | `app/components/` | Componentes específicos del shell de la app (ej. `ThemeToggleButton`). |
|             | `app/dashboard/` | Layout y componentes principales del dashboard (sidebar, header, etc.). |
|             | `app/resources/` | Assets globales, como tipografías. |
| 🎨 Core     | `core/` | Biblioteca interna reutilizable en toda la aplicación. No depende de features. |
|             | `core/components/` | Componentes avanzados desacoplados (Dialog, PageHeader, Popover...). |
|             | `core/ui/` | Componentes UI básicos (Button, Input, Label, Switch, Separator…). |
|             | `core/design/` | Tokens de diseño, temas, tipografías y estilos globales. |
|             | `core/utils/` | Utilidades independientes (`cn.ts`, helpers…). |
| 💼 Domain   | `domain/` | Lógica de negocio pura, independiente de UI e infraestructura. |
|             | `domain/entities/` | Entidades del dominio (`LoggedInUser`, etc.). |
|             | `domain/repositories/` | Interfaces de repositorios. |
|             | `domain/use-cases/` | Casos de uso organizados por módulo (login, sesión, etc.). |
| 🔧 Infra    | `infra/` | Adaptadores y conectores hacia infraestructura externa. |
|             | `infra/api/` | Implementaciones de acceso a APIs propias. |
|             | `infra/external/` | Integraciones externas como Supabase |
| 🗂 Features | `features/` | Módulos independientes organizados por funcionalidad. |
|             | `features/auth/`, `features/assets/`, `features/market/`, etc. | Cada módulo contiene sus propios componentes, hooks, i18n, páginas y schemas. |
|             | `features/team-settings/` | Módulo específico con layouts, componentes y UI propia. |
|             | `features/teams/` | Flujo y pantallas relacionadas con equipos. |
| 📦 Entrypoints | `main.tsx`, `App.tsx` | Punto de entrada de la aplicación, carga inicial de contextos, temas y router. |
| 🎨 Styles globales | `index.css` | Estilos globales que inicializan Tailwind y variables de diseño. |
--- 

## ⚡ Instalación

1️⃣ Clonar el repositorio:
```bash
git clone https://github.com/usuario/aureum-desktop.git
```

2️⃣ Instalar dependencias:
```bash
npm install
```

3️⃣ Ejecutar la aplicación:
```bash
# Ejecutar la versión de escritorio
npm run dev:desktop

# Ejecutar la versión web
npm run dev:web
```

> [!NOTE]
> Asegúrate de tener instalado Node.js y un gestor de paquetes como npm o pnpm.

## 🔒 Estado del proyecto

Proyecto **en desarrollo**.

Código privado no abierto para contribuciones externas.

## 📄 Licencia

Propietario: código privado.
