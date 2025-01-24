import React, { useState } from "react";
import Button from "../components/Button";
import { useLoginMutation } from "../redux/api/authApi"; // Assuming useLoginMutation is defined in your authApi.
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
export default function Login() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [login, { isLoading }] = useLoginMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData).unwrap();
            dispatch(setCredentials({ user: response.user }));
            alert(response.message); // Handle login success (e.g., redirect to dashboard)
        } catch (err) {
            console.error(err);
            alert(err.data?.message || "Login failed");
        }
    };
    const authState = useSelector((state) => state.auth);

    console.log("Auth State:", authState);
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login Your Account
                </h2>
                <form onSubmit={handleSubmit}>
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
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white text-black focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-8">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-2 text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <Button
                        text={isLoading ? "Logging In..." : "Login"} // Show loading state
                        styleContainer="w-full text-white py-2 rounded-md hover:bg-[#7b09ed] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading} // Disable button while submitting
                    />
                </form>
            </div>
        </div>
    );
}
