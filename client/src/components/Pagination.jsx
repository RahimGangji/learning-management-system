import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const getPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(i);
            }
        } else {
            items.push(1);
            const leftBound = Math.max(2, currentPage - 1);
            const rightBound = Math.min(totalPages - 1, currentPage + 1);

            if (leftBound > 2) {
                items.push("...");
            }

            for (let i = leftBound; i <= rightBound; i++) {
                items.push(i);
            }

            if (rightBound < totalPages - 1) {
                items.push("...");
            }

            items.push(totalPages);
        }

        return items;
    };

    return (
        <div className="mt-4 flex justify-center items-center space-x-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                    currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-[#6d28d2] hover:bg-[#6d28d2] hover:text-white"
                }`}
            >
                <FaChevronLeft className="w-4 h-4" />
            </button>

            {getPaginationItems().map((item, index) => (
                <button
                    key={index}
                    onClick={() =>
                        typeof item === "number" && handlePageChange(item)
                    }
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                        item === currentPage
                            ? "bg-[#6d28d2] text-white"
                            : typeof item === "number"
                            ? "bg-white text-gray-700 border border-[#6d28d2] hover:bg-[#6d28d2] hover:text-white"
                            : "text-gray-700 cursor-default"
                    }`}
                    disabled={typeof item !== "number"}
                >
                    {item}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                    currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-[#6d28d2] hover:bg-[#6d28d2] hover:text-white"
                }`}
            >
                <FaChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;
