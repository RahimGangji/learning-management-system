import React from "react";
import logo from "../images/logo.svg";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center px-6 py-2 bg-white navbar shadow-lg ">
            <img src={logo} alt="logo" className="h-10" />

            <div className="flex gap-4">
                <Button
                    text="Login"
                    styleContainer={
                        "bg-[#fff] font-bold text-[#6d28d2] hover:bg-gray-100 border-2 border-[#6d28d2] hover:border-[#6d28d2]"
                    }
                    onClick={() => navigate("/login")}
                />
                <Button
                    text="SignUp"
                    styleContainer={"font-bold text-white "}
                    onClick={() => navigate("/signup")}
                />
            </div>
        </div>
    );
};

export default Navbar;
