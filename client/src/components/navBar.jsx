import React, { useState, useEffect, useRef } from "react";
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
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap();
            dispatch(logout());
            navigate("/login");
            setDropdownOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-40 font-sans">
            {/* Logo */}
            <img
                src={logo}
                alt="logo"
                className="h-12 cursor-pointer"
                onClick={() => navigate("/")}
            />

            {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                    {/* Clickable Avatar */}
                    <div
                        className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold text-lg cursor-pointer shadow-md hover:scale-105 transition-transform overflow-hidden"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {user?.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            userInitial
                        )}
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute top-full right-0 mt-3 w-52 bg-white shadow-lg rounded-lg overflow-hidden z-100 border border-gray-200">
                            <div className="px-5 py-3 border-b bg-gray-100">
                                <p className="text-base font-semibold text-gray-700 truncate">
                                    {user?.email}
                                </p>
                            </div>

                            <ul className="text-gray-800">
                                <li
                                    className="px-5 py-3 hover:bg-gray-200 cursor-pointer text-sm font-medium transition-all"
                                    onClick={() => {
                                        navigate("/edit-profile");
                                        setDropdownOpen(false);
                                    }}
                                >
                                    Edit Profile
                                </li>
                                <li
                                    className="px-5 py-3 hover:bg-gray-200 cursor-pointer text-sm font-medium transition-all"
                                    onClick={() => {
                                        navigate("/enrolled-courses");
                                        setDropdownOpen(false);
                                    }}
                                >
                                    Enrolled Courses
                                </li>

                                {user?.role === "admin" && (
                                    <li
                                        className="px-5 py-3 hover:bg-gray-200 cursor-pointer text-sm font-medium transition-all"
                                        onClick={() => {
                                            navigate("/dashboard");
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        Dashboard
                                    </li>
                                )}
                                <li
                                    className="px-5 py-3 hover:bg-red-500 text-red-600 hover:text-white cursor-pointer text-sm font-medium transition-all"
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
                        styleContainer="bg-white font-bold text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 hover:border-indigo-600 transition-all px-5 py-2 rounded-md shadow-sm"
                        onClick={() => navigate("/login")}
                    />
                    <Button
                        text="Sign Up"
                        styleContainer="font-bold text-white px-5 py-2 rounded-md shadow-md transition-all"
                        onClick={() => navigate("/signup")}
                    />
                </div>
            )}
        </div>
    );
};

export default Navbar;
