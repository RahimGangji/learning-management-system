import React, { useState } from "react";
import NavTabs from "../components/NavTabs";
import Analytics from "../components/Analytics";
import CourseTable from "../components/CourseTable";

import { useGetAllCoursesQuery } from "../redux/api/courseApi";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("manage-courses");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data, isLoading, isError, error, isFetching } =
        useGetAllCoursesQuery({
            page: currentPage,
            limit: itemsPerPage,
        });

    const courses = data?.data?.courses || [];
    const totalPages = data?.data?.pagination?.totalPages || 1;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="p-4">
                <div className="max-w-4xl mx-auto">
                    <NavTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6">
                {activeTab === "analytics" && <Analytics />}
                {activeTab === "manage-courses" && (
                    <CourseTable
                        courses={courses}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        isError={isError}
                        error={error}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}
