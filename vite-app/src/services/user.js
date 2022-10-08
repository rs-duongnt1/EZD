import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const userApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'user',
  tagTypes: [],
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (body) => ({
        url: 'user',
        body: body,
      }),
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;
