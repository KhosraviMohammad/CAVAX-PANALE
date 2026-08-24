import { OPEN_USER_FORM, OPEN_EDIT_USER_FORM, CLOSE_USER_FORM } from "@/store/types";

export interface OpenUserFormAction {
  type: typeof OPEN_USER_FORM;
  [key: string]: unknown;
}

export interface OpenEditUserFormAction {
  type: typeof OPEN_EDIT_USER_FORM;
  payload: string;
  [key: string]: unknown;
}

export interface CloseUserFormAction {
  type: typeof CLOSE_USER_FORM;
  [key: string]: unknown;
}

export type UsersUiAction = OpenUserFormAction | OpenEditUserFormAction | CloseUserFormAction;

export const openUserForm = (): OpenUserFormAction => ({
  type: OPEN_USER_FORM,
});

export const openEditUserForm = (uuid: string): OpenEditUserFormAction => ({
  type: OPEN_EDIT_USER_FORM,
  payload: uuid,
});

export const closeUserForm = (): CloseUserFormAction => ({
  type: CLOSE_USER_FORM,
});
