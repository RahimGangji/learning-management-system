import React, { useState } from "react";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("analytics");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Sub Navigation Bar */}
            <div className="p-4 ">
                <div className="max-w-4xl mx-auto">
                    <nav className="flex space-x-4">
                        <button
                            onClick={() => handleTabChange("analytics")}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
                                activeTab === "analytics"
                                    ? "bg-[#6d28d2] text-white"
                                    : "bg-white text-gray-700 hover:text-[#6d28d2] border border-[#6d28d2] "
                            }`}
                        >
                            Analytics
                        </button>
                        <button
                            onClick={() => handleTabChange("manage-courses")}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
                                activeTab === "manage-courses"
                                    ? "bg-[#6d28d2] text-white"
                                    : "bg-white text-gray-700 hover:text-[#6d28d2] border border-[#6d28d2] "
                            }`}
                        >
                            Manage Courses
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto p-6">
                {activeTab === "analytics" && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4 text-[#6d28d2]">
                            Analytics
                        </h1>
                        {/* Add your analytics content here */}
                        <p className="text-gray-700">
                            This is where analytics data would be displayed.
                        </p>
                    </div>
                )}
                {activeTab === "manage-courses" && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4 text-[#6d28d2]">
                            Manage Courses
                        </h1>
                        {/* Add your course management content here */}
                        <p className="text-gray-700">
                            This is where course management tools would be
                            displayed.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
