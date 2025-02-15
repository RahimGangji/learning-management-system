import React, { useState, useEffect } from "react";
import { useGetProfileQuery } from "../redux/api/authApi";
import {
    FaCamera,
    FaUser,
    FaEnvelope,
    FaUserTag,
    FaSave,
    FaUpload,
} from "react-icons/fa";

export default function EditProfile() {
    const {
        data: profileData,
        error,
        isLoading,
        refetch,
    } = useGetProfileQuery(undefined, { credentials: true });

    const [profile, setProfile] = useState(null);
    const [isDirty, setIsDirty] = useState(false);
    const [isImageHovered, setIsImageHovered] = useState(false);
    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        if (profileData) {
            setProfile(profileData);
        }
    }, [profileData]);

    const handleChange = (e) => {
        setProfile((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                [e.target.name]: e.target.value,
            },
        }));
        setIsDirty(true);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({
                    ...prev,
                    data: {
                        ...prev.data,
                        profilePicture: reader.result,
                    },
                }));
                setIsDirty(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Save implementation
        setIsDirty(false);
        toast.success("Profile updated successfully!");
    };

    if (isLoading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-[#6d28d2] text-xl">
                    Loading profile...
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-red-500 text-xl">
                    Error loading profile
                </div>
            </div>
        );

    const initial = profile?.data?.fullName?.charAt(0).toUpperCase() || "U";

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#6d28d2] px-8 py-6">
                        <h2 className="text-2xl font-bold text-white">
                            Profile Settings
                        </h2>
                        <p className="text-purple-200 mt-1">
                            Manage your personal information
                        </p>
                    </div>

                    {/* Profile Content */}
                    <div className="p-8">
                        {/* Profile Image Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 pb-8 border-b border-gray-200">
                            <div
                                className="relative group"
                                onMouseEnter={() => setIsImageHovered(true)}
                                onMouseLeave={() => setIsImageHovered(false)}
                            >
                                {profile?.data?.profilePicture ? (
                                    <img
                                        src={profile.data.profilePicture}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-white shadow-lg bg-[#6d28d2] text-white text-6xl font-bold">
                                        {initial}
                                    </div>
                                )}
                                <label
                                    className={`absolute bottom-2 right-2 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-300 ${
                                        isImageHovered
                                            ? "scale-110"
                                            : "scale-100"
                                    }`}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                    <FaCamera className="h-5 w-5 text-[#6d28d2]" />
                                </label>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Profile Picture
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Upload a new profile picture or avatar
                                </p>
                                <label className="inline-flex items-center px-4 py-2 bg-purple-50 text-[#6d28d2] rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
                                    <FaUpload className="mr-2" />
                                    <span>Choose Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Form Fields in Grid Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={profile?.data?.fullName || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                                        placeholder="Enter your full name"
                                    />
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 text-gray-800">
                                        {profile?.data?.email}
                                    </div>
                                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <div className="relative">
                                    <div className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 text-gray-800">
                                        {profile?.data?.role}
                                    </div>
                                    <FaUserTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        {isDirty && (
                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleSave}
                                    className="inline-flex items-center px-6 py-3 bg-[#6d28d2] text-white rounded-lg hover:bg-[#7b09ed] transition-colors duration-300"
                                >
                                    <FaSave className="mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
