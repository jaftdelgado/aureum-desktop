# Módulo de Portafolio (Portfolio)

Este módulo es el centro de seguimiento financiero del usuario. Permite visualizar el rendimiento de las inversiones, el balance actual y el historial de transacciones, todo actualizado en tiempo real.

## Arquitectura y Flujo de Datos

El módulo implementa una arquitectura híbrida para garantizar precisión y reactividad:

1.  **Capa de Datos Estáticos (React Query)**:
    * **Responsabilidad**: Carga inicial del portafolio (cantidad poseída, precio promedio de compra).
    * **Fuente**: `PortfolioRepository` (REST API).
    * **Hook**: `usePortfolioData`.

2.  **Capa de Tiempo Real (Streaming)**:
    * **Responsabilidad**: Actualización de precios de mercado en vivo para recalcular PnL (Profit & Loss).
    * **Caso de Uso**: `SubscribeToMarketUseCase`.
    * **Flujo**:
        1. Al montar `PortfolioPage`, se establece una conexión persistente (SSE/WebSocket) con el mercado del equipo seleccionado.
        2. Al recibir un `snapshot` de precios, se actualiza un diccionario local `livePrices`.
        3. Un `useMemo` fusiona el **inventario estático** con el **precio dinámico** para recalcular el valor total y el rendimiento al vuelo.

---

## Componentes Clave

### `PortfolioPage` (`src/features/portfolio/pages/PortfolioPage.tsx`)
Controlador principal. Orquesta:
* La selección del equipo (`SelectedTeamContext`).
* La suscripción al stream de mercado.
* El cálculo derivado de ganancias/pérdidas (`profitOrLoss`).
* La interacción master-detail (seleccionar un activo para ver su historial).

### `PortfolioPnLChart` (`src/features/portfolio/components/PortfolioPnLChart.tsx`)
Visualización gráfica del rendimiento.
* Utiliza **Recharts**.
* Muestra barras dinámicas que cambian de color (Verde/Rojo) según si la posición es ganadora o perdedora.
* Incluye un **Tooltip personalizado** con detalles financieros precisos.

### `AssetMovementsList` (`src/features/portfolio/components/AssetMovementsList.tsx`)
Vista de detalle que se despliega al seleccionar un activo de la tabla principal. Muestra el historial de compras y ventas específicas de ese activo.

---

## Hooks

| Hook | Ubicación | Descripción |
| :--- | :--- | :--- |
| **`usePortfolioData`** | `hooks/usePortfolioQueries.ts` | Facade sobre React Query. Gestiona la caché de `portfolio` (inventario actual) y `history` (historial de movimientos). |
| **`usePortfolioQueries`** | `hooks/usePortfolioQueries.ts` | Contiene las definiciones de `queryKey` y `queryFn` para mantener la consistencia del estado del servidor. |

---

## Estructura de Archivos

```text
src/features/portfolio/
├── components/          # Componentes de presentación (Gráficos, Listas)
│   ├── AssetMovementsList.tsx
│   └── PortfolioPnLChart.tsx
├── hooks/               # Lógica de obtención de datos
│   ├── types.ts         # Definiciones de tipos locales
│   └── usePortfolioQueries.ts
├── pages/               # Vistas principales
│   └── PortfolioPage.tsx
└── i18n/                # Traducciones específicas del dominio financiero
    ├── en.json
    └── es.json