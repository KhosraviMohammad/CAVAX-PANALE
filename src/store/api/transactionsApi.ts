import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../types";

export interface Transaction {
  uuid: string;
  reference_id: string;
  transaction_type: string;
  status: string;
  description: string;
  metadata: string;
  source: string;
  users: string[];
  entry_count: number;
  created_at: string;
}

export interface TransactionsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Transaction[];
  num_pages: number;
  page: number;
  page_size: number;
}

export interface GetTransactionsParams {
  page?: number;
  page_size?: number;
  search?: string;
  transaction_type?: string;
  status?: string;
}

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
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
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionsResponse, GetTransactionsParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.page_size) queryParams.append("page_size", String(params.page_size));
        if (params?.search) queryParams.append("search", params.search);
        if (params?.transaction_type)
          queryParams.append("transaction_type", params.transaction_type);
        if (params?.status) queryParams.append("status", params.status);

        const queryString = queryParams.toString();
        return `/ledger/admin/transactions/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApi;
