import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const repositoryApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "repository",
  tagTypes: [],
  endpoints: (builder) => ({
    getRepository: builder.query({
      query: ({ org, repo }) => ({
        url: `repos/${org}/${repo}`,
      }),
    }),
    getCommits: builder.query({
      query: ({ org, repo }) => ({
        url: `repos/${org}/${repo}/commits`,
      }),
    }),
    getFileContents: builder.query({
      query: ({ org, repo }) => ({
        url: `repos/${org}/${repo}/contents`,
      }),
    }),
    getContentsByFilePath: builder.query({
      query: ({ org, repo, filePath }) => ({
        url: `repos/${org}/${repo}/contents/${filePath}`,
      }),
    }),
  }),
});

export const {
  useGetRepositoryQuery,
  useGetCommitsQuery,
  useGetFileContentsQuery,
  useGetContentsByFilePathQuery,
} = repositoryApi;
