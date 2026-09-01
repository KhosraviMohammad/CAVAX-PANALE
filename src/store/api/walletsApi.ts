import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithLogout } from "./baseQuery";

export interface WalletUser {
  uuid: string;
  username: string;
  phone_number: string;
  is_active: boolean;
}

export interface Wallet {
  uuid: string;
  user: WalletUser;
  asset: string;
  available_balance: string;
  blocked_balance: string;
  total_balance: string;
  is_frozen: boolean;
  created_at: string;
  updated_at: string;
}

export interface WalletsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Wallet[];
  num_pages: number;
  page: number;
  page_size: number;
}

export interface GetWalletsParams {
  page?: number;
  page_size?: number;
  search?: string;
  user?: string;
  asset?: string;
  min_balance?: string | number;
  max_balance?: string | number;
  is_frozen?: boolean | string;
}

export interface FreezeWalletInput {
  uuid: string;
  reason: string;
}

export interface UnfreezeWalletInput {
  uuid: string;
  reason?: string;
}

export const walletsApi = createApi({
  reducerPath: "walletsApi",
  baseQuery: baseQueryWithLogout,
  tagTypes: ["Wallets"],
  endpoints: (builder) => ({
    getWallets: builder.query<WalletsResponse, GetWalletsParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.page_size) queryParams.append("page_size", String(params.page_size));
        if (params?.search) queryParams.append("search", params.search);
        if (params?.user) queryParams.append("user", params.user);
        if (params?.asset) queryParams.append("asset", params.asset);
        if (params?.min_balance !== undefined && params?.min_balance !== "") {
          queryParams.append("min_balance", String(params.min_balance));
        }
        if (params?.max_balance !== undefined && params?.max_balance !== "") {
          queryParams.append("max_balance", String(params.max_balance));
        }
        if (
          params?.is_frozen !== undefined &&
          params?.is_frozen !== "" &&
          params?.is_frozen !== "all"
        ) {
          queryParams.append("is_frozen", String(params.is_frozen));
        }

        const queryString = queryParams.toString();
        return `/ledger/admin/wallets/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Wallets"],
    }),
    freezeWallet: builder.mutation<Wallet, FreezeWalletInput>({
      query: ({ uuid, reason }) => ({
        url: `/ledger/admin/wallets/${uuid}/freeze/`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["Wallets"],
    }),
    unfreezeWallet: builder.mutation<Wallet, UnfreezeWalletInput>({
      query: ({ uuid, reason }) => ({
        url: `/ledger/admin/wallets/${uuid}/unfreeze/`,
        method: "POST",
        body: { reason: reason || "" },
      }),
      invalidatesTags: ["Wallets"],
    }),
  }),
});

export const { useGetWalletsQuery, useFreezeWalletMutation, useUnfreezeWalletMutation } =
  walletsApi;
