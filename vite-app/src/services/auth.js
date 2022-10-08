import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const authApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'auth',
  tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        method: 'POST',
        url: 'auth/login',
        body: body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
