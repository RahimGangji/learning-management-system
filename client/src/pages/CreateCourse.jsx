import React, { useState } from "react";

export default function CreateCourse() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        isPublished: false,
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle toggle button change
    const handleToggleChange = () => {
        setFormData((prev) => ({
            ...prev,
            isPublished: !prev.isPublished,
        }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Preview the image
        }
    };

    // Handle form submission (placeholder for now)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", { ...formData, image });
        // Add API call or further handling here
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-[#6d28d2]">
                    Create New Course
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Course Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter course title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d2] focus:border-transparent bg-white text-black"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter course description"
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d2] focus:border-transparent bg-white text-black"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Enter course price"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d2] focus:border-transparent bg-white text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>

                    {/* isPublished Toggle */}
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="isPublished"
                            className="text-sm font-medium text-gray-700"
                        >
                            Published
                        </label>
                        <div
                            onClick={handleToggleChange}
                            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                formData.isPublished
                                    ? "bg-[#6d28d2]"
                                    : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                                    formData.isPublished
                                        ? "translate-x-7"
                                        : "translate-x-0"
                                }`}
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Course Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-gray-700 border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#6d28d2] file:text-white hover:file:bg-[#4b1e9e]"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-md shadow-md"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#6d28d2] text-white py-2 px-4 rounded-md font-medium hover:bg-[#4b1e9e] transition-colors duration-300"
                        >
                            Create Course
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
