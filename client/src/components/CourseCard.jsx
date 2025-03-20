import React from "react";

const CourseCard = ({ course }) => {
  const formattedPrice = course?.price
    ? course.price === 0
      ? "Free"
      : `$${course.price.toFixed(2)}`
    : "N/A";

  return (
    <div className="w-full h-[420px] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden flex flex-col">

      <div className="relative h-48">
        <img
          src={course?.image || "https://via.placeholder.com/350x200"}
          alt={course?.title || "Course thumbnail"}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-lg font-bold text-gray-800 shadow-sm">
          {formattedPrice}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            {course?.category || "Development"}
          </span>
          <span className="text-xs text-gray-500">
            {course?.duration || "10h 30m"}
          </span>
        </div>

        <h2 className="text-lg font-bold mb-1 text-gray-800 line-clamp-2">
          {course?.title || "Course Title"}
        </h2>

        <p className="text-sm text-gray-600 mb-2">
          {course?.instructor || "Instructor Name"}
        </p>

        <p className="text-sm text-gray-600 my-3 line-clamp-2 flex-grow">
          {course?.description || "Course description goes here..."}
        </p>

        <button className="w-full bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-2.5 rounded-lg font-medium transition-all duration-300 hover:from-indigo-800 hover:to-purple-700 flex items-center justify-center gap-2">
          <span>Enroll Now</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;