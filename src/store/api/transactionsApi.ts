import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithLogout } from "./baseQuery";

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
  baseQuery: baseQueryWithLogout,
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
