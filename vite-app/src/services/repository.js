import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const repositoryApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "repository",
  tagTypes: [],
  endpoints: (builder) => ({
    getLisRepo: builder.mutation({
      query: () => ({
        method: "GET",
        url: "repos",
      }),
    }),
    getRepository: builder.query({
      query: ({ org, repo }) => ({
        url: `repos/${org}/${repo}`,
      }),
    }),
    getCommits: builder.query({
      query: ({ org, repo, path }) => ({
        url: `repos/${org}/${repo}/commits`,
        params: {
          ...(path && { path }),
        },
      }),
    }),
    getFileContents: builder.query({
      query: ({ org, repo, filePath }) => ({
        url: `repos/${org}/${repo}/contents`,
        params: {
          ...(filePath && { filePath }),
        },
      }),
    }),
    createRepo: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "repos",
        body,
      }),
    }),
  }),
});

export const {
  useGetLisRepoMutation,
  useGetRepositoryQuery,
  useGetCommitsQuery,
  useGetFileContentsQuery,
  useLazyGetSingleCommitQuery,
  useCreateRepoMutation,
} = repositoryApi;
