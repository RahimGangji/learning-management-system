import React, { useState } from "react";

export default function EditProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [tempProfile, setTempProfile] = useState(null);
    const [profile, setProfile] = useState({
        name: "AJohn Doe",
        role: "Software Engineer",
        email: "johndoe@example.com",
        photo: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfile({ ...tempProfile, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    console.log("temp profile", tempProfile);

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setProfile(tempProfile || profile);
            // setTempProfile(null);
            setIsEditing(false);
            setIsLoading(false);
        }, 1500);
    };

    const handleCancel = () => {
        // setTempProfile(null);
        setIsEditing(false);
    };

    const currentProfile = tempProfile || profile;
    const initial = currentProfile.name.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 border rounded-2xl shadow-xl bg-white transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center relative group">
                    <div className="relative">
                        {currentProfile.photo ? (
                            <img
                                src={currentProfile.photo}
                                alt="Profile"
                                className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg"
                            />
                        ) : (
                            <div className="w-32 h-32 flex items-center justify-center rounded-full mb-4 border-4 border-white shadow-lg bg-[#6d28d2] text-white text-6xl font-bold">
                                {initial}
                            </div>
                        )}
                        {isEditing && (
                            <label className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-full shadow-md cursor-pointer hover:bg-white transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </label>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={currentProfile.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                autoFocus
                            />
                        ) : (
                            <p className="px-4 py-2 text-gray-600">
                                {profile.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <p className="px-4 py-2 text-gray-600 bg-gray-50 rounded-lg">
                            {profile.role}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <p className="px-4 py-2 text-gray-600 bg-gray-50 rounded-lg">
                            {profile.email}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-[#fff] rounded-lg text-[#6d28d2] hover:bg-gray-100 border-2 border-[#6d28d2] hover:border-[#6d28d2] font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className={`w-1/2 text-white btn bg-[#6d28d2] border-0 hover:bg-[#7b09ed] px-6 py-0 my-0 text-[16px] ${
                                    isLoading
                                        ? "opacity-75 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full  text-white btn bg-[#6d28d2] border-0 hover:bg-[#7b09ed] px-6 py-0 my-0 text-[16px]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
