import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { RootState } from "../types";
import { logout } from "../actions/authActions";

const baseUrl = (import.meta.env.VITE_API_URL as string) || "http://65.109.184.38:8080";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    const token = (getState() as RootState).auth?.access;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithLogout: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    // Dispatch logout action to reset auth state in Redux
    api.dispatch(logout());

    // Redirect to login page if user is not already on an auth / login page
    if (typeof window !== "undefined") {
      if (
        !window.location.pathname.startsWith("/login") &&
        !window.location.pathname.startsWith("/auth")
      ) {
        window.location.href = "/login";
      }
    }
  }

  return result;
};
