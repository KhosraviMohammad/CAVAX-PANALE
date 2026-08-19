import { OPEN_USER_FORM, OPEN_EDIT_USER_FORM, CLOSE_USER_FORM } from "@/store/types";
import type { UsersUiAction } from "@/store/actions/usersUiActions";

export interface UsersUiState {
  isUserFormOpen: boolean;
  editingUserUuid: string | null;
}

export const USERS_UI_INITIAL_STATE: UsersUiState = {
  isUserFormOpen: false,
  editingUserUuid: null,
};

export const usersUiReducer = (
  state = USERS_UI_INITIAL_STATE,
  action: UsersUiAction,
): UsersUiState => {
  switch (action.type) {
    case OPEN_USER_FORM:
      return { ...state, isUserFormOpen: true, editingUserUuid: null };
    case OPEN_EDIT_USER_FORM:
      return { ...state, isUserFormOpen: true, editingUserUuid: action.payload };
    case CLOSE_USER_FORM:
      return { ...state, isUserFormOpen: false, editingUserUuid: null };
    default:
      return state;
  }
};
