import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type LoginResponse from './auth';
type LoginResponse = {
  token: string;
  userEmaul: string;
  userName: string;
  id: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: ({ email, password }) => ({
          url: "/login",
          method: "POST",
          body: {
            email,
            password,
          },
        }),
      }
    ),
    getAuthData: builder.query<LoginResponse, { token: string }>({
      query: ({ token }) => ({}),
    }),
  }),
});
