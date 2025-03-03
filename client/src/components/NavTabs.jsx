import React from "react";

const NavTabs = ({ activeTab, setActiveTab }) => {
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <nav className="flex space-x-4">
            <button
                onClick={() => handleTabChange("analytics")}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
                    activeTab === "analytics"
                        ? "bg-[#6d28d2] text-white"
                        : "bg-white text-gray-700 hover:text-[#6d28d2] border border-[#6d28d2]"
                }`}
            >
                Analytics
            </button>
            <button
                onClick={() => handleTabChange("manage-courses")}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
                    activeTab === "manage-courses"
                        ? "bg-[#6d28d2] text-white"
                        : "bg-white text-gray-700 hover:text-[#6d28d2] border border-[#6d28d2]"
                }`}
            >
                Manage Courses
            </button>
        </nav>
    );
};

export default NavTabs;
