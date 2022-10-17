import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const deploymentApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'deployment',
  tagTypes: [],
  endpoints: (builder) => ({
    getListDeployments: builder.query({
      query: ({ org, repo }) => ({
        url: 'deployments',
        params: {
          org,
          repo,
        },
      }),
    }),
  }),
});

export const { useGetListDeploymentsQuery } = deploymentApi;
