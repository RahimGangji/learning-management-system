import React from "react";
import { useGetPublishedCoursesQuery } from "../redux/api/courseApi";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";

export default function HomePage() {
    const { data, isLoading, isError, error, isFetching } =
        useGetPublishedCoursesQuery({});

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="flex items-center justify-center h-[400px] w-full bg-gradient-to-r from-[#6d28d2] to-[#8b5cf6] text-white">
                <div className="text-center max-w-2xl px-4">
                    <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                        Welcome to Your Learning Platform
                    </h1>

                    <p className="text-xl mb-8 animate-fade-in delay-100">
                        Discover the best courses and enhance your skills.
                    </p>

                    <div className="flex justify-center gap-4 animate-fade-in delay-200">
                        <Link to="/all-courses">
                            <button className="px-8 py-3 bg-white text-[#6d28d2] rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl">
                                Explore Courses
                            </button>
                        </Link>
                        <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#6d28d2] transition-all">
                            View FAQ
                        </button>
                    </div>
                </div>
            </div>

            <Slider
                courses={data?.data?.courses}
                loading={isLoading}
                error={isError}
            />
        </div>
    );
}
