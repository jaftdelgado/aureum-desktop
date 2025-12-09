# Módulo de Equipos (Teams)

Este módulo permite a los usuarios gestionar sus espacios de trabajo académicos. Su comportamiento varía según el rol del usuario (Profesor vs Estudiante).

## Casos de Uso Implementados

### 1. Ver Cursos (`GetProfessorTeams` / `GetStudentTeams`)
* **Descripción**: Recupera y muestra la lista de cursos asociados al usuario.
* **Lógica**:
    * Usa `useTeamsList` con **React Query** (Caché de 5 min).
    * Diferencia la estrategia de recuperación (`Professor` vs `Student`) mediante Inyección de Dependencias en el repositorio.
* **Componentes**: `TeamsPage`, `TeamCard`.

### 2. Crear Curso (`CreateTeam`) - *Solo Profesor*
* **Descripción**: Permite a un profesor crear un nuevo espacio de trabajo.
* **Flujo**:
    1. `CreateTeamDialog` captura Nombre, Descripción e Imagen.
    2. **Validación**: Campos obligatorios y tamaño de imagen (< 5MB).
    3. `CreateTeamUseCase`:
        * **Optimización**: Comprime la imagen en el cliente (Canvas API) antes de subirla.
        * Llama al repositorio enviando `FormData`.
    4. **Feedback**: Muestra notificación `toast` de éxito.

### 3. Unirse a Curso (`JoinTeam`) - *Solo Estudiante*
* **Descripción**: Permite a un estudiante inscribirse mediante un código de acceso.
* **Flujo**:
    1. `JoinTeamModal` captura el código alfanumérico.
    2. `JoinTeamUseCase` valida y envía la solicitud.
    3. **Manejo de Errores**: Detecta códigos inválidos (404) o duplicados (409) y muestra `toast` específico.

---

## Arquitectura

* **Capa de Dominio**: `src/domain/use-cases/teams/`
* **Capa de Infraestructura**: `src/infra/api/teams/TeamsApiRepository.ts`
    * Implementa `createTeam` con soporte para subida de archivos.
    * Implementa estrategias de lectura separadas para eficiencia.

## Hooks

| Hook | Responsabilidad |
| :--- | :--- |
| **`useTeamsPage`** | Orquestador principal de la UI. Maneja los modales (Crear/Unirse) y la lógica de interacción. |
| **`useTeamsList`** | Hook dedicado a la consulta de datos (Query) con configuración de caché (`staleTime`). |

## Componentes Clave

* **`CreateTeamDialog`**: Formulario con previsualización de imagen y validaciones estrictas.
* **`JoinTeamModal`**: Modal minimalista para ingreso de código.
* **`TeamCard`**: Componente de presentación con soporte para imágenes optimizadas y estados de carga (Skeleton).