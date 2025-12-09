# Módulo de Perfil (Profile)

Gestiona la información personal del usuario, su avatar y la configuración de la cuenta.

## Casos de Uso Implementados

### 1. Editar Cuenta (`UpdateProfile`)
* **Descripción**: Permite al usuario actualizar su biografía y foto de perfil.
* **Flujo**:
    1. `EditProfileDialog` permite selección de archivo y edición de texto.
    2. **Validación**:
        * Avatar: Máx 2MB, solo imágenes (JPG, PNG).
    3. `UpdateProfileUseCase`: Envía los datos al repositorio.
    4. **UX**: Muestra `toast` de éxito y recarga la página suavemente para actualizar el avatar en toda la app (Header, Sidebar).

### 2. Eliminar Cuenta (`DeleteAccount`)
* **Descripción**: Eliminación permanente de la cuenta y sus datos.
* **Flujo**:
    1. `DeleteAccountDialog` solicita confirmación explícita.
    2. Ejecuta `DeleteAccountUseCase` y fuerza un `Logout`.

---

## Arquitectura

* **Repositorio**: `ProfileApiRepository.ts`
    * Gestiona la conversión de DTOs a Entidades de Dominio.
    * Maneja errores silenciosos (retorna `null` en 404) para no romper listas de usuarios.

## Hooks

| Hook | Responsabilidad |
| :--- | :--- |
| **`useProfilePage`** | Centraliza las acciones de actualización y borrado, manejando estados de carga (`isSaving`, `isDeleting`). |

## Componentes Clave

* **`EditProfileDialog`**: Formulario con validación de archivos en el cliente.
* **`ProfilePage`**: Vista principal que orquesta la visualización y edición.