import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithLogout } from "./baseQuery";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserInfo {
  uuid: string;
  phone_number: string;
}

export interface LoginResponse {
  two_fa_required: boolean;
  access: string;
  refresh: string;
  user: UserInfo;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    adminLogin: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/account/auth/admin/token",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAdminLoginMutation } = authApi;
