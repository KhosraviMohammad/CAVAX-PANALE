import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  baseQuery: fetchBaseQuery({
    baseUrl: "http://65.109.184.38:8080",
  }),
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
