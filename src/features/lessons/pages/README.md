# Módulo de Lecciones (Lessons)

Este módulo gestiona el contenido educativo de la plataforma, permitiendo a los usuarios navegar por el catálogo de clases y consumir contenido multimedia.

## Arquitectura

Sigue el patrón de **Clean Architecture** simplificado para consumo de datos:

1.  **Capa de Presentación**:
    * Gestionada por `LessonsPage` y sus componentes visuales.
    * Estado de UI: Selección de video (`selectedLesson`), estado de carga.
2.  **Capa de Infraestructura**:
    * **Repositorio**: `LessonsRepository` (`src/infra/api/lessons/LessonsRepository.ts`).
    * Encargado de la comunicación con el backend para obtener el catálogo de videos.

---

## Componentes Clave

### `LessonsPage` (`src/features/lessons/pages/pages/LessonsPage.tsx`)
Vista de catálogo tipo "Grid".
* Gestiona el estado de carga (`isLoading`) y estados vacíos.
* Controla el `VideoPlayerDialog` para la reproducción de contenido.

### `LessonCard` (`src/features/lessons/pages/components/LessonCard.tsx`)
Tarjeta de presentación de cada lección.
* Implementa efectos de **hover** para mejorar la UX (zoom en imagen, botón de reproducción).
* Diseño responsivo y accesible.

### `VideoPlayerDialog` (`src/features/lessons/pages/components/VideoPlayerDialog.tsx`)
Modal que encapsula el reproductor de video. Se encarga de aislar la experiencia de visualización del resto de la interfaz.

---

## Hooks

| Hook | Descripción |
| :--- | :--- |
| **`useLessonsPage`** | `src/features/lessons/pages/hooks/useLessonsPage.ts` <br> Separa la lógica de vista de la UI. Se encarga de llamar al repositorio al montar el componente y gestionar el estado de la lección seleccionada. |

---

## Estructura de Archivos

```text
src/features/lessons/
├── pages/
│   ├── components/      # UI específica (Cards, Dialogs)
│   │   ├── LessonCard.tsx
│   │   └── VideoPlayerDialog.tsx
│   ├── hooks/           # Lógica de estado y efectos
│   │   └── useLessonsPage.ts
│   ├── pages/           # Punto de entrada de la ruta
│   │   └── LessonsPage.tsx
│   ├── api/             # (Opcional) Clientes específicos si no están en infra global
│   └── i18n/            # Textos de la interfaz (títulos, botones)