import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithLogout } from "./baseQuery";

export interface BankAccount {
  uuid: string;
  bank_name: string;
  account_holder: string;
  card_number: string;
  iban: string;
  account_number: string;
}

export interface DepositRequest {
  uuid: string;
  asset: string;
  bank_account: BankAccount | null;
  tracking_id: string;
  amount: string;
  receipt: string;
  status: string;
  rejection_reason?: string;
  reviewed_at?: string;
  created_at: string;
}

export interface DepositRequestsNormalizedResponse {
  count: number;
  results: DepositRequest[];
  next: string | null;
  previous: string | null;
  num_pages: number;
  page: number;
  page_size: number;
}

export interface GetDepositRequestsParams {
  page?: number;
  page_size?: number;
  search?: string;
  status?: string;
}

export interface RejectDepositInput {
  uuid: string;
  reason: string;
}

export const depositRequestsApi = createApi({
  reducerPath: "depositRequestsApi",
  baseQuery: baseQueryWithLogout,
  tagTypes: ["DepositRequests"],
  endpoints: (builder) => ({
    getDepositRequests: builder.query<
      DepositRequestsNormalizedResponse,
      GetDepositRequestsParams | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.page_size) queryParams.append("page_size", String(params.page_size));
        if (params?.search) queryParams.append("search", params.search);
        if (params?.status) queryParams.append("status", params.status);

        const queryString = queryParams.toString();
        return `/deposit/admin/requests/${queryString ? `?${queryString}` : ""}`;
      },
      transformResponse: (response: unknown): DepositRequestsNormalizedResponse => {
        if (Array.isArray(response)) {
          return {
            count: response.length,
            results: response as DepositRequest[],
            page: 1,
            page_size: response.length,
            num_pages: 1,
            next: null,
            previous: null,
          };
        }
        const res = response as {
          count?: number;
          results?: DepositRequest[];
          page?: number;
          page_size?: number;
          num_pages?: number;
          next?: string | null;
          previous?: string | null;
        };
        return {
          count: res?.count ?? (res?.results?.length || 0),
          results: res?.results || [],
          page: res?.page ?? 1,
          page_size: res?.page_size ?? 20,
          num_pages: res?.num_pages ?? 1,
          next: res?.next ?? null,
          previous: res?.previous ?? null,
        };
      },
      providesTags: ["DepositRequests"],
    }),
    approveDepositRequest: builder.mutation<DepositRequest, string>({
      query: (uuid) => ({
        url: `/deposit/admin/requests/${uuid}/approve/`,
        method: "POST",
      }),
      invalidatesTags: ["DepositRequests"],
    }),
    rejectDepositRequest: builder.mutation<DepositRequest, RejectDepositInput>({
      query: ({ uuid, reason }) => ({
        url: `/deposit/admin/requests/${uuid}/reject/`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["DepositRequests"],
    }),
  }),
});

export const {
  useGetDepositRequestsQuery,
  useApproveDepositRequestMutation,
  useRejectDepositRequestMutation,
} = depositRequestsApi;
