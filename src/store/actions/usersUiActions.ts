import { OPEN_USER_FORM, CLOSE_USER_FORM } from "@/store/types";

export interface OpenUserFormAction {
  type: typeof OPEN_USER_FORM;
}

export interface CloseUserFormAction {
  type: typeof CLOSE_USER_FORM;
}

export type UsersUiAction = OpenUserFormAction | CloseUserFormAction;

export const openUserForm = (): OpenUserFormAction => ({
  type: OPEN_USER_FORM,
});

export const closeUserForm = (): CloseUserFormAction => ({
  type: CLOSE_USER_FORM,
});
