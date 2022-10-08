import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const repoApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'repos',
  tagTypes: [],
  endpoints: (builder) => ({
    getLisRepo: builder.mutation({
      query: () => ({
        method: 'GET',
        url: 'repos',
      }),
    }),
  }),
});

export const { useGetLisRepoMutation } = repoApi;
