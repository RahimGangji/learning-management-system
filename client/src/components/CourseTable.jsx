import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { useDeleteCourseMutation } from "../redux/api/courseApi";
import toast from "react-hot-toast";

const CourseTable = ({
    courses,
    isLoading,
    isFetching,
    isError,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    limit,
    refetchCourses,
}) => {
    const navigate = useNavigate();
    const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

    const handleEditClick = (course) => {
        console.log("Edit clicked for course:", course);
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

    const handleAddClick = (course) => {
        console.log("Add clicked for course:", course);
    };

    return (
        <div className="relative">
            {/* Main content */}
            <div className="">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-4 text-[#6d28d2]">
                        Manage Courses
                    </h1>
                    <button
                        onClick={() => navigate("/course/new")}
                        className={`px-4 rounded-md font-medium text-sm transition-colors duration-200 bg-[#6d28d2] text-white`}
                    >
                        Create Course
                    </button>
                </div>
                {isLoading || isFetching ? (
                    <div className="min-h-screen flex items-center justify-center bg-white">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : isError ? (
                    <div className="min-h-screen bg-white"></div>
                ) : courses.length === 0 ? (
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
                                    {courses.map((course, index) => (
                                        <tr key={course._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                                {index +
                                                    1 +
                                                    limit * (currentPage - 1)}
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
                                                >
                                                    <FaEdit className="inline-block w-4 h-4" />
                                                </button>
                                                <button
                                                    className="text-red-600 mr-4 hover:text-red-800"
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            course
                                                        )
                                                    }
                                                    disabled={isDeleting}
                                                >
                                                    <FaTrash className="inline-block w-4 h-4" />
                                                </button>
                                                <button
                                                    className="text-[#0cad22] hover:text-[#087d18]"
                                                    onClick={() =>
                                                        handleAddClick(course)
                                                    }
                                                >
                                                    <IoIosAddCircleOutline className="inline-block w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            {/* Full-screen loader when deleting */}
            {isDeleting && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <span className="loading loading-spinner loading-xl text-white"></span>
                </div>
            )}
        </div>
    );
};

export default CourseTable;
