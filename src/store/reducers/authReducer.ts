import { SET_CREDENTIALS, LOGOUT } from "@/store/types";
import type { AuthAction } from "@/store/actions/authActions";
import type { UserInfo } from "@/store/api/authApi";

export interface AuthState {
  user: UserInfo | null;
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
}

export const AUTH_INITIAL_STATE: AuthState = {
  user: null,
  access: null,
  refresh: null,
  isAuthenticated: false,
};

export const authReducer = (state = AUTH_INITIAL_STATE, action: AuthAction): AuthState => {
  switch (action.type) {
    case SET_CREDENTIALS:
      return {
        ...state,
        user: action.payload.user,
        access: action.payload.access,
        refresh: action.payload.refresh,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        access: null,
        refresh: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
