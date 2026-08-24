import { SET_CREDENTIALS, LOGOUT } from "@/store/types";
import type { UserInfo } from "@/store/api/authApi";

export interface SetCredentialsPayload {
  user: UserInfo;
  access: string;
  refresh: string;
}

export interface SetCredentialsAction {
  type: typeof SET_CREDENTIALS;
  payload: SetCredentialsPayload;
  [key: string]: unknown;
}

export interface LogoutAction {
  type: typeof LOGOUT;
  [key: string]: unknown;
}

export type AuthAction = SetCredentialsAction | LogoutAction;

export const setCredentials = (payload: SetCredentialsPayload): SetCredentialsAction => ({
  type: SET_CREDENTIALS,
  payload,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});
