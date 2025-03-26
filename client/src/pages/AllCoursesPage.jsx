import React, { useState } from "react";
import { useGetPublishedCoursesQuery } from "../redux/api/courseApi";
import CourseCard from "../components/CourseCard";

const AllCoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("price");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: coursesData,
    isLoading,
    isError,
  } = useGetPublishedCoursesQuery({
    page,
    limit,
    sortField,
    sortDirection,
    search: searchTerm,
  });
  console.log(coursesData);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1)
  };

  const handleSortChange = (e) => {
    setSortField(e.target.value);
    setPage(1);
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
    setPage(1);
  };


  const clearFilters = () => {
    setSearchTerm("");
    setSortField("price");
    setSortDirection("asc");
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h3 className="text-lg font-medium text-gray-900">Error fetching courses</h3>
        <p className="mt-1 text-gray-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div>
            <input
              type="text"
              placeholder="Search courses, instructors, or keywords..."
              className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sortField}
                onChange={handleSortChange}
              >
                <option value="price">Price</option>
                <option value="createdAt">Date Added</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort Direction</label>
              <select
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sortDirection}
                onChange={handleSortDirectionChange}
              >
                <option value="desc">Highest to Lowest</option>
                <option value="asc">Lowest to Highest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              All Courses
              <span className="ml-2 text-gray-500 text-lg">({coursesData?.data?.courses?.length || 0})</span>
            </h2>

            {(searchTerm) && (
              <button
                className="text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>

          {coursesData?.data?.courses?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
              <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}

          {coursesData?.data?.pagination?.totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                {Array.from({ length: coursesData?.data?.pagination?.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`px-3 py-2 rounded-md border border-gray-300 ${
                      page === pageNum
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                  onClick={() => setPage((prev) => Math.min(prev + 1, coursesData?.data?.pagination?.totalPages))}
                  disabled={page === coursesData?.data?.pagination?.totalPages}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllCoursesPage;