import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../types";

export interface User {
  uuid: string;
  username: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  national_code: string;
  is_active: boolean;
  is_admin: boolean;
  verified: boolean;
  two_fa_enabled: boolean;
  last_login: string | null;
  created_at: string;
}

export interface UsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
  num_pages: number;
  page: number;
  page_size: number;
}

export interface GetUsersParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://65.109.184.38:8080",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.access;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, GetUsersParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.page_size) queryParams.append("page_size", String(params.page_size));
        if (params?.search) queryParams.append("search", params.search);

        const queryString = queryParams.toString();
        return `/account/admin/users/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
