import React, { useState } from "react";
import Button from "../components/Button";
import { useSignupMutation } from "../redux/api/authApi";

export default function SignUp() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [signup, { isLoading }] = useSignupMutation();

    // Define the handleChange function
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanedData = { ...formData };
        delete cleanedData[""]; // Delete empty key if exists
        try {
            const response = await signup(cleanedData).unwrap();
            alert(response.message);
        } catch (err) {
            alert(err.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-black bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Sign up Your Account
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="fullname"
                            className="block text-gray-700 text-sm font-medium mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullName" // Ensure valid name
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white text-black focus:ring-2 focus:ring-blue-500"
                            value={formData.fullName}
                            onChange={handleChange} // Use handleChange here
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email" // Ensure valid name
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white text-black focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={handleChange} // Use handleChange here
                        />
                    </div>
                    <div className="mb-8">
                        <label
                            htmlFor="password"
                            className="block  text-sm font-medium mb-2 text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password" // Ensure valid name
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={handleChange} // Use handleChange here
                        />
                    </div>
                    <Button
                        text={isLoading ? "Registering..." : "Register"} // Show loading state
                        styleContainer="w-full text-white py-2 rounded-md hover:bg-[#7b09ed] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading} // Disable button while submitting
                    />
                </form>
            </div>
        </div>
    );
}
