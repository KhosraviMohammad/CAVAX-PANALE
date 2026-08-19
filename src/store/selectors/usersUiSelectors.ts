import type { RootState } from "@/store/types";

export const selectUsersUiState = (state: RootState) => state.usersUi;

export const selectIsUserFormOpen = (state: RootState) => Boolean(state.usersUi?.isUserFormOpen);

export const selectEditingUserUuid = (state: RootState) => state.usersUi?.editingUserUuid || null;
