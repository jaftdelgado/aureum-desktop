# Configuración de Equipo (Team Settings)

Módulo encargado de la administración profunda de un curso, incluyendo la gestión de sus participantes.

## Casos de Uso Implementados

### 1. Ver Estudiantes (`GetTeamMembers`)
* **Descripción**: Muestra la lista unificada del profesor (Administrador) y los estudiantes inscritos.
* **Lógica**:
    * Usa `useMembersSettings` con **React Query**.
    * **Resiliencia**: El repositorio captura errores individuales al cargar perfiles; si un estudiante falla (404), se omite silenciosamente para no romper la lista completa.
    * **Caché**: Configurado con `staleTime` de 5 minutos para evitar recargas al cambiar de pestañas.

### 2. Eliminar Miembro (`RemoveMember`) - *Solo Profesor*
* **Descripción**: Permite al profesor expulsar a un estudiante del curso.
* **Flujo**:
    1. `DeleteMemberDialog` pide confirmación segura.
    2. Se ejecuta la mutación y se invalida el caché de `team-members` para refrescar la lista automáticamente.
    3. Feedback mediante `toast`.

---

## Arquitectura

La vista se divide mediante un **Layout con Pestañas** (`TeamSettingsLayout`), redirigiendo automáticamente a la sección de Miembros.

## Hooks

| Hook | Responsabilidad |
| :--- | :--- |
| **`useMembersSettings`** | Hook "inteligente" que combina la consulta (Query) de miembros y las acciones (Mutations) de eliminación. |

## Componentes Clave

* **`MemberItem`**: Componente visual que adapta su UI según el rol (Profesor/Estudiante) y maneja traducciones.
* **`DeleteMemberDialog`**: Modal de seguridad para acciones destructivas.