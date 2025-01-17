import React from "react";
import Button from "../components/Button";

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login Your Account
                </h2>
                <form>
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
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white text-black focus:ring-2 focus:ring-blue-500"
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
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <Button
                        text="Login"
                        styleContainer="w-full text-white py-2 rounded-md hover:bg-[#7b09ed] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </form>
            </div>
        </div>
    );
}
