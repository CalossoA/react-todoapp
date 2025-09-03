import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const listsApi = createApi({
  reducerPath: 'listsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['List'],
  endpoints: (builder) => ({
    getLists: builder.query({
      query: () => '/lists',
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'List', id })),
        { type: 'List', id: 'LIST' },
      ],
    }),
    addList: builder.mutation({
      query: (newList) => ({
        url: '/lists',
        method: 'POST',
        body: newList,
      }),
      invalidatesTags: [{ type: 'List', id: 'LIST' }],
    }),
    updateList: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/lists/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'List', id }, { type: 'List', id: 'LIST' }],
    }),
    deleteList: builder.mutation({
      query: (id) => ({
        url: `/lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'List', id }],
    }),
  }),
});

export const {
  useGetListsQuery,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} = listsApi;
