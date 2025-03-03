import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const CourseTable = ({
    courses,
    isLoading,
    isFetching,
    isError,
    error,
    currentPage,
    totalPages,
    handlePageChange,
}) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4 text-[#6d28d2]">
                    Manage Courses
                </h1>
                <button
                    onClick={() => navigate("/course/new")}
                    className={`px-4  rounded-md font-medium text-sm transition-colors duration-200 bg-[#6d28d2] text-white `}
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
                <div className="text-center font-bold text-gray-700">
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
                                            {index + 1}
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
                                            <button className="text-[#6d28d2] mr-4 hover:text-[#4b1e9e]">
                                                <FaEdit className="inline-block w-4 h-4" />
                                            </button>
                                            <button className="text-red-600 mr-4 hover:text-red-800">
                                                <FaTrash className="inline-block w-4 h-4" />
                                            </button>
                                            <button className="text-[#0cad22] hover:text-[#087d18]">
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
    );
};

export default CourseTable;
