import React, { useState } from "react";
import { useGetPublishedCoursesQuery } from "../redux/api/courseApi";
import CourseCard from "../components/CourseCard";
import { FaSearch } from "react-icons/fa";
import Pagination from "../components/Pagination";

const AllCoursesPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [page, setPage] = useState(1);

    const [sortField, sortDirection] = sortOption
        ? sortOption.split("-")
        : ["createdAt", "asc"];

    const {
        data: coursesData,
        isLoading,
        isError,
    } = useGetPublishedCoursesQuery({
        page,
        limit: 3,
        sortField,
        sortDirection,
        search: searchTerm,
    });

    const handleOnChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchSubmit = () => {
        setSearchTerm(inputValue);
        setPage(1);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center bg-white h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                    Error fetching courses
                </h3>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {" "}
            {/* Increased to pt-20 */}
            <section className="pb-6 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">
                            All Courses
                        </h2>
                        <div className="flex items-center space-x-4 flex-col md:flex-row">
                            <div className="flex items-center border border-gray-300 rounded-lg w-80 h-10 bg-white shadow-sm">
                                <div className="flex items-center px-3">
                                    <FaSearch className="text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={inputValue}
                                    onChange={handleOnChange}
                                    className="w-full px-2 py-2 outline-none bg-transparent text-gray-900 text-sm"
                                />
                                <button
                                    onClick={handleSearchSubmit}
                                    className="px-4 py-2 rounded-r-lg font-medium text-sm transition-colors duration-200 bg-[#6d28d2] text-white hover:bg-[#4b1e9e]"
                                >
                                    Search
                                </button>
                            </div>
                            <div className="relative ">
                                <select
                                    className="appearance-none w-48 h-10 p-2 pr-8 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 truncate"
                                    value={sortOption}
                                    onChange={handleSortChange}
                                >
                                    <option value="" disabled hidden>
                                        Filter
                                    </option>
                                    <option value="price-asc">
                                        Price (Low to High)
                                    </option>
                                    <option value="price-desc">
                                        Price (High to Low)
                                    </option>
                                    <option value="title-asc">
                                        Name (A-Z)
                                    </option>
                                    <option value="title-desc">
                                        Name (Z-A)
                                    </option>
                                </select>
                                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {coursesData?.data?.courses?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                            {coursesData?.data?.courses.map((course) => (
                                <CourseCard key={course._id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                                No courses found
                            </h3>
                            <p className="mt-1 text-gray-500">
                                Try adjusting your search or filter criteria.
                            </p>
                        </div>
                    )}

                    <Pagination
                        currentPage={page}
                        totalPages={coursesData?.data?.pagination?.totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </section>
        </div>
    );
};

export default AllCoursesPage;
