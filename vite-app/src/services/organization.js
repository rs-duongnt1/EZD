import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const organizationApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'organization',
  tagTypes: [],
  endpoints: (builder) => ({
    getListOrganizations: builder.query({
      query: () => ({
        url: 'orgs',
      }),
    }),
  }),
});

export const { useGetListOrganizationsQuery } = organizationApi;
