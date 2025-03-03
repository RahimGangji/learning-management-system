// api/coursesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coursesApi = createApi({
    reducerPath: "coursesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/courses",
        credentials: "include", // Include credentials (cookies, etc.) with requests
    }),
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: ({ page = 1, limit = 5 }) => ({
                url: "/admin",
                params: { page, limit },
            }),
        }),
    }),
});

export const { useGetAllCoursesQuery } = coursesApi;
