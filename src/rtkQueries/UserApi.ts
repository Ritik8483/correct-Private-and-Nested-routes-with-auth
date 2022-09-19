import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserType {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes:["getUser"],
  endpoints: (builder) => ({
    getAllUSer: builder.query<UserType[], any>({
      query: (params) =>
        params.searchText
          ? `/posts?&name_like=${params.searchText}&_start=${params.initialEntry}&_end=${params.finalEntry}&_sort=id&_order=${params.orderType}`
          : `/posts?&_start=${params.initialEntry}&_end=${params.finalEntry}&_sort=id&_order=${params.orderType}`,
          providesTags:["getUser"]
    }),

    totalUser: builder.query<any, void>({
      query: () => "/posts",
      providesTags:["getUser"]
    }),
  }),
});

export const { useGetAllUSerQuery, useTotalUserQuery } = UserApi;
