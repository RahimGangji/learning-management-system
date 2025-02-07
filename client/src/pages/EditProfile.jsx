import React, { useState, useEffect } from "react";
import { useGetProfileQuery } from "../redux/api/authApi";

export default function EditProfile() {
    const {
        data: profileData,
        error,
        isLoading,
    } = useGetProfileQuery(undefined, { credentials: true });

    const [isEditing, setIsEditing] = useState(false);
    const [tempProfile, setTempProfile] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (profileData) {
            setProfile(profileData); // Set profile data when fetched
        }
    }, [profileData]);

    const handleEdit = () => {
        setTempProfile(profile); // Initialize tempProfile with existing data
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setTempProfile((prev) => ({
            ...prev,
            data: {
                ...prev?.data,
                [e.target.name]: e.target.value,
            },
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfile((prev) => ({
                    ...prev,
                    data: {
                        ...prev?.data,
                        profilePicture: reader.result,
                    },
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setProfile(tempProfile || profile);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (isLoading) return <p>Loading profile...</p>;
    if (error) return <p>Error loading profile</p>;
    if (!profile) return <p>No profile found</p>;

    const currentProfile = tempProfile || profile;
    const initial =
        currentProfile?.data?.fullName?.charAt(0).toUpperCase() || "U";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 border rounded-2xl shadow-xl bg-white transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center relative group">
                    <div className="relative">
                        {currentProfile?.data?.profilePicture ? (
                            <img
                                src={currentProfile.data.profilePicture}
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
                                name="fullName"
                                value={currentProfile?.data?.fullName || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                autoFocus
                            />
                        ) : (
                            <p className="px-4 py-2 text-black font-sans font-semibold">
                                {currentProfile?.data?.fullName}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <p className="px-4 py-2 text-black bg-gray-50 rounded-lg  font-sans font-semibold">
                            {currentProfile?.data?.role}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <p className="px-4 py-2 text-black bg-gray-50 rounded-lg  font-sans font-semibold">
                            {currentProfile?.data?.email}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-white rounded-lg text-[#6d28d2] hover:bg-gray-100 border-2 border-[#6d28d2] hover:border-[#6d28d2] font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="w-1/2 text-white bg-[#6d28d2] border-0 hover:bg-[#7b09ed] px-6 py-2 text-[16px] rounded-lg"
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="w-full text-white bg-[#6d28d2] border-0 hover:bg-[#7b09ed] px-6 py-2 text-[16px] rounded-lg"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
