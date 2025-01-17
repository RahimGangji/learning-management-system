import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
    return (
        <Router>
            {/* Navbar is displayed on all pages */}
            <Navbar />
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default App;
