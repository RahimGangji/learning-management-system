import React, { useState, useEffect } from "react";
import {
    useGetProfileQuery,
    useEditProfileMutation,
} from "../redux/api/authApi";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
    FaCamera,
    FaUser,
    FaEnvelope,
    FaUserTag,
    FaSave,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function EditProfile() {
    const dispatch = useDispatch();
    const {
        data: profileData,
        error,
        isLoading,
        refetch,
    } = useGetProfileQuery(undefined, { credentials: true });

    const [editProfile, { isLoading: isSaving }] = useEditProfileMutation();
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

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Error While Loading Profile");
        }
    }, [error]);

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
            setProfile((prev) => ({
                ...prev,
                data: {
                    ...prev.data,
                    profilePicture: URL.createObjectURL(file), // Preview
                    imageFile: file, // Store actual file
                },
            }));
            setIsDirty(true);
        }
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("fullName", profile.data.fullName);

            if (profile.data.imageFile) {
                formData.append("profilePicture", profile.data.imageFile);
            }

            const response = await editProfile(formData).unwrap();
            toast.success("Profile updated successfully!");
            refetch();
            dispatch(setCredentials({ user: response.data }));
            setIsDirty(false);
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    // **Loading State**
    if (isLoading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    // **Error State** (Handled via `useEffect` so UI remains accessible)
    if (error) return <div className="min-h-screen bg-white"></div>;

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
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Full Name */}
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

                            {/* Email */}
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

                            {/* Role */}
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
                                    disabled={isSaving}
                                    className={`inline-flex items-center px-6 py-3 rounded-lg transition-colors duration-300 ${
                                        isSaving
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#6d28d2] hover:bg-[#7b09ed] text-white"
                                    }`}
                                >
                                    {isSaving ? (
                                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <FaSave className="mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
