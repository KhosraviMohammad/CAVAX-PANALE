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

export interface UserProfile {
  first_name?: string;
  last_name?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  address?: string;
  picture?: string;
  national_code?: string;
  invitation_code?: string;
  deposit_tracking_id?: string;
}

export interface UserDetails {
  uuid: string;
  username: string;
  phone_number: string;
  is_active: boolean;
  is_admin: boolean;
  is_superuser?: boolean;
  verified: boolean;
  two_fa_enabled?: boolean;
  last_login?: string | null;
  created_at?: string;
  updated_at?: string;
  profile?: UserProfile;
}

export interface CreateUserInput {
  phone_number: string;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  address?: string;
  national_code?: string;
  is_active?: boolean;
  verified?: boolean;
  is_admin?: boolean;
  password?: string;
}

export interface UpdateUserInput {
  uuid: string;
  body: Partial<CreateUserInput>;
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
  tagTypes: ["Users", "UserDetail"],
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
    getUserByUuid: builder.query<UserDetails, string>({
      query: (uuid) => `/account/admin/users/${uuid}/`,
      providesTags: (result, error, uuid) => [{ type: "UserDetail", id: uuid }],
    }),
    createUser: builder.mutation<User, CreateUserInput>({
      query: (body) => ({
        url: "/account/admin/users/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, UpdateUserInput>({
      query: ({ uuid, body }) => ({
        url: `/account/admin/users/${uuid}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { uuid }) => ["Users", { type: "UserDetail", id: uuid }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByUuidQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApi;
