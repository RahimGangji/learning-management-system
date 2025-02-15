import React, { useState } from "react";
import Button from "../components/Button";
import { useSignupMutation } from "../redux/api/authApi";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SignUp() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [signup, { isLoading }] = useSignupMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanedData = { ...formData };
        delete cleanedData[""];
        try {
            const response = await signup(cleanedData).unwrap();

            toast.success(response.message);
        } catch (err) {
            toast.error(err.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Create Account
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Please fill in your information
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="fullname"
                            className="block text-gray-700 text-sm font-medium mb-2"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="fullname"
                                name="fullName"
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 bg-white"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-medium mb-2"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 bg-white"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-2 text-gray-700"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 bg-white"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-black" />
                                ) : (
                                    <FaEye className="text-black" />
                                )}
                            </button>
                        </div>
                    </div>

                    <Button
                        text={isLoading ? "Creating Account..." : "Sign Up"}
                        styleContainer={`w-full text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 bg-[#6d28d2] ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                    />
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-[#6d28d2] hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
