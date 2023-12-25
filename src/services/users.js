import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userServices = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  tagTypes: ["UsersData"],

  endpoints: (builder) => ({
    // get users
    getUsers: builder.query({
      query: () => "users",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "UsersData", id })),
              { type: "UsersData", id: "LIST" },
            ]
          : [{ type: "UsersData", id: "LIST" }],
    }),

    //add users
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      providesTags: (result) => result,
      invalidatesTags: [{ type: "UsersData", id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = userServices;
