import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DomainDataType } from "../types";

export const domainApi = createApi({
  reducerPath: "domainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DOMAIN_BASE_URL,
  }),
  tagTypes: ["domain"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getDomains: builder.query<DomainDataType[], void>({
      query: () => "domain",
      providesTags: ["domain"],
    }),
    addDomain: builder.mutation<DomainDataType, DomainDataType>({
      query: (newDomain) => ({
        url: "domain",
        method: "POST",
        body: newDomain,
      }),
      invalidatesTags: ["domain"],
    }),
    deleteDomain: builder.mutation<DomainDataType, string>({
      query: (id) => ({
        url: `domain/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["domain"],
    }),
    updateDomain: builder.mutation<DomainDataType, Partial<DomainDataType>>({
      query: ({ id, ...newData }) => ({
        url: `domain/${id}`,
        method: "PUT",
        body: newData,
      }),
      invalidatesTags: ["domain"],
    }),
  }),
});

export const {
  useGetDomainsQuery,
  useAddDomainMutation,
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} = domainApi;
