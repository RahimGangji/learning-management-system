import React, { useState } from "react";
import logo from "../images/logo.svg";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { logout } from "../redux/features/auth/authSlice";
const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const userInitial = user?.fullName?.charAt(0)?.toUpperCase() || "";
    const [logoutApi] = useLogoutMutation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        // Logout functionality
        try {
            await logoutApi().unwrap(); // Call logout API
            dispatch(logout()); // Clear Redux state & localStorage
            navigate("/login"); // Redirect to login page
            setDropdownOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="flex justify-between items-center px-6 py-2 bg-white navbar shadow-lg relative font-sans">
            {/* Logo */}
            <img
                src={logo}
                alt="logo"
                className="h-10 cursor-pointer"
                onClick={() => navigate("/")}
            />

            {isAuthenticated ? (
                <div className="relative">
                    {/* Clickable Avatar */}
                    <div
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#6d28d2] text-white font-bold text-xl cursor-pointer"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {userInitial}
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                            <div className="px-4 py-3 border-b bg-gray-50">
                                <p className="text-base font-semibold text-gray-600 break-all">
                                    {user.email}
                                </p>
                            </div>

                            <ul className="text-gray-700">
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium"
                                    onClick={() => navigate("/edit-profile")}
                                >
                                    Edit Profile
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium"
                                    onClick={() =>
                                        navigate("/enrolled-courses")
                                    }
                                >
                                    Enrolled Courses
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-red-500 text-red-600 hover:text-white cursor-pointer font-medium"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex gap-4">
                    <Button
                        text="Login"
                        styleContainer="bg-[#fff] font-bold text-[#6d28d2] hover:bg-gray-100 border-2 border-[#6d28d2] hover:border-[#6d28d2] font-medium"
                        onClick={() => navigate("/login")}
                    />
                    <Button
                        text="SignUp"
                        styleContainer="font-bold text-white font-medium"
                        onClick={() => navigate("/signup")}
                    />
                </div>
            )}
        </div>
    );
};

export default Navbar;
