import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SampleCategory {
  id: number;
  name: string;
  code: string;
  description?: string | null;
  created_at: string;
}

export interface Sample {
  id: number;
  category_id: number;
  category_name: string;
  name: string;
  code: string;
  sample_type: string;
  unit?: string | null;
  value: number;
  is_active: boolean;
}

export interface CreateSampleInput {
  category_id: number;
  name: string;
  code: string;
  sample_type?: string;
  unit?: string;
  value?: number;
  is_active?: boolean;
}

export const sampleApi = createApi({
  reducerPath: "sampleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/samples",
  }),
  tagTypes: ["Categories", "Samples"],
  endpoints: (builder) => ({
    getCategories: builder.query<SampleCategory[], void>({
      query: () => "/categories",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Categories" as const, id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
    getSamples: builder.query<Sample[], { category_id?: number } | void>({
      query: (params) => {
        if (params && params.category_id) {
          return `/samples?category_id=${params.category_id}`;
        }
        return "/samples";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Samples" as const, id })),
              { type: "Samples", id: "LIST" },
            ]
          : [{ type: "Samples", id: "LIST" }],
    }),
    createSample: builder.mutation<Sample, CreateSampleInput>({
      query: (body) => ({
        url: "/samples",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Samples", id: "LIST" },
        { type: "Categories", id: "LIST" },
      ],
    }),
    updateSampleValue: builder.mutation<Sample, { id: number; value: number }>({
      query: ({ id, value }) => ({
        url: `/samples/${id}/value`,
        method: "PATCH",
        body: { value },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Samples", id },
        { type: "Samples", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSamplesQuery,
  useCreateSampleMutation,
  useUpdateSampleValueMutation,
} = sampleApi;
