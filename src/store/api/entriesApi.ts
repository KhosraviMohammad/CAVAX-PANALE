import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithLogout } from "./baseQuery";

export interface LedgerEntry {
  uuid: string;
  wallet_uuid: string;
  user: string;
  user_uuid: string;
  asset: string;
  direction: "debit" | "credit" | string;
  bucket: "available" | "blocked" | string;
  amount: string;
  balance_after: string;
  reference_id: string;
  transaction_type: string;
  created_at: string;
}

export interface EntriesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: LedgerEntry[];
  num_pages: number;
  page: number;
  page_size: number;
}

export interface GetEntriesParams {
  page?: number;
  page_size?: number;
  search?: string;
  direction?: string;
  min_amount?: string | number;
}

export const entriesApi = createApi({
  reducerPath: "entriesApi",
  baseQuery: baseQueryWithLogout,
  tagTypes: ["Entries"],
  endpoints: (builder) => ({
    getEntries: builder.query<EntriesResponse, GetEntriesParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.page_size) queryParams.append("page_size", String(params.page_size));
        if (params?.search) queryParams.append("search", params.search);
        if (params?.direction) queryParams.append("direction", params.direction);
        if (params?.min_amount) queryParams.append("min_amount", String(params.min_amount));

        const queryString = queryParams.toString();
        return `/ledger/admin/entries/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Entries"],
    }),
  }),
});

export const { useGetEntriesQuery } = entriesApi;
