# CAVAX-PANEL (Exchange Panel) - Architecture & Guidelines

## 📌 Project Overview

CAVAX-PANEL is a modern administrative dashboard built for exchange management.

- **Framework**: React 19 + Vite 8 + TypeScript
- **UI & Styling**: Material UI v9 (RTL support enabled via `stylis-plugin-rtl` and Emotion)
- **State Management**: Redux Toolkit 2.x + RTK Query + Redux Persist
- **Routing**: React Router v7 with Lazy Loading & Suspense
- **Form Handling & Validation**: React Hook Form + Zod v4

---

## 🌳 Directory Structure (`src/`)

- **`src/assets/`**: Static visual assets, icons, logos, and images.
- **`src/components/`**: Modular, reusable React UI components.
  - `common/`: Shared cross-module components (`AuthGuard`, `DataTable`, `CustomDialog`, `DeleteConfirmDialog`, `FormTextField`, `FormSelectField`).
  - `layouts/`: Layout structure components (`DashboardLayout`, `Header`, `Sidebar`, `Breadcrumbs`, `UserMenu`).
  - `users/`: User management module components (`UserFormDialog`, `UsersTable`, `UsersHeaderControls`, `UserStatusChip`).
  - `sample/`: Sample/template components (`SampleFormDialog`, `SampleHeaderControls`, `SampleTable`).
- **`src/pages/`**: Top-level page views rendered by router (`LoginPage.tsx`, `UsersPage.tsx`, `SamplePage.tsx`).
- **`src/providers/`**: Context and theme providers.
  - `MaterialUIProvider.tsx`: MUI v9 RTL theme setup, typography, and palette overrides.
  - `ReduxProvider.tsx`: Redux store wrapper with PersistGate.
- **`src/schemas/`**: Zod validation schemas (`authSchemas.ts`, `userSchemas.ts`, `sampleSchemas.ts`).
- **`src/store/`**: Redux state management and RTK Query services.
  - `actions/`: Redux action creators (`authActions.ts`, `headerActions.ts`, `themeActions.ts`, `usersUiActions.ts`).
  - `reducers/`: Redux reducers (`authReducer.ts`, `headerReducer.ts`, `themeReducer.ts`, `usersUiReducer.ts`).
  - `selectors/`: Reselect selectors (`authSelectors.ts`, `headerSelectors.ts`, `themeSelectors.ts`, `usersUiSelectors.ts`).
  - `api/`: RTK Query API slices (`apiSlice.ts`, `authApi.ts`, `usersApi.ts`, `sampleApi.ts`).
  - `types.ts`: Action types and TypeScript state interfaces.
  - `index.ts`: Redux store configuration and persistence.
- **`src/types/`**: Project-wide TypeScript interfaces.
- **`src/App.tsx`**: Route definitions, route guards (`ProtectedRoute`, `PublicOnlyRoute`), and suspense fallback.
- **`src/main.tsx`**: App entry point.

---

## ⚠️ Important Conventions & Technical Rules

1. **Path Aliases**:
   - Use `@/` prefix for imports from `src/` (e.g. `@/components/common/DataTable`, `@/store/api/authApi`).

2. **RTL & Typography**:
   - All layouts must respect RTL direction. Material UI components are configured with cache and stylis plugins in `MaterialUIProvider.tsx`.

3. **Routing & Authentication**:
   - Unauthenticated routes must be wrapped with `<PublicOnlyRoute />`.
   - Protected routes must be wrapped with `<ProtectedRoute />` inside `<DashboardLayout />`.

4. **State & API Management**:
   - Server data fetching must prefer RTK Query (`src/store/api/`).
   - Local UI state (dialog visibility, header state, active theme) is managed via Redux slices/actions in `src/store/`.

5. **Form Validation**:
   - Define validation schemas using Zod in `src/schemas/` and integrate with `react-hook-form`.
