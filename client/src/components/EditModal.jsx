import { useState } from "react";
import { X } from "lucide-react";

const EditModal = ({ course, onClose, refetchCourses }) => {
    console.log(course);
    const [preview, setPreview] = useState(course?.image || "");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpdate = () => {
        console.log("Course Updated:", title);
        onClose();
        refetchCourses();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md sm:w-[50vw] w-[80vw] relative">
                <h2 className="text-lg font-bold mb-4 text-center">
                    Edit Course
                </h2>
                <button className="absolute right-5 top-5">
                    <X />
                </button>

                <form
                    onSubmit={handleUpdate}
                    className="space-y-6 my-4 text-start"
                >
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
                            value={course?.title}
                            onChange={handleInputChange}
                            placeholder="Enter course title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d2] focus:border-transparent bg-white text-black"
                        />
                    </div>

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
                            value={course?.description}
                            onChange={handleInputChange}
                            placeholder="Enter course description"
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d2] focus:border-transparent bg-white text-black"
                        />
                    </div>

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
                            value={course?.price}
                            onChange={handleInputChange}
                            placeholder="Enter course price"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d2] focus:border-transparent bg-white text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="isPublished"
                            className="text-sm font-medium text-gray-700"
                        >
                            Published
                        </label>
                        <div
                            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                course?.isPublished
                                    ? "bg-[#6d28d2]"
                                    : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                                    course?.isPublished
                                        ? "translate-x-7"
                                        : "translate-x-0"
                                }`}
                            />
                        </div>
                    </div>

                    <div>
                    <label
                            htmlFor="courseImage"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Course Image
                        </label>
                    {preview && (
                <a
                  href={preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-20 h-20 mx-auto my-2 rounded-full border border-gray-500 shadow-md overflow-hidden"
                >
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </a>
              )}
                    </div>


                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="courseImage"
                        />
                        <label
                            htmlFor="courseImage"
                            className="w-full flex items-center justify-center px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-[#6d28d2] focus:border-transparent bg-white text-black"
                        >
                            {selectedFile
                                ? selectedFile.name
                                : "Upload Your New Image If You Want To Change"}
                        </label>
                    </div>
                    
                </form>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-[#6d28d2] text-white rounded-md"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
