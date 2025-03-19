import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coursesApi = createApi({
    reducerPath: "coursesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/courses",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: ({ page = 1, limit = 5, search }) => ({
                url: "/admin",
                params: { page, limit, ...(search && { search }) },
            }),
        }),
        getPublishedCourses: builder.query({
            query: ({ page, limit, search, sortField, sortDirection }) => ({
                url: "/published",
                method: "GET",
                params: { page, limit, search, sortDirection, sortField },
            }),
        }),
        getPublishedCourse: builder.query({
            query: (courseId) => ({
                url: `/published/${courseId}`,
                method: "GET",
            }),
        }),
        updateCourse: builder.mutation({
            query: (courseData) => ({
                url: `/editcourse/${courseData.get("id")}`,
                method: "PATCH",
                body: courseData,
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
    useGetPublishedCourseQuery,
    useCreateCourseMutation,
    useDeleteCourseMutation,
    useUpdateCourseMutation,
    useGetPublishedCoursesQuery,
} = coursesApi;
