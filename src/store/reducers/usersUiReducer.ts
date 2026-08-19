import { OPEN_USER_FORM, CLOSE_USER_FORM } from "@/store/types";
import type { UsersUiAction } from "@/store/actions/usersUiActions";

export interface UsersUiState {
  isUserFormOpen: boolean;
}

export const USERS_UI_INITIAL_STATE: UsersUiState = {
  isUserFormOpen: false,
};

export const usersUiReducer = (
  state = USERS_UI_INITIAL_STATE,
  action: UsersUiAction,
): UsersUiState => {
  switch (action.type) {
    case OPEN_USER_FORM:
      return { ...state, isUserFormOpen: true };
    case CLOSE_USER_FORM:
      return { ...state, isUserFormOpen: false };
    default:
      return state;
  }
};
