# Módulo de Autenticación (Auth)

Este módulo gestiona la identificación de usuarios, el ciclo de vida de la sesión y la seguridad de acceso a la aplicación.

## Arquitectura

El módulo sigue estrictamente **Clean Architecture**:

1.  **Capa de Presentación (Feature)**:
    * Ubicación: `src/features/auth`
    * Responsabilidad: UI, formularios y gestión de estado local.
    * Componentes clave: `LoginForm`, `SignUpForm`, `GoogleSignIn`.
2.  **Capa de Dominio (Domain)**:
    * Ubicación: `src/domain/use-cases/auth`
    * Responsabilidad: Lógica de negocio pura (Login, Registro, Logout, Verificar Sesión).
    * Casos de Uso: `LoginUseCase`, `RegisterUseCase`, `CheckSessionAliveUseCase`, etc.
3.  **Capa de Infraestructura (Infra)**:
    * Ubicación: `src/infra/external/auth`
    * Responsabilidad: Comunicación con Supabase y persistencia.
    * Repositorio: `AuthApiRepository` (Implementa `AuthRepository`).

---

## Componentes Clave

### `AuthProvider` (`src/app/context/AuthProvider.tsx`)
El corazón de la seguridad. Envuelve la aplicación y gestiona:
* **Estado global del usuario**: `user` | `null`.
* **Manejo de Desconexión**:
    * Cierra sesión automáticamente si se pierde la conexión a internet (`offline` event).
    * Cierra sesión si el servidor devuelve errores 5xx (`server-disconnect` event).
* **Persistencia de Errores**: Guarda la razón del cierre de sesión (ej: "NETWORK_ERROR") en `sessionStorage` para mostrarla en el Login.

### `AuthPage` (`src/features/auth/pages/AuthPage.tsx`)
Página principal que alterna entre **Login** y **Registro** según el estado local.
* *Nota*: Se importa de forma estática (Eager Loading) en el Router para garantizar que funcione offline.

---

## Hooks Principales

| Hook | Descripción |
| :--- | :--- |
| **`useLoginForm`** | Gestiona el formulario de inicio de sesión, validación con **Zod** y manejo de errores de red/servidor. |
| **`useSignUpForm`** | Controla el flujo de registro multi-paso (Datos -> Contraseña) y validación de seguridad de contraseña. |
| **`useOAuthLogin`** | Encapsula la lógica de inicio de sesión con Google. |
| **`useAuth`** | Expone el contexto de autenticación (`user`, `login`, `logout`) al resto de la app. |

---

## Manejo de Errores y Feedback

* **Validación**: Se utiliza `zod` con `react-hook-form`. Los esquemas están en `src/features/auth/schemas/`.
* **Feedback Visual**: Se utiliza **Sonner** (`toast`) para notificaciones de éxito/error.
* **Internacionalización**: Todos los textos de error (incluyendo validaciones de Zod) usan claves de traducción (`t("auth:...")`).

---

## Flujos Críticos

### 1. Inicio de Sesión (Email/Pass)
`LoginForm` -> `useLoginForm` -> `LoginUseCase` -> `AuthApiRepository` -> `Supabase`.

### 2. Inicio de Sesión (Google)
`GoogleSignIn` -> `useOAuthLogin` -> `Supabase OAuth` -> Redirección -> `GetSessionUseCase` -> Verificación de Perfil.
* *Si el perfil no existe*: Redirige a completar datos.
* *Si existe*: Recarga la aplicación.

### 3. Cierre de Sesión Seguro (Logout)
1.  Se dispara por acción del usuario o evento del sistema (Offline/Server Error).
2.  `LogoutUseCase` limpia la sesión en Supabase.
3.  **Rollback Local**: Si falla la API, `AuthApiRepository` fuerza la limpieza de `localStorage`/`sessionStorage` para no dejar al usuario atrapado.

---

## Estructura de Archivos

```text
src/features/auth/
├── components/      # UI (LoginForm, GoogleSignIn, etc.)
├── hooks/           # Lógica de vista (useLoginForm...)
├── pages/           # Páginas (AuthPage)
├── schemas/         # Validaciones Zod (loginSchema, signUpSchema)
├── i18n/            # Traducciones (es.json, en.json)
└── resources/       # Assets (Imágenes, SVGs)