import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coursesApi = createApi({
    reducerPath: "coursesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/courses",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: ({ page = 1, limit = 5 }) => ({
                url: "/admin",
                params: { page, limit },
            }),
        }),
        createCourse: builder.mutation({
            query: (courseData) => ({
                url: "/",
                method: "POST",
                body: courseData,
            }),
        }),
        deleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `/delete/${courseId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Course"],
        }),
    }),
});

export const {
    useGetAllCoursesQuery,
    useCreateCourseMutation,
    useDeleteCourseMutation,
} = coursesApi;
