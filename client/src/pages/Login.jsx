import React, { useState } from "react";
import Button from "../components/Button";
import { useLoginMutation } from "../redux/api/authApi";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for email, password, and toggle visibility
import toast from "react-hot-toast";
import { Router, useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [login, { isLoading }] = useLoginMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData).unwrap();
            console.log(response);
            dispatch(setCredentials({ user: response.data }));
            navigate("/");
            toast.success(response.message);
        } catch (err) {
            toast.error(err.data?.message || "Login failed");
        }
        setFormData({ email: "", password: "" });
    };

    const authState = useSelector((state) => state.auth);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Please login to your account
                </p>
                <form onSubmit={handleSubmit} noValidate>
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
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2  text-black" />
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
                        text={isLoading ? "Logging In..." : "Login"}
                        styleContainer={`w-full  text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300  bg-[#6d28d2] ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                    />
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="text-[#6d28d2] hover:underline"
                        >
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
