import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import Pagination from "./Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    useDeleteCourseMutation,
    useGetAllCoursesQuery,
} from "../redux/api/courseApi";
import toast from "react-hot-toast";
import EditModal from "./EditModal";
import { Tooltip } from "react-tooltip";

const CourseTable = ({
    courses: initialCourses,
    isLoading: initialLoading,
    isFetching: initialFetching,
    isError: initialError,
    error: initialErrorData,
    currentPage: initialPage,
    totalPages: initialTotalPages,
    handlePageChange,
    limit: initialLimit,
    refetchCourses,
}) => {
    const navigate = useNavigate();
    const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
    const [allCourses, setAllCourses] = useState(initialCourses);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [query, setQuery] = useState("");
    const [submittedSearch, setSubmittedSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || initialPage || 1;
    const limit = Number(searchParams.get("limit")) || initialLimit || 10;
    const search = searchParams.get("search") || "";

    // Only include search parameter if submittedSearch exists
    const queryParams = {
        page,
        limit,
        ...(submittedSearch.trim() && { search: submittedSearch.trim() }),
    };

    const { data, isLoading, isFetching, isError, error } =
        useGetAllCoursesQuery(queryParams);

    useEffect(() => {
        if (data?.data?.courses) {
            setAllCourses(data.data.courses);
        } else {
            setAllCourses(initialCourses);
        }
        // Set initial query and submittedSearch from URL on mount
        setQuery(search);
        setSubmittedSearch(search);
    }, [data, initialCourses, search]);

    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
        setSelectedCourse(null);
    };

    const handleSearch = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (!newQuery.trim()) {
            setSearchParams({
                page: "1",
                limit: limit.toString(),
            });
            setSubmittedSearch(""); // Clear submitted search when input is empty
        }
    };

    const handleSubmit = () => {
        if (!query.trim()) {
            setSearchParams({
                page: "1",
                limit: limit.toString(),
            });
            setSubmittedSearch("");
            return;
        }

        setSubmittedSearch(query.trim()); // Update submitted search term
        setSearchParams({
            page: "1",
            limit: limit.toString(),
            search: query.trim(),
        });
    };

    const handleDeleteClick = async (course) => {
        try {
            const response = await deleteCourse(course._id).unwrap();
            toast.success(response.message);
            refetchCourses();
        } catch (err) {
            toast.error(err?.data?.message || "Something Went Wrong");
        }
    };

    const totalPages = data?.pagination
        ? data.pagination.totalPages
        : initialTotalPages;

    return (
        <div className="relative">
            {isEditModalOpen && (
                <EditModal
                    course={selectedCourse}
                    closeModal={closeModal}
                    refetchCourses={refetchCourses}
                />
            )}
            <div className="">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-4 text-[#6d28d2]">
                        Manage Courses
                    </h1>
                    <div className="flex flex-wrap items-center justify-end gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg w-full max-w-md bg-white shadow-sm">
                            <div className="flex items-center px-4">
                                <FaSearch className="text-gray-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={handleSearch}
                                className="w-full px-2 py-2 outline-none bg-transparent text-gray-900"
                            />
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 rounded-r-lg font-medium text-sm transition-colors duration-200 bg-[#6d28d2] text-white hover:bg-[#4b1e9e]"
                            >
                                Search
                            </button>
                        </div>

                        <button
                            onClick={() => navigate("/course/new")}
                            className="px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 bg-[#6d28d2] text-white hover:bg-[#4b1e9e]"
                        >
                            Create Course
                        </button>
                    </div>
                </div>

                {isLoading || isFetching ? (
                    <div className="h-44 flex items-end justify-center bg-gray-50">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : isError ? (
                    <div className="min-h-screen bg-gray-50 ">
                        <div className="text-center text-red-600">
                            {error?.data?.message || "Error fetching courses"}
                        </div>
                    </div>
                ) : initialCourses.length === 0 ? (
                    <div className="flex justify-center items-center h-96 text-center font-bold text-[#ff051e]">
                        No courses available.
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg my-4">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-[#6d28d2]">
                                        <th className="px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider">
                                            S.No.
                                        </th>
                                        <th className="px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider">
                                            Course Name
                                        </th>
                                        <th className="px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider">
                                            Published
                                        </th>
                                        <th className="px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {allCourses.map((course, index) => (
                                        <tr key={course._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                                {index + 1 + limit * (page - 1)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center font-medium text-ellipsis">
                                                {course.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                                {course.isPublished ? (
                                                    <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                                        Unpublished
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center italic">
                                                ${course.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                                <button
                                                    className="text-[#6d28d2] mr-4 hover:text-[#4b1e9e]"
                                                    onClick={() =>
                                                        handleEditClick(course)
                                                    }
                                                    data-tooltip-id="edit-tooltip"
                                                    data-tooltip-content="Click to edit course!"
                                                >
                                                    <FaEdit className="inline-block w-4 h-4" />
                                                </button>
                                                <Tooltip
                                                    id="edit-tooltip"
                                                    className="!bg-purple-600 !text-white !p-2 !rounded-lg"
                                                />
                                                <button
                                                    className="text-red-600 mr-4 hover:text-red-800"
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            course
                                                        )
                                                    }
                                                    disabled={isDeleting}
                                                    data-tooltip-id="delete-tooltip"
                                                    data-tooltip-content="Click to delete course!"
                                                >
                                                    <FaTrash className="inline-block w-4 h-4" />
                                                </button>
                                                <Tooltip
                                                    id="delete-tooltip"
                                                    className="!bg-purple-600 !text-white !p-2 !rounded-lg"
                                                />
                                                <button
                                                    className="text-[#0cad22] hover:text-[#087d18]"
                                                    data-tooltip-id="add-tooltip"
                                                    data-tooltip-content="Click to add course!"
                                                >
                                                    <IoIosAddCircleOutline className="inline-block w-5 h-5" />
                                                </button>
                                                <Tooltip
                                                    id="add-tooltip"
                                                    className="!bg-purple-600 !text-white !p-2 !rounded-lg"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            handlePageChange={(newPage) =>
                                setSearchParams({
                                    page: newPage.toString(),
                                    limit: limit.toString(),
                                    ...(submittedSearch.trim() && {
                                        search: submittedSearch.trim(),
                                    }),
                                })
                            }
                        />
                    </>
                )}
            </div>

            {isDeleting && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <span className="loading loading-spinner loading-xl text-white"></span>
                </div>
            )}
        </div>
    );
};

export default CourseTable;
