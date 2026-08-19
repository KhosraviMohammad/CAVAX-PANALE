import type { RootState } from "@/store/types";

export const selectAuthState = (state: RootState) => state.auth;

export const selectCurrentUser = (state: RootState) => state.auth?.user || null;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth?.isAuthenticated && state.auth?.access);

export const selectAccessToken = (state: RootState) => state.auth?.access || null;

export const selectRefreshToken = (state: RootState) => state.auth?.refresh || null;
