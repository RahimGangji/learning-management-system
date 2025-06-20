import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/auth",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        signup: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "GET",
                credentials: "include",
            }),
        }),
        getProfile: builder.query({
            query: () => ({
                url: "/profile",
                method: "GET",
                credentials: "include",
            }),
        }),
        editProfile: builder.mutation({
            query: (data) => ({
                url: "/updateProfile",
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useEditProfileMutation,
} = authApi;
